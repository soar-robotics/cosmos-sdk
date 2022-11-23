package keeper_test

import (
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"github.com/cosmos/cosmos-sdk/runtime"
	simtestutil "github.com/cosmos/cosmos-sdk/testutil/sims"
	sdk "github.com/cosmos/cosmos-sdk/types"
	moduletestutil "github.com/cosmos/cosmos-sdk/types/module/testutil"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/cosmos/cosmos-sdk/x/staking/keeper"
	stakingtestutil "github.com/cosmos/cosmos-sdk/x/staking/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
)

var PKs = simtestutil.CreateTestPubKeys(500)

func init() {
	sdk.DefaultPowerReduction = sdk.NewIntFromBigInt(new(big.Int).Exp(big.NewInt(10), big.NewInt(18), nil))
}

// createTestInput Returns an custom stakingKeeper
// to avoid messing with the hooks.
func createTestInput(t *testing.T) (*keeper.Keeper, bankkeeper.Keeper, authkeeper.AccountKeeper, sdk.Context) {
	var (
		stakingKeeper *keeper.Keeper
		bankKeeper    bankkeeper.Keeper
		accountKeeper authkeeper.AccountKeeper
	)

	app, err := simtestutil.Setup(stakingtestutil.AppConfig, &stakingKeeper, &bankKeeper, &accountKeeper)
	require.NoError(t, err)

	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	return stakingKeeper, bankKeeper, accountKeeper, ctx
}

// intended to be used with require/assert:  require.True(ValEq(...))
func ValEq(t *testing.T, exp, got types.Validator) (*testing.T, bool, string, types.Validator, types.Validator) {
	return t, exp.MinEqual(&got), "expected:\n%v\ngot:\n%v", exp, got
}

// generateAddresses generates numAddrs of normal AccAddrs and ValAddrs
func generateAddresses(stakingKeeper *keeper.Keeper, bankKeeper bankkeeper.Keeper, ctx sdk.Context, numAddrs int) ([]sdk.AccAddress, []sdk.ValAddress) {
	addrDels := simtestutil.AddTestAddrsIncremental(bankKeeper, stakingKeeper, ctx, numAddrs, sdk.NewInt(10000))
	addrVals := simtestutil.ConvertAddrsToValAddrs(addrDels)

	return addrDels, addrVals
}

func createValidators(t *testing.T, ctx sdk.Context, app *runtime.App, stakingKeeper *keeper.Keeper, bankKeeper bankkeeper.Keeper, accountKeeper authkeeper.AccountKeeper, powers []int64) ([]sdk.AccAddress, []sdk.ValAddress, []types.Validator) {
	addrs := simtestutil.AddTestAddrsIncremental(bankKeeper, stakingKeeper, ctx, 5, stakingKeeper.TokensFromConsensusPower(ctx, 300))
	valAddrs := simtestutil.ConvertAddrsToValAddrs(addrs)
	pks := simtestutil.CreateTestPubKeys(5)
	cdc := moduletestutil.MakeTestEncodingConfig().Codec
	stakingKeeper = keeper.NewKeeper(
		cdc,
		app.UnsafeFindStoreKey(types.StoreKey),
		accountKeeper,
		bankKeeper,
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
	)

	val1 := stakingtestutil.NewValidator(t, valAddrs[0], pks[0])
	val2 := stakingtestutil.NewValidator(t, valAddrs[1], pks[1])
	vals := []types.Validator{val1, val2}

	stakingKeeper.SetValidator(ctx, val1)
	stakingKeeper.SetValidator(ctx, val2)
	stakingKeeper.SetValidatorByConsAddr(ctx, val1)
	stakingKeeper.SetValidatorByConsAddr(ctx, val2)
	stakingKeeper.SetNewValidatorByPowerIndex(ctx, val1)
	stakingKeeper.SetNewValidatorByPowerIndex(ctx, val2)

	_, err := stakingKeeper.Delegate(ctx, addrs[0], stakingKeeper.TokensFromConsensusPower(ctx, powers[0]), types.Unbonded, val1, true)
	require.NoError(t, err)
	_, err = stakingKeeper.Delegate(ctx, addrs[1], stakingKeeper.TokensFromConsensusPower(ctx, powers[1]), types.Unbonded, val2, true)
	require.NoError(t, err)
	_, err = stakingKeeper.Delegate(ctx, addrs[0], stakingKeeper.TokensFromConsensusPower(ctx, powers[2]), types.Unbonded, val2, true)
	require.NoError(t, err)
	applyValidatorSetUpdates(t, ctx, stakingKeeper, -1)

	return addrs, valAddrs, vals
}
