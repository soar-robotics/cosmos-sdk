package keeper_test

import (
	"testing"
	"time"

	"cosmossdk.io/math"
	"github.com/stretchr/testify/require"

	simtestutil "github.com/cosmos/cosmos-sdk/testutil/sims"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktestutil "github.com/cosmos/cosmos-sdk/x/bank/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/keeper"
	"github.com/cosmos/cosmos-sdk/x/staking/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
)

func TestUnbondingDelegationsMaxEntries(t *testing.T) {
	stakingKeeper, bankKeeper, accountKeeper, ctx := createTestInput(t)

	addrDels := simtestutil.AddTestAddrsIncremental(bankKeeper, stakingKeeper, ctx, 1, sdk.NewInt(10000))
	addrVals := simtestutil.ConvertAddrsToValAddrs(addrDels)

	startTokens := stakingKeeper.TokensFromConsensusPower(ctx, 10)

	bondDenom := stakingKeeper.BondDenom(ctx)
	notBondedPool := stakingKeeper.GetNotBondedPool(ctx)

	require.NoError(t, banktestutil.FundModuleAccount(bankKeeper, ctx, notBondedPool.GetName(), sdk.NewCoins(sdk.NewCoin(bondDenom, startTokens))))
	accountKeeper.SetModuleAccount(ctx, notBondedPool)

	// create a validator and a delegator to that validator
	validator := testutil.NewValidator(t, addrVals[0], PKs[0])

	validator, issuedShares := validator.AddTokensFromDel(startTokens)
	require.Equal(t, startTokens, issuedShares.RoundInt())

	validator = keeper.TestingUpdateValidator(stakingKeeper, ctx, validator, true)
	require.True(math.IntEq(t, startTokens, validator.BondedTokens()))
	require.True(t, validator.IsBonded())

	delegation := types.NewDelegation(addrDels[0], addrVals[0], issuedShares)
	stakingKeeper.SetDelegation(ctx, delegation)

	maxEntries := stakingKeeper.MaxEntries(ctx)

	oldBonded := bankKeeper.GetBalance(ctx, stakingKeeper.GetBondedPool(ctx).GetAddress(), bondDenom).Amount
	oldNotBonded := bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount

	// should all pass
	var completionTime time.Time
	for i := int64(0); i < int64(maxEntries); i++ {
		var err error
		ctx = ctx.WithBlockHeight(i)
		completionTime, err = stakingKeeper.Undelegate(ctx, addrDels[0], addrVals[0], math.LegacyNewDec(1))
		require.NoError(t, err)
	}

	newBonded := bankKeeper.GetBalance(ctx, stakingKeeper.GetBondedPool(ctx).GetAddress(), bondDenom).Amount
	newNotBonded := bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, newBonded, oldBonded.SubRaw(int64(maxEntries))))
	require.True(math.IntEq(t, newNotBonded, oldNotBonded.AddRaw(int64(maxEntries))))

	oldBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetBondedPool(ctx).GetAddress(), bondDenom).Amount
	oldNotBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount

	// an additional unbond should fail due to max entries
	_, err := stakingKeeper.Undelegate(ctx, addrDels[0], addrVals[0], math.LegacyNewDec(1))
	require.Error(t, err)

	newBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetBondedPool(ctx).GetAddress(), bondDenom).Amount
	newNotBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount

	require.True(math.IntEq(t, newBonded, oldBonded))
	require.True(math.IntEq(t, newNotBonded, oldNotBonded))

	// mature unbonding delegations
	ctx = ctx.WithBlockTime(completionTime)
	_, err = stakingKeeper.CompleteUnbonding(ctx, addrDels[0], addrVals[0])
	require.NoError(t, err)

	newBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetBondedPool(ctx).GetAddress(), bondDenom).Amount
	newNotBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, newBonded, oldBonded))
	require.True(math.IntEq(t, newNotBonded, oldNotBonded.SubRaw(int64(maxEntries))))

	oldNotBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount

	// unbonding  should work again
	_, err = stakingKeeper.Undelegate(ctx, addrDels[0], addrVals[0], math.LegacyNewDec(1))
	require.NoError(t, err)

	newBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetBondedPool(ctx).GetAddress(), bondDenom).Amount
	newNotBonded = bankKeeper.GetBalance(ctx, stakingKeeper.GetNotBondedPool(ctx).GetAddress(), bondDenom).Amount
	require.True(math.IntEq(t, newBonded, oldBonded.SubRaw(1)))
	require.True(math.IntEq(t, newNotBonded, oldNotBonded.AddRaw(1)))
}
