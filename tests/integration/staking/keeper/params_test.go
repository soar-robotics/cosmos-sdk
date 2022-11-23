package keeper

import (
	"testing"

	"github.com/cosmos/cosmos-sdk/testutil/sims"
	"github.com/cosmos/cosmos-sdk/x/staking/keeper"
	stakingtestutil "github.com/cosmos/cosmos-sdk/x/staking/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
)

func TestParams(t *testing.T) {
	var stakingKeeper *keeper.Keeper

	app, err := sims.Setup(stakingtestutil.AppConfig, &stakingKeeper)
	require.NoError(t, err)

	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	expParams := types.DefaultParams()

	// check that the empty keeper loads the default
	resParams := stakingKeeper.GetParams(ctx)
	require.True(t, expParams.Equal(resParams))

	// modify a params, save, and retrieve
	expParams.MaxValidators = 777
	stakingKeeper.SetParams(ctx, expParams)
	resParams = stakingKeeper.GetParams(ctx)
	require.True(t, expParams.Equal(resParams))
}
