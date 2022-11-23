package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/suite"

	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"github.com/cosmos/cosmos-sdk/baseapp"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	simtestutil "github.com/cosmos/cosmos-sdk/testutil/sims"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	"github.com/cosmos/cosmos-sdk/x/staking/keeper"
	stakingtestutil "github.com/cosmos/cosmos-sdk/x/staking/testutil"
	"github.com/cosmos/cosmos-sdk/x/staking/types"
)

type IntegrationTestSuite struct {
	suite.Suite

	stakingKeeper *keeper.Keeper
	bankKeeper    bankkeeper.Keeper
	accountKeeper authkeeper.AccountKeeper

	interfaceRegistry codectypes.InterfaceRegistry
	ctx               sdk.Context
	addrs             []sdk.AccAddress
	vals              []types.Validator
	queryClient       types.QueryClient
	msgServer         types.MsgServer
}

func (suite *IntegrationTestSuite) SetupTest() {
	app, err := simtestutil.Setup(stakingtestutil.AppConfig, &suite.stakingKeeper, &suite.bankKeeper, &suite.accountKeeper, &suite.interfaceRegistry)
	suite.Require().NoError(err)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	querier := keeper.Querier{Keeper: suite.stakingKeeper}

	queryHelper := baseapp.NewQueryServerTestHelper(ctx, suite.interfaceRegistry)
	types.RegisterQueryServer(queryHelper, querier)
	queryClient := types.NewQueryClient(queryHelper)

	suite.msgServer = keeper.NewMsgServerImpl(suite.stakingKeeper)

	addrs, _, validators := createValidators(suite.T(), ctx, app, suite.stakingKeeper, suite.bankKeeper, suite.accountKeeper, []int64{9, 8, 7})
	header := tmproto.Header{
		ChainID: "HelloChain",
		Height:  5,
	}

	// sort a copy of the validators, so that original validators does not
	// have its order changed
	sortedVals := make([]types.Validator, len(validators))
	copy(sortedVals, validators)
	hi := types.NewHistoricalInfo(header, sortedVals, suite.stakingKeeper.PowerReduction(ctx))
	suite.stakingKeeper.SetHistoricalInfo(ctx, 5, &hi)

	suite.ctx, suite.queryClient, suite.addrs, suite.vals = ctx, queryClient, addrs, validators
}

func TestIntegrationTestSuite(t *testing.T) {
	suite.Run(t, new(IntegrationTestSuite))
}
