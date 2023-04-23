"use strict";(self.webpackChunkcosmos_sdk_docs=self.webpackChunkcosmos_sdk_docs||[]).push([[6165],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>c});var n=a(7294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var l=n.createContext({}),m=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},u=function(e){var t=m(e.components);return n.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=m(a),c=i,h=d["".concat(l,".").concat(c)]||d[c]||p[c]||o;return a?n.createElement(h,r(r({ref:t},u),{},{components:a})):n.createElement(h,r({ref:t},u))}));function c(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=a.length,r=new Array(o);r[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var m=2;m<o;m++)r[m]=a[m];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},4963:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>m});var n=a(7462),i=(a(7294),a(3905));const o={sidebar_position:1},r="Cosmos Blockchain Simulator",s={unversionedId:"core/simulation",id:"version-v0.47/core/simulation",title:"Cosmos Blockchain Simulator",description:"The Cosmos SDK offers a full fledged simulation framework to fuzz test every",source:"@site/versioned_docs/version-v0.47/core/12-simulation.md",sourceDirName:"core",slug:"/core/simulation",permalink:"/v0.47/core/simulation",draft:!1,tags:[],version:"v0.47",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"RunTx recovery middleware",permalink:"/v0.47/core/runtx_middleware"},next:{title:"Protobuf Documentation",permalink:"/v0.47/core/proto-docs"}},l={},m=[{value:"Goals",id:"goals",level:2},{value:"Simulation commands",id:"simulation-commands",level:2},{value:"Simulator Modes",id:"simulator-modes",level:2},{value:"Usage",id:"usage",level:2},{value:"Debugging Tips",id:"debugging-tips",level:2},{value:"Use simulation in your Cosmos SDK-based application",id:"use-simulation-in-your-cosmos-sdk-based-application",level:2}],u={toc:m};function p(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"cosmos-blockchain-simulator"},"Cosmos Blockchain Simulator"),(0,i.kt)("p",null,"The Cosmos SDK offers a full fledged simulation framework to fuzz test every\nmessage defined by a module."),(0,i.kt)("p",null,"On the Cosmos SDK, this functionality is provided by the",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/simapp/app.go"},(0,i.kt)("inlineCode",{parentName:"a"},"SimApp")),", which is a\n",(0,i.kt)("inlineCode",{parentName:"p"},"Baseapp")," application that is used for running the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/x/simulation"},(0,i.kt)("inlineCode",{parentName:"a"},"simulation"))," module.\nThis module defines all the simulation logic as well as the operations for\nrandomized parameters like accounts, balances etc."),(0,i.kt)("h2",{id:"goals"},"Goals"),(0,i.kt)("p",null,"The blockchain simulator tests how the blockchain application would behave under\nreal life circumstances by generating and sending randomized messages.\nThe goal of this is to detect and debug failures that could halt a live chain,\nby providing logs and statistics about the operations run by the simulator as\nwell as exporting the latest application state when a failure was found."),(0,i.kt)("p",null,"Its main difference with integration testing is that the simulator app allows\nyou to pass parameters to customize the chain that's being simulated.\nThis comes in handy when trying to reproduce bugs that were generated in the\nprovided operations (randomized or not)."),(0,i.kt)("h2",{id:"simulation-commands"},"Simulation commands"),(0,i.kt)("p",null,"The simulation app has different commands, each of which tests a different\nfailure type:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"AppImportExport"),": The simulator exports the initial app state and then it\ncreates a new app with the exported ",(0,i.kt)("inlineCode",{parentName:"li"},"genesis.json")," as an input, checking for\ninconsistencies between the stores."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"AppSimulationAfterImport"),": Queues two simulations together. The first one provides the app state (",(0,i.kt)("em",{parentName:"li"},"i.e")," genesis) to the second. Useful to test software upgrades or hard-forks from a live chain."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"AppStateDeterminism"),": Checks that all the nodes return the same values, in the same order."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"BenchmarkInvariants"),": Analysis of the performance of running all modules' invariants (",(0,i.kt)("em",{parentName:"li"},"i.e")," sequentially runs a ",(0,i.kt)("a",{parentName:"li",href:"https://pkg.go.dev/testing/#hdr-Benchmarks"},"benchmark")," test). An invariant checks for\ndifferences between the values that are on the store and the passive tracker. Eg: total coins held by accounts vs total supply tracker."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"FullAppSimulation"),": General simulation mode. Runs the chain and the specified operations for a given number of blocks. Tests that there're no ",(0,i.kt)("inlineCode",{parentName:"li"},"panics")," on the simulation. It does also run invariant checks on every ",(0,i.kt)("inlineCode",{parentName:"li"},"Period")," but they are not benchmarked.")),(0,i.kt)("p",null,"Each simulation must receive a set of inputs (",(0,i.kt)("em",{parentName:"p"},"i.e")," flags) such as the number of\nblocks that the simulation is run, seed, block size, etc.\nCheck the full list of flags ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/simapp/config.go#L32-L55"},"here"),"."),(0,i.kt)("h2",{id:"simulator-modes"},"Simulator Modes"),(0,i.kt)("p",null,"In addition to the various inputs and commands, the simulator runs in three modes:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Completely random where the initial state, module parameters and simulation\nparameters are ",(0,i.kt)("strong",{parentName:"li"},"pseudo-randomly generated"),"."),(0,i.kt)("li",{parentName:"ol"},"From a ",(0,i.kt)("inlineCode",{parentName:"li"},"genesis.json")," file where the initial state and the module parameters are defined.\nThis mode is helpful for running simulations on a known state such as a live network export where a new (mostly likely breaking) version of the application needs to be tested."),(0,i.kt)("li",{parentName:"ol"},"From a ",(0,i.kt)("inlineCode",{parentName:"li"},"params.json")," file where the initial state is pseudo-randomly generated but the module and simulation parameters can be provided manually.\nThis allows for a more controlled and deterministic simulation setup while allowing the state space to still be pseudo-randomly simulated.\nThe list of available parameters are listed ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/simapp/config.go#L33-L57"},"here"),".")),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"These modes are not mutually exclusive. So you can for example run a randomly\ngenerated genesis state (",(0,i.kt)("inlineCode",{parentName:"p"},"1"),") with manually generated simulation params (",(0,i.kt)("inlineCode",{parentName:"p"},"3"),").")),(0,i.kt)("h2",{id:"usage"},"Usage"),(0,i.kt)("p",null,"This is a general example of how simulations are run. For more specific examples\ncheck the Cosmos SDK ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/Makefile#L263-L299"},"Makefile"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"}," $ go test -mod=readonly github.com/cosmos/cosmos-sdk/simapp \\\n  -run=TestApp<simulation_command> \\\n  ...<flags>\n  -v -timeout 24h\n")),(0,i.kt)("h2",{id:"debugging-tips"},"Debugging Tips"),(0,i.kt)("p",null,"Here are some suggestions when encountering a simulation failure:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Export the app state at the height where the failure was found. You can do this\nby passing the ",(0,i.kt)("inlineCode",{parentName:"li"},"-ExportStatePath")," flag to the simulator."),(0,i.kt)("li",{parentName:"ul"},"Use ",(0,i.kt)("inlineCode",{parentName:"li"},"-Verbose")," logs. They could give you a better hint on all the operations\ninvolved."),(0,i.kt)("li",{parentName:"ul"},"Reduce the simulation ",(0,i.kt)("inlineCode",{parentName:"li"},"-Period"),". This will run the invariants checks more\nfrequently."),(0,i.kt)("li",{parentName:"ul"},"Print all the failed invariants at once with ",(0,i.kt)("inlineCode",{parentName:"li"},"-PrintAllInvariants"),"."),(0,i.kt)("li",{parentName:"ul"},"Try using another ",(0,i.kt)("inlineCode",{parentName:"li"},"-Seed"),". If it can reproduce the same error and if it fails\nsooner, you will spend less time running the simulations."),(0,i.kt)("li",{parentName:"ul"},"Reduce the ",(0,i.kt)("inlineCode",{parentName:"li"},"-NumBlocks")," . How's the app state at the height previous to the\nfailure?"),(0,i.kt)("li",{parentName:"ul"},"Run invariants on every operation with ",(0,i.kt)("inlineCode",{parentName:"li"},"-SimulateEveryOperation"),". ",(0,i.kt)("em",{parentName:"li"},"Note"),": this\nwill slow down your simulation ",(0,i.kt)("strong",{parentName:"li"},"a lot"),"."),(0,i.kt)("li",{parentName:"ul"},"Try adding logs to operations that are not logged. You will have to define a\n",(0,i.kt)("a",{parentName:"li",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/x/staking/keeper/keeper.go#L60-L63"},"Logger")," on your ",(0,i.kt)("inlineCode",{parentName:"li"},"Keeper"),".")),(0,i.kt)("h2",{id:"use-simulation-in-your-cosmos-sdk-based-application"},"Use simulation in your Cosmos SDK-based application"),(0,i.kt)("p",null,"Learn how you can integrate the simulation into your Cosmos SDK-based application:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Application Simulation Manager"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/v0.47/building-modules/simulator"},"Building modules: Simulator")),(0,i.kt)("li",{parentName:"ul"},"Simulator tests")))}p.isMDXComponent=!0}}]);