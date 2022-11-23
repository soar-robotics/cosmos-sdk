package keeper_test

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktestutil "github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/cosmos/cosmos-sdk/x/staking/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
)

// bootstrapSlashTest creates 3 validators and bootstrap the app.
func bootstrapSlashTest(t *testing.T, power int64) (*keeper.Keeper, bankkeeper.Keeper, authkeeper.AccountKeeper, sdk.Context, []sdk.AccAddress, []sdk.ValAddress) {
	stakingKeeper, bankKeeper, accountKeeper, ctx := createTestInput(t)

	addrDels, addrVals := generateAddresses(stakingKeeper, bankKeeper, ctx, 100)

	amt := stakingKeeper.TokensFromConsensusPower(ctx, power)
	totalSupply := sdk.NewCoins(sdk.NewCoin(stakingKeeper.BondDenom(ctx), amt.MulRaw(int64(len(addrDels)))))

	notBondedPool := stakingKeeper.GetNotBondedPool(ctx)
	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, notBondedPool.GetName(), totalSupply))

	accountKeeper.SetModuleAccount(ctx, notBondedPool)

	numVals := int64(3)
	bondedCoins := sdk.NewCoins(sdk.NewCoin(stakingKeeper.BondDenom(ctx), amt.MulRaw(numVals)))
	bondedPool := stakingKeeper.GetBondedPool(ctx)

	// set bonded pool balance
	accountKeeper.SetModuleAccount(ctx, bondedPool)
	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, bondedPool.GetName(), bondedCoins))

	for i := int64(0); i < numVals; i++ {
		validator := testutil.NewValidator(t, addrVals[i], PKs[i])
		validator, _ = validator.AddTokensFromDel(amt)
		validator = keeper.TestingUpdateValidator(stakingKeeper, ctx, validator, true)
		stakingKeeper.SetValidatorByConsAddr(ctx, validator)
	}

	return stakingKeeper, bankKeeper, accountKeeper, ctx, addrDels, addrVals
}

// tests slashUnbondingDelegation
func TestSlashUnbondingDelegation(t *testing.T) {
	stakingKeeper, bankKeeper, _, ctx, addrDels, addrVals := bootstrapSlashTest(t, 10)

	fraction := sdk.NewDecWithPrec(5, 1)

	// set an unbonding delegation with expiration timestamp (beyond which the
	// unbonding delegation shouldn't be slashed)
	ubd := types.NewUnbondingDelegation(addrDels[0], addrVals[0], 0,
		time.Unix(5, 0), sdk.NewInt(10), 0)

	stakingKeeper.SetUnbondingDelegation(ctx, ubd)

	// unbonding started prior to the infraction height, stakw didn't contribute
	slashAmount := stakingKeeper.SlashUnbondingDelegation(ctx, ubd, 1, fraction)
	require.True(t, slashAmount.Equal(sdk.NewInt(0)))

	// after the expiration time, no longer eligible for slashing
	ctx = ctx.WithBlockHeader(tmproto.Header{Time: time.Unix(10, 0)})
	stakingKeeper.SetUnbondingDelegation(ctx, ubd)
	slashAmount = stakingKeeper.SlashUnbondingDelegation(ctx, ubd, 0, fraction)
	require.True(t, slashAmount.Equal(sdk.NewInt(0)))

	// test valid slash, before expiration timestamp and to which stake contributed
	notBondedPool := stakingKeeper.GetNotBondedPool(ctx)
	oldUnbondedPoolBalances := bankKeeper.GetAllBalances(ctx, notBondedPool.GetAddress())
	ctx = ctx.WithBlockHeader(tmproto.Header{Time: time.Unix(0, 0)})
	stakingKeeper.SetUnbondingDelegation(ctx, ubd)
	slashAmount = stakingKeeper.SlashUnbondingDelegation(ctx, ubd, 0, fraction)
	require.True(t, slashAmount.Equal(sdk.NewInt(5)))
	ubd, found := stakingKeeper.GetUnbondingDelegation(ctx, addrDels[0], addrVals[0])
	require.True(t, found)
	require.Len(t, ubd.Entries, 1)

	// initial balance unchanged
	require.Equal(t, sdk.NewInt(10), ubd.Entries[0].InitialBalance)

	// balance decreased
	require.Equal(t, sdk.NewInt(5), ubd.Entries[0].Balance)
	newUnbondedPoolBalances := bankKeeper.GetAllBalances(ctx, notBondedPool.GetAddress())
	diffTokens := oldUnbondedPoolBalances.Sub(newUnbondedPoolBalances...)
	require.True(t, diffTokens.AmountOf(stakingKeeper.BondDenom(ctx)).Equal(sdk.NewInt(5)))
}

// tests slashRedelegation
func TestSlashRedelegation(t *testing.T) {
	stakingKeeper, bankKeeper, accountKeeper, ctx, addrDels, addrVals := bootstrapSlashTest(t, 10)
	fraction := sdk.NewDecWithPrec(5, 1)

	// add bonded tokens to pool for (re)delegations
	startCoins := sdk.NewCoins(sdk.NewInt64Coin(stakingKeeper.BondDenom(ctx), 15))
	bondedPool := stakingKeeper.GetBondedPool(ctx)

	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, bondedPool.GetName(), startCoins))
	accountKeeper.SetModuleAccount(ctx, bondedPool)

	// set a redelegation with an expiration timestamp beyond which the
	// redelegation shouldn't be slashed
	rd := types.NewRedelegation(addrDels[0], addrVals[0], addrVals[1], 0,
		time.Unix(5, 0), sdk.NewInt(10), math.LegacyNewDec(10), 0)

	stakingKeeper.SetRedelegation(ctx, rd)

	// set the associated delegation
	del := types.NewDelegation(addrDels[0], addrVals[1], math.LegacyNewDec(10))
	stakingKeeper.SetDelegation(ctx, del)

	// started redelegating prior to the current height, stake didn't contribute to infraction
	validator, found := stakingKeeper.GetValidator(ctx, addrVals[1])
	require.True(t, found)
	slashAmount := stakingKeeper.SlashRedelegation(ctx, validator, rd, 1, fraction)
	require.True(t, slashAmount.Equal(sdk.NewInt(0)))

	// after the expiration time, no longer eligible for slashing
	ctx = ctx.WithBlockHeader(tmproto.Header{Time: time.Unix(10, 0)})
	stakingKeeper.SetRedelegation(ctx, rd)
	validator, found = stakingKeeper.GetValidator(ctx, addrVals[1])
	require.True(t, found)
	slashAmount = stakingKeeper.SlashRedelegation(ctx, validator, rd, 0, fraction)
	require.True(t, slashAmount.Equal(sdk.NewInt(0)))

	balances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())

	// test valid slash, before expiration timestamp and to which stake contributed
	ctx = ctx.WithBlockHeader(tmproto.Header{Time: time.Unix(0, 0)})
	stakingKeeper.SetRedelegation(ctx, rd)
	validator, found = stakingKeeper.GetValidator(ctx, addrVals[1])
	require.True(t, found)
	slashAmount = stakingKeeper.SlashRedelegation(ctx, validator, rd, 0, fraction)
	require.True(t, slashAmount.Equal(sdk.NewInt(5)))
	rd, found = stakingKeeper.GetRedelegation(ctx, addrDels[0], addrVals[0], addrVals[1])
	require.True(t, found)
	require.Len(t, rd.Entries, 1)

	// end block
	applyValidatorSetUpdates(t, ctx, stakingKeeper, 1)

	// initialbalance unchanged
	require.Equal(t, sdk.NewInt(10), rd.Entries[0].InitialBalance)

	// shares decreased
	del, found = stakingKeeper.GetDelegation(ctx, addrDels[0], addrVals[1])
	require.True(t, found)
	require.Equal(t, int64(5), del.Shares.RoundInt64())

	// pool bonded tokens should decrease
	burnedCoins := sdk.NewCoins(sdk.NewCoin(stakingKeeper.BondDenom(ctx), slashAmount))
	require.Equal(t, balances.Sub(burnedCoins...), bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress()))
}

// test slash at a negative height
// this just represents pre-genesis and should have the same effect as slashing at height 0
func TestSlashAtNegativeHeight(t *testing.T) {
	stakingKeeper, bankKeeper, _, ctx, _, _ := bootstrapSlashTest(t, 10)
	consAddr := sdk.ConsAddress(PKs[0].Address())
	fraction := sdk.NewDecWithPrec(5, 1)

	bondedPool := stakingKeeper.GetBondedPool(ctx)
	oldBondedPoolBalances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())

	_, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)
	stakingKeeper.Slash(ctx, consAddr, -2, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	// read updated state
	validator, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	// end block
	applyValidatorSetUpdates(t, ctx, stakingKeeper, 1)

	validator, found = stakingKeeper.GetValidator(ctx, validator.GetOperator())
	require.True(t, found)
	// power decreased
	require.Equal(t, int64(5), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// pool bonded shares decreased
	newBondedPoolBalances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	diffTokens := oldBondedPoolBalances.Sub(newBondedPoolBalances...).AmountOf(stakingKeeper.BondDenom(ctx))
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 5).String(), diffTokens.String())
}

// tests Slash at the current height
func TestSlashValidatorAtCurrentHeight(t *testing.T) {
	stakingKeeper, bankKeeper, _, ctx, _, _ := bootstrapSlashTest(t, 10)
	consAddr := sdk.ConsAddress(PKs[0].Address())
	fraction := sdk.NewDecWithPrec(5, 1)

	bondedPool := stakingKeeper.GetBondedPool(ctx)
	oldBondedPoolBalances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())

	_, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)
	stakingKeeper.Slash(ctx, consAddr, ctx.BlockHeight(), 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	// read updated state
	validator, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	// end block
	applyValidatorSetUpdates(t, ctx, stakingKeeper, 1)

	validator, found = stakingKeeper.GetValidator(ctx, validator.GetOperator())
	assert.True(t, found)
	// power decreased
	require.Equal(t, int64(5), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// pool bonded shares decreased
	newBondedPoolBalances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	diffTokens := oldBondedPoolBalances.Sub(newBondedPoolBalances...).AmountOf(stakingKeeper.BondDenom(ctx))
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 5).String(), diffTokens.String())
}

// tests Slash at a previous height with an unbonding delegation
func TestSlashWithUnbondingDelegation(t *testing.T) {
	stakingKeeper, bankKeeper, _, ctx, addrDels, addrVals := bootstrapSlashTest(t, 10)

	consAddr := sdk.ConsAddress(PKs[0].Address())
	fraction := sdk.NewDecWithPrec(5, 1)

	// set an unbonding delegation with expiration timestamp beyond which the
	// unbonding delegation shouldn't be slashed
	ubdTokens := stakingKeeper.TokensFromConsensusPower(ctx, 4)
	ubd := types.NewUnbondingDelegation(addrDels[0], addrVals[0], 11, time.Unix(0, 0), ubdTokens, 0)
	stakingKeeper.SetUnbondingDelegation(ctx, ubd)

	// slash validator for the first time
	ctx = ctx.WithBlockHeight(12)
	bondedPool := stakingKeeper.GetBondedPool(ctx)
	oldBondedPoolBalances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())

	_, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)
	stakingKeeper.Slash(ctx, consAddr, 10, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	// end block
	applyValidatorSetUpdates(t, ctx, stakingKeeper, 1)

	// read updating unbonding delegation
	ubd, found = stakingKeeper.GetUnbondingDelegation(ctx, addrDels[0], addrVals[0])
	require.True(t, found)
	require.Len(t, ubd.Entries, 1)

	// balance decreased
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 2), ubd.Entries[0].Balance)

	// bonded tokens burned
	newBondedPoolBalances := bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	diffTokens := oldBondedPoolBalances.Sub(newBondedPoolBalances...).AmountOf(stakingKeeper.BondDenom(ctx))
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 3), diffTokens)

	// read updated validator
	validator, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	// power decreased by 3 - 6 stake originally bonded at the time of infraction
	// was still bonded at the time of discovery and was slashed by half, 4 stake
	// bonded at the time of discovery hadn't been bonded at the time of infraction
	// and wasn't slashed
	require.Equal(t, int64(7), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// slash validator again
	ctx = ctx.WithBlockHeight(13)
	stakingKeeper.Slash(ctx, consAddr, 9, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	ubd, found = stakingKeeper.GetUnbondingDelegation(ctx, addrDels[0], addrVals[0])
	require.True(t, found)
	require.Len(t, ubd.Entries, 1)

	// balance decreased again
	require.Equal(t, sdk.NewInt(0), ubd.Entries[0].Balance)

	// bonded tokens burned again
	newBondedPoolBalances = bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	diffTokens = oldBondedPoolBalances.Sub(newBondedPoolBalances...).AmountOf(stakingKeeper.BondDenom(ctx))
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 6), diffTokens)

	// read updated validator
	validator, found = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	// power decreased by 3 again
	require.Equal(t, int64(4), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// slash validator again
	// all originally bonded stake has been slashed, so this will have no effect
	// on the unbonding delegation, but it will slash stake bonded since the infraction
	// this may not be the desirable behaviour, ref https://github.com/cosmos/cosmos-sdk/issues/1440
	ctx = ctx.WithBlockHeight(13)
	stakingKeeper.Slash(ctx, consAddr, 9, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	ubd, found = stakingKeeper.GetUnbondingDelegation(ctx, addrDels[0], addrVals[0])
	require.True(t, found)
	require.Len(t, ubd.Entries, 1)

	// balance unchanged
	require.Equal(t, sdk.NewInt(0), ubd.Entries[0].Balance)

	// bonded tokens burned again
	newBondedPoolBalances = bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	diffTokens = oldBondedPoolBalances.Sub(newBondedPoolBalances...).AmountOf(stakingKeeper.BondDenom(ctx))
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 9), diffTokens)

	// read updated validator
	validator, found = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	// power decreased by 3 again
	require.Equal(t, int64(1), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// slash validator again
	// all originally bonded stake has been slashed, so this will have no effect
	// on the unbonding delegation, but it will slash stake bonded since the infraction
	// this may not be the desirable behaviour, ref https://github.com/cosmos/cosmos-sdk/issues/1440
	ctx = ctx.WithBlockHeight(13)
	stakingKeeper.Slash(ctx, consAddr, 9, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	ubd, found = stakingKeeper.GetUnbondingDelegation(ctx, addrDels[0], addrVals[0])
	require.True(t, found)
	require.Len(t, ubd.Entries, 1)

	// balance unchanged
	require.Equal(t, sdk.NewInt(0), ubd.Entries[0].Balance)

	// just 1 bonded token burned again since that's all the validator now has
	newBondedPoolBalances = bankKeeper.GetAllBalances(ctx, bondedPool.GetAddress())
	diffTokens = oldBondedPoolBalances.Sub(newBondedPoolBalances...).AmountOf(stakingKeeper.BondDenom(ctx))
	require.Equal(t, stakingKeeper.TokensFromConsensusPower(ctx, 10), diffTokens)

	// apply TM updates
	applyValidatorSetUpdates(t, ctx, stakingKeeper, -1)

	// read updated validator
	// power decreased by 1 again, validator is out of stake
	// validator should be in unbonding period
	validator, _ = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.Equal(t, validator.GetStatus(), types.Unbonding)
}

// tests Slash at a previous height with a redelegation
func TestSlashWithRedelegation(t *testing.T) {
	stakingKeeper, bankKeeper, accountKeeper, ctx, addrDels, addrVals := bootstrapSlashTest(t, 10)
	consAddr := sdk.ConsAddress(PKs[0].Address())
	fraction := sdk.NewDecWithPrec(5, 1)
	bondDenom := stakingKeeper.BondDenom(ctx)

	// set a redelegation
	rdTokens := stakingKeeper.TokensFromConsensusPower(ctx, 6)
	rd := types.NewRedelegation(addrDels[0], addrVals[0], addrVals[1], 11, time.Unix(0, 0), rdTokens, sdk.NewDecFromInt(rdTokens), 0)
	stakingKeeper.SetRedelegation(ctx, rd)

	// set the associated delegation
	del := types.NewDelegation(addrDels[0], addrVals[1], sdk.NewDecFromInt(rdTokens))
	stakingKeeper.SetDelegation(ctx, del)

	// update bonded tokens
	bondedPool := stakingKeeper.GetBondedPool(ctx)
	notBondedPool := stakingKeeper.GetNotBondedPool(ctx)
	rdCoins := sdk.NewCoins(sdk.NewCoin(bondDenom, rdTokens.MulRaw(2)))

	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, bondedPool.GetName(), rdCoins))

	accountKeeper.SetModuleAccount(ctx, bondedPool)

	oldBonded := bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	oldNotBonded := bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount

	// slash validator
	ctx = ctx.WithBlockHeight(12)
	_, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	require.NotPanics(t, func() {
		stakingKeeper.Slash(ctx, consAddr, 10, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)
	})
	burnAmount := sdk.NewDecFromInt(stakingKeeper.TokensFromConsensusPower(ctx, 10)).Mul(fraction).TruncateInt()

	bondedPool = stakingKeeper.GetBondedPool(ctx)
	notBondedPool = stakingKeeper.GetNotBondedPool(ctx)

	// burn bonded tokens from only from delegations
	bondedPoolBalance := bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldBonded.Sub(burnAmount), bondedPoolBalance))

	notBondedPoolBalance := bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldNotBonded, notBondedPoolBalance))
	oldBonded = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount

	// read updating redelegation
	rd, found = stakingKeeper.GetRedelegation(ctx, addrDels[0], addrVals[0], addrVals[1])
	require.True(t, found)
	require.Len(t, rd.Entries, 1)
	// read updated validator
	validator, found := stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)
	// power decreased by 2 - 4 stake originally bonded at the time of infraction
	// was still bonded at the time of discovery and was slashed by half, 4 stake
	// bonded at the time of discovery hadn't been bonded at the time of infraction
	// and wasn't slashed
	require.Equal(t, int64(8), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// slash the validator again
	_, found = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	require.NotPanics(t, func() {
		stakingKeeper.Slash(ctx, consAddr, 10, 10, math.LegacyOneDec(), types.Infraction_INFRACTION_UNSPECIFIED)
	})
	burnAmount = stakingKeeper.TokensFromConsensusPower(ctx, 7)

	// read updated pool
	bondedPool = stakingKeeper.GetBondedPool(ctx)
	notBondedPool = stakingKeeper.GetNotBondedPool(ctx)

	// seven bonded tokens burned
	bondedPoolBalance = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldBonded.Sub(burnAmount), bondedPoolBalance))
	require.True(math.IntEq(t, oldNotBonded, notBondedPoolBalance))

	bondedPoolBalance = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldBonded.Sub(burnAmount), bondedPoolBalance))

	notBondedPoolBalance = bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldNotBonded, notBondedPoolBalance))
	oldBonded = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount

	// read updating redelegation
	rd, found = stakingKeeper.GetRedelegation(ctx, addrDels[0], addrVals[0], addrVals[1])
	require.True(t, found)
	require.Len(t, rd.Entries, 1)
	// read updated validator
	validator, found = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)
	// power decreased by 4
	require.Equal(t, int64(4), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))

	// slash the validator again, by 100%
	ctx = ctx.WithBlockHeight(12)
	_, found = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.True(t, found)

	require.NotPanics(t, func() {
		stakingKeeper.Slash(ctx, consAddr, 10, 10, math.LegacyOneDec(), types.Infraction_INFRACTION_UNSPECIFIED)
	})

	burnAmount = sdk.NewDecFromInt(stakingKeeper.TokensFromConsensusPower(ctx, 10)).Mul(math.LegacyOneDec()).TruncateInt()
	burnAmount = burnAmount.Sub(math.LegacyOneDec().MulInt(rdTokens).TruncateInt())

	// read updated pool
	bondedPool = stakingKeeper.GetBondedPool(ctx)
	notBondedPool = stakingKeeper.GetNotBondedPool(ctx)

	bondedPoolBalance = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldBonded.Sub(burnAmount), bondedPoolBalance))
	notBondedPoolBalance = bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldNotBonded, notBondedPoolBalance))
	oldBonded = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount

	// read updating redelegation
	rd, found = stakingKeeper.GetRedelegation(ctx, addrDels[0], addrVals[0], addrVals[1])
	require.True(t, found)
	require.Len(t, rd.Entries, 1)
	// apply TM updates
	applyValidatorSetUpdates(t, ctx, stakingKeeper, -1)
	// read updated validator
	// validator decreased to zero power, should be in unbonding period
	validator, _ = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.Equal(t, validator.GetStatus(), types.Unbonding)

	// slash the validator again, by 100%
	// no stake remains to be slashed
	ctx = ctx.WithBlockHeight(12)
	// validator still in unbonding period
	validator, _ = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.Equal(t, validator.GetStatus(), types.Unbonding)

	require.NotPanics(t, func() {
		stakingKeeper.Slash(ctx, consAddr, 10, 10, math.LegacyOneDec(), types.Infraction_INFRACTION_UNSPECIFIED)
	})

	// read updated pool
	bondedPool = stakingKeeper.GetBondedPool(ctx)
	notBondedPool = stakingKeeper.GetNotBondedPool(ctx)

	bondedPoolBalance = bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldBonded, bondedPoolBalance))
	notBondedPoolBalance = bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldNotBonded, notBondedPoolBalance))

	// read updating redelegation
	rd, found = stakingKeeper.GetRedelegation(ctx, addrDels[0], addrVals[0], addrVals[1])
	require.True(t, found)
	require.Len(t, rd.Entries, 1)
	// read updated validator
	// power still zero, still in unbonding period
	validator, _ = stakingKeeper.GetValidatorByConsAddr(ctx, consAddr)
	require.Equal(t, validator.GetStatus(), types.Unbonding)
}

// tests Slash at a previous height with both an unbonding delegation and a redelegation
func TestSlashBoth(t *testing.T) {
	stakingKeeper, bankKeeper, accountKeeper, ctx, addrDels, addrVals := bootstrapSlashTest(t, 10)
	fraction := sdk.NewDecWithPrec(5, 1)
	bondDenom := stakingKeeper.BondDenom(ctx)

	// set a redelegation with expiration timestamp beyond which the
	// redelegation shouldn't be slashed
	rdATokens := stakingKeeper.TokensFromConsensusPower(ctx, 6)
	rdA := types.NewRedelegation(addrDels[0], addrVals[0], addrVals[1], 11, time.Unix(0, 0), rdATokens, sdk.NewDecFromInt(rdATokens), 0)
	stakingKeeper.SetRedelegation(ctx, rdA)

	// set the associated delegation
	delA := types.NewDelegation(addrDels[0], addrVals[1], sdk.NewDecFromInt(rdATokens))
	stakingKeeper.SetDelegation(ctx, delA)

	// set an unbonding delegation with expiration timestamp (beyond which the
	// unbonding delegation shouldn't be slashed)
	ubdATokens := stakingKeeper.TokensFromConsensusPower(ctx, 4)
	ubdA := types.NewUnbondingDelegation(addrDels[0], addrVals[0], 11,
		time.Unix(0, 0), ubdATokens, 0)
	stakingKeeper.SetUnbondingDelegation(ctx, ubdA)

	bondedCoins := sdk.NewCoins(sdk.NewCoin(bondDenom, rdATokens.MulRaw(2)))
	notBondedCoins := sdk.NewCoins(sdk.NewCoin(bondDenom, ubdATokens))

	// update bonded tokens
	bondedPool := stakingKeeper.GetBondedPool(ctx)
	notBondedPool := stakingKeeper.GetNotBondedPool(ctx)

	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, bondedPool.GetName(), bondedCoins))
	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, notBondedPool.GetName(), notBondedCoins))

	accountKeeper.SetModuleAccount(ctx, bondedPool)
	accountKeeper.SetModuleAccount(ctx, notBondedPool)

	oldBonded := bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	oldNotBonded := bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount
	// slash validator
	ctx = ctx.WithBlockHeight(12)
	_, found := stakingKeeper.GetValidatorByConsAddr(ctx, sdk.GetConsAddress(PKs[0]))
	require.True(t, found)
	consAddr0 := sdk.ConsAddress(PKs[0].Address())
	stakingKeeper.Slash(ctx, consAddr0, 10, 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)

	burnedNotBondedAmount := fraction.MulInt(ubdATokens).TruncateInt()
	burnedBondAmount := sdk.NewDecFromInt(stakingKeeper.TokensFromConsensusPower(ctx, 10)).Mul(fraction).TruncateInt()
	burnedBondAmount = burnedBondAmount.Sub(burnedNotBondedAmount)

	// read updated pool
	bondedPool = stakingKeeper.GetBondedPool(ctx)
	notBondedPool = stakingKeeper.GetNotBondedPool(ctx)

	bondedPoolBalance := bankKeeper.GetBalance(ctx, bondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldBonded.Sub(burnedBondAmount), bondedPoolBalance))

	notBondedPoolBalance := bankKeeper.GetBalance(ctx, notBondedPool.GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, oldNotBonded.Sub(burnedNotBondedAmount), notBondedPoolBalance))

	// read updating redelegation
	rdA, found = stakingKeeper.GetRedelegation(ctx, addrDels[0], addrVals[0], addrVals[1])
	require.True(t, found)
	require.Len(t, rdA.Entries, 1)
	// read updated validator
	validator, found := stakingKeeper.GetValidatorByConsAddr(ctx, sdk.GetConsAddress(PKs[0]))
	require.True(t, found)
	// power not decreased, all stake was bonded since
	require.Equal(t, int64(10), validator.GetConsensusPower(stakingKeeper.PowerReduction(ctx)))
}

func TestSlashAmount(t *testing.T) {
	stakingKeeper, bankKeeper, _, ctx, _, _ := bootstrapSlashTest(t, 10)
	consAddr := sdk.ConsAddress(PKs[0].Address())
	fraction := sdk.NewDecWithPrec(5, 1)
	burnedCoins := stakingKeeper.Slash(ctx, consAddr, ctx.BlockHeight(), 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)
	require.True(t, burnedCoins.GT(math.ZeroInt()))

	// test the case where the validator was not found, which should return no coins
	_, addrVals := generateAddresses(stakingKeeper, bankKeeper, ctx, 100)
	noBurned := stakingKeeper.Slash(ctx, sdk.ConsAddress(addrVals[0]), ctx.BlockHeight(), 10, fraction, types.Infraction_INFRACTION_UNSPECIFIED)
	require.True(t, sdk.NewInt(0).Equal(noBurned))
}
