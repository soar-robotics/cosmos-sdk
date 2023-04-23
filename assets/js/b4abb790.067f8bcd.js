"use strict";(self.webpackChunkcosmos_sdk_docs=self.webpackChunkcosmos_sdk_docs||[]).push([[9318],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>h});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),c=p(a),h=o,u=c["".concat(l,".").concat(h)]||c[h]||d[h]||r;return a?n.createElement(u,i(i({ref:t},m),{},{components:a})):n.createElement(u,i({ref:t},m))}));function h(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<r;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},8804:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var n=a(7462),o=(a(7294),a(3905));const r={sidebar_position:1},i="Store",s={unversionedId:"core/store",id:"version-v0.47/core/store",title:"Store",description:"A store is a data structure that holds the state of the application.",source:"@site/versioned_docs/version-v0.47/core/04-store.md",sourceDirName:"core",slug:"/core/store",permalink:"/v0.47/core/store",draft:!1,tags:[],version:"v0.47",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Node Client (Daemon)",permalink:"/v0.47/core/node"},next:{title:"Encoding",permalink:"/v0.47/core/encoding"}},l={},p=[{value:"Introduction to Cosmos SDK Stores",id:"introduction-to-cosmos-sdk-stores",level:2},{value:"Store Interface",id:"store-interface",level:3},{value:"Commit Store",id:"commit-store",level:3},{value:"Multistore",id:"multistore",level:2},{value:"Multistore Interface",id:"multistore-interface",level:3},{value:"CommitMultiStore",id:"commitmultistore",level:3},{value:"CacheMultiStore",id:"cachemultistore",level:3},{value:"Base-layer KVStores",id:"base-layer-kvstores",level:2},{value:"<code>KVStore</code> and <code>CommitKVStore</code> Interfaces",id:"kvstore-and-commitkvstore-interfaces",level:3},{value:"<code>IAVL</code> Store",id:"iavl-store",level:3},{value:"<code>DbAdapter</code> Store",id:"dbadapter-store",level:3},{value:"<code>Transient</code> Store",id:"transient-store",level:3},{value:"KVStore Wrappers",id:"kvstore-wrappers",level:2},{value:"CacheKVStore",id:"cachekvstore",level:3},{value:"<code>Get</code>",id:"get",level:4},{value:"<code>Set</code>",id:"set",level:4},{value:"<code>Iterator</code>",id:"iterator",level:4},{value:"<code>GasKv</code> Store",id:"gaskv-store",level:3},{value:"<code>TraceKv</code> Store",id:"tracekv-store",level:3},{value:"<code>Prefix</code> Store",id:"prefix-store",level:3},{value:"<code>ListenKv</code> Store",id:"listenkv-store",level:3},{value:"New Store package (<code>store/v2alpha1</code>)",id:"new-store-package-storev2alpha1",level:2},{value:"<code>BasicKVStore</code> interface",id:"basickvstore-interface",level:2},{value:"MultiStore",id:"multistore-1",level:2},{value:"<code>CommitMultiStore</code>",id:"commitmultistore-1",level:3},{value:"<code>BasicMultiStore</code>",id:"basicmultistore",level:3},{value:"Implementation (<code>root.Store</code>)",id:"implementation-rootstore",level:3},{value:"SMT Store",id:"smt-store",level:2}],m={toc:p};function d(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"store"},"Store"),(0,o.kt)("admonition",{title:"Synopsis",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"A store is a data structure that holds the state of the application.")),(0,o.kt)("admonition",{type:"note"},(0,o.kt)("h3",{parentName:"admonition",id:"pre-requisite-readings"},"Pre-requisite Readings"),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/v0.47/basics/app-anatomy"},"Anatomy of a Cosmos SDK application")))),(0,o.kt)("h2",{id:"introduction-to-cosmos-sdk-stores"},"Introduction to Cosmos SDK Stores"),(0,o.kt)("p",null,"The Cosmos SDK comes with a large set of stores to persist the state of applications. By default, the main store of Cosmos SDK applications is a ",(0,o.kt)("inlineCode",{parentName:"p"},"multistore"),", i.e. a store of stores. Developers can add any number of key-value stores to the multistore, depending on their application needs. The multistore exists to support the modularity of the Cosmos SDK, as it lets each module declare and manage their own subset of the state. Key-value stores in the multistore can only be accessed with a specific capability ",(0,o.kt)("inlineCode",{parentName:"p"},"key"),", which is typically held in the ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/building-modules/keeper"},(0,o.kt)("inlineCode",{parentName:"a"},"keeper"))," of the module that declared the store."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"+-----------------------------------------------------+\n|                                                     |\n|    +--------------------------------------------+   |\n|    |                                            |   |\n|    |  KVStore 1 - Manage by keeper of Module 1  |\n|    |                                            |   |\n|    +--------------------------------------------+   |\n|                                                     |\n|    +--------------------------------------------+   |\n|    |                                            |   |\n|    |  KVStore 2 - Manage by keeper of Module 2  |   |\n|    |                                            |   |\n|    +--------------------------------------------+   |\n|                                                     |\n|    +--------------------------------------------+   |\n|    |                                            |   |\n|    |  KVStore 3 - Manage by keeper of Module 2  |   |\n|    |                                            |   |\n|    +--------------------------------------------+   |\n|                                                     |\n|    +--------------------------------------------+   |\n|    |                                            |   |\n|    |  KVStore 4 - Manage by keeper of Module 3  |   |\n|    |                                            |   |\n|    +--------------------------------------------+   |\n|                                                     |\n|    +--------------------------------------------+   |\n|    |                                            |   |\n|    |  KVStore 5 - Manage by keeper of Module 4  |   |\n|    |                                            |   |\n|    +--------------------------------------------+   |\n|                                                     |\n|                    Main Multistore                  |\n|                                                     |\n+-----------------------------------------------------+\n\n                   Application's State\n")),(0,o.kt)("h3",{id:"store-interface"},"Store Interface"),(0,o.kt)("p",null,"At its very core, a Cosmos SDK ",(0,o.kt)("inlineCode",{parentName:"p"},"store")," is an object that holds a ",(0,o.kt)("inlineCode",{parentName:"p"},"CacheWrapper")," and has a ",(0,o.kt)("inlineCode",{parentName:"p"},"GetStoreType()")," method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L16-L19\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"GetStoreType")," is a simple method that returns the type of store, whereas a ",(0,o.kt)("inlineCode",{parentName:"p"},"CacheWrapper")," is a simple interface that implements store read caching and write branching through ",(0,o.kt)("inlineCode",{parentName:"p"},"Write")," method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L247-L277\n")),(0,o.kt)("p",null,"Branching and cache is used ubiquitously in the Cosmos SDK and required to be implemented on every store type. A storage branch creates an isolated, ephemeral branch of a store that can be passed around and updated without affecting the main underlying store. This is used to trigger temporary state-transitions that may be reverted later should an error occur. Read more about it in ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/core/context#Store-branching"},"context")),(0,o.kt)("h3",{id:"commit-store"},"Commit Store"),(0,o.kt)("p",null,"A commit store is a store that has the ability to commit changes made to the underlying tree or db. The Cosmos SDK differentiates simple stores from commit stores by extending the basic store interfaces with a ",(0,o.kt)("inlineCode",{parentName:"p"},"Committer"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L30-L34\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Committer")," is an interface that defines methods to persist changes to disk:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L21-L28\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitID")," is a deterministic commit of the state tree. Its hash is returned to the underlying consensus engine and stored in the block header. Note that commit store interfaces exist for various purposes, one of which is to make sure not every object can commit the store. As part of the ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/core/ocap"},"object-capabilities model")," of the Cosmos SDK, only ",(0,o.kt)("inlineCode",{parentName:"p"},"baseapp")," should have the ability to commit stores. For example, this is the reason why the ",(0,o.kt)("inlineCode",{parentName:"p"},"ctx.KVStore()")," method by which modules typically access stores returns a ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," and not a ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitKVStore"),"."),(0,o.kt)("p",null,"The Cosmos SDK comes with many types of stores, the most used being ",(0,o.kt)("a",{parentName:"p",href:"#multistore"},(0,o.kt)("inlineCode",{parentName:"a"},"CommitMultiStore")),", ",(0,o.kt)("a",{parentName:"p",href:"#kvstore"},(0,o.kt)("inlineCode",{parentName:"a"},"KVStore"))," and ",(0,o.kt)("a",{parentName:"p",href:"#gaskv-store"},(0,o.kt)("inlineCode",{parentName:"a"},"GasKv")," store"),". ",(0,o.kt)("a",{parentName:"p",href:"#other-stores"},"Other types of stores")," include ",(0,o.kt)("inlineCode",{parentName:"p"},"Transient")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"TraceKV")," stores."),(0,o.kt)("h2",{id:"multistore"},"Multistore"),(0,o.kt)("h3",{id:"multistore-interface"},"Multistore Interface"),(0,o.kt)("p",null,"Each Cosmos SDK application holds a multistore at its root to persist its state. The multistore is a store of ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStores")," that follows the ",(0,o.kt)("inlineCode",{parentName:"p"},"Multistore")," interface:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L97-L133\n")),(0,o.kt)("p",null,"If tracing is enabled, then branching the multistore will firstly wrap all the underlying ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," in ",(0,o.kt)("a",{parentName:"p",href:"#tracekv-store"},(0,o.kt)("inlineCode",{parentName:"a"},"TraceKv.Store")),"."),(0,o.kt)("h3",{id:"commitmultistore"},"CommitMultiStore"),(0,o.kt)("p",null,"The main type of ",(0,o.kt)("inlineCode",{parentName:"p"},"Multistore")," used in the Cosmos SDK is ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitMultiStore"),", which is an extension of the ",(0,o.kt)("inlineCode",{parentName:"p"},"Multistore")," interface:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L141-L187\n")),(0,o.kt)("p",null,"As for concrete implementation, the ","[",(0,o.kt)("inlineCode",{parentName:"p"},"rootMulti.Store"),"]"," is the go-to implementation of the ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitMultiStore")," interface."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/rootmulti/store.go#L38-L61\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"rootMulti.Store")," is a base-layer multistore built around a ",(0,o.kt)("inlineCode",{parentName:"p"},"db")," on top of which multiple ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStores")," can be mounted, and is the default multistore store used in ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/core/baseapp"},(0,o.kt)("inlineCode",{parentName:"a"},"baseapp")),"."),(0,o.kt)("h3",{id:"cachemultistore"},"CacheMultiStore"),(0,o.kt)("p",null,"Whenever the ",(0,o.kt)("inlineCode",{parentName:"p"},"rootMulti.Store")," needs to be branched, a ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/cachemulti/store.go"},(0,o.kt)("inlineCode",{parentName:"a"},"cachemulti.Store"))," is used."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/cachemulti/store.go#L20-L36\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"cachemulti.Store")," branches all substores (creates a virtual store for each substore) in its constructor and hold them in ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.stores"),". Moreover caches all read queries. ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.GetKVStore()")," returns the store from ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.stores"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.Write()")," recursively calls ",(0,o.kt)("inlineCode",{parentName:"p"},"CacheWrap.Write()")," on all the substores."),(0,o.kt)("h2",{id:"base-layer-kvstores"},"Base-layer KVStores"),(0,o.kt)("h3",{id:"kvstore-and-commitkvstore-interfaces"},(0,o.kt)("inlineCode",{parentName:"h3"},"KVStore")," and ",(0,o.kt)("inlineCode",{parentName:"h3"},"CommitKVStore")," Interfaces"),(0,o.kt)("p",null,"A ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," is a simple key-value store used to store and retrieve data. A ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitKVStore")," is a ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," that also implements a ",(0,o.kt)("inlineCode",{parentName:"p"},"Committer"),". By default, stores mounted in ",(0,o.kt)("inlineCode",{parentName:"p"},"baseapp"),"'s main ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitMultiStore")," are ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitKVStore"),"s. The ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," interface is primarily used to restrict modules from accessing the committer."),(0,o.kt)("p",null,"Individual ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore"),"s are used by modules to manage a subset of the global state. ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStores")," can be accessed by objects that hold a specific key. This ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," should only be exposed to the ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/building-modules/keeper"},(0,o.kt)("inlineCode",{parentName:"a"},"keeper"))," of the module that defines the store."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"CommitKVStore"),"s are declared by proxy of their respective ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," and mounted on the application's ",(0,o.kt)("a",{parentName:"p",href:"#multistore"},"multistore")," in the ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/basics/app-anatomy#core-application-file"},"main application file"),". In the same file, the ",(0,o.kt)("inlineCode",{parentName:"p"},"key")," is also passed to the module's ",(0,o.kt)("inlineCode",{parentName:"p"},"keeper")," that is responsible for managing the store."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/store.go#L192-L226\n")),(0,o.kt)("p",null,"Apart from the traditional ",(0,o.kt)("inlineCode",{parentName:"p"},"Get")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Set")," methods, that a ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," must implement via the ",(0,o.kt)("inlineCode",{parentName:"p"},"BasicKVStore")," interface; a ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," must provide an ",(0,o.kt)("inlineCode",{parentName:"p"},"Iterator(start, end)")," method which returns an ",(0,o.kt)("inlineCode",{parentName:"p"},"Iterator")," object. It is used to iterate over a range of keys, typically keys that share a common prefix. Below is an example from the bank's module keeper, used to iterate over all account balances:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/x/bank/keeper/view.go#L114-L132\n")),(0,o.kt)("h3",{id:"iavl-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"IAVL")," Store"),(0,o.kt)("p",null,"The default implementation of ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitKVStore")," used in ",(0,o.kt)("inlineCode",{parentName:"p"},"baseapp")," is the ",(0,o.kt)("inlineCode",{parentName:"p"},"iavl.Store"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/iavl/store.go#L37-L40\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"iavl")," stores are based around an ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cosmos/iavl"},"IAVL Tree"),", a self-balancing binary tree which guarantees that:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Get")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"Set")," operations are O(log n), where n is the number of elements in the tree."),(0,o.kt)("li",{parentName:"ul"},"Iteration efficiently returns the sorted elements within the range."),(0,o.kt)("li",{parentName:"ul"},"Each tree version is immutable and can be retrieved even after a commit (depending on the pruning settings).")),(0,o.kt)("p",null,"The documentation on the IAVL Tree is located ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cosmos/iavl/blob/master/docs/overview.md"},"here"),"."),(0,o.kt)("h3",{id:"dbadapter-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"DbAdapter")," Store"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"dbadapter.Store")," is a adapter for ",(0,o.kt)("inlineCode",{parentName:"p"},"dbm.DB")," making it fulfilling the ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," interface."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/dbadapter/store.go#L14-L17\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"dbadapter.Store")," embeds ",(0,o.kt)("inlineCode",{parentName:"p"},"dbm.DB"),", meaning most of the ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," interface functions are implemented. The other functions (mostly miscellaneous) are manually implemented. This store is primarily used within ",(0,o.kt)("a",{parentName:"p",href:"#transient-stores"},"Transient Stores")),(0,o.kt)("h3",{id:"transient-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"Transient")," Store"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Transient.Store")," is a base-layer ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," which is automatically discarded at the end of the block."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/transient/store.go#L16-L19\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Transient.Store")," is a ",(0,o.kt)("inlineCode",{parentName:"p"},"dbadapter.Store")," with a ",(0,o.kt)("inlineCode",{parentName:"p"},"dbm.NewMemDB()"),". All ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," methods are reused. When ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.Commit()")," is called, a new ",(0,o.kt)("inlineCode",{parentName:"p"},"dbadapter.Store")," is assigned, discarding previous reference and making it garbage collected."),(0,o.kt)("p",null,"This type of store is useful to persist information that is only relevant per-block. One example would be to store parameter changes (i.e. a bool set to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," if a parameter changed in a block)."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/x/params/types/subspace.go#L21-L31\n")),(0,o.kt)("p",null,"Transient stores are typically accessed via the ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/core/context"},(0,o.kt)("inlineCode",{parentName:"a"},"context"))," via the ",(0,o.kt)("inlineCode",{parentName:"p"},"TransientStore()")," method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/types/context.go#L264-L267\n")),(0,o.kt)("h2",{id:"kvstore-wrappers"},"KVStore Wrappers"),(0,o.kt)("h3",{id:"cachekvstore"},"CacheKVStore"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"cachekv.Store")," is a wrapper ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," which provides buffered writing / cached reading functionalities over the underlying ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/cachekv/store.go#L27-L35\n")),(0,o.kt)("p",null,"This is the type used whenever an IAVL Store needs to be branched to create an isolated store (typically when we need to mutate a state that might be reverted later)."),(0,o.kt)("h4",{id:"get"},(0,o.kt)("inlineCode",{parentName:"h4"},"Get")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Store.Get()")," firstly checks if ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.cache")," has an associated value with the key. If the value exists, the function returns it. If not, the function calls ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.parent.Get()"),", caches the result in ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.cache"),", and returns it."),(0,o.kt)("h4",{id:"set"},(0,o.kt)("inlineCode",{parentName:"h4"},"Set")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Store.Set()")," sets the key-value pair to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.cache"),". ",(0,o.kt)("inlineCode",{parentName:"p"},"cValue")," has the field dirty bool which indicates whether the cached value is different from the underlying value. When ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.Set()")," caches a new pair, the ",(0,o.kt)("inlineCode",{parentName:"p"},"cValue.dirty")," is set ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," so when ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.Write()")," is called it can be written to the underlying store."),(0,o.kt)("h4",{id:"iterator"},(0,o.kt)("inlineCode",{parentName:"h4"},"Iterator")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Store.Iterator()")," have to traverse on both cached items and the original items. In ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.iterator()"),", two iterators are generated for each of them, and merged. ",(0,o.kt)("inlineCode",{parentName:"p"},"memIterator")," is essentially a slice of the ",(0,o.kt)("inlineCode",{parentName:"p"},"KVPairs"),", used for cached items. ",(0,o.kt)("inlineCode",{parentName:"p"},"mergeIterator")," is a combination of two iterators, where traverse happens ordered on both iterators."),(0,o.kt)("h3",{id:"gaskv-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"GasKv")," Store"),(0,o.kt)("p",null,"Cosmos SDK applications use ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/basics/gas-fees"},(0,o.kt)("inlineCode",{parentName:"a"},"gas"))," to track resources usage and prevent spam. ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/gaskv/store.go"},(0,o.kt)("inlineCode",{parentName:"a"},"GasKv.Store"))," is a ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," wrapper that enables automatic gas consumption each time a read or write to the store is made. It is the solution of choice to track storage usage in Cosmos SDK applications."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/gaskv/store.go#L11-L17\n")),(0,o.kt)("p",null,"When methods of the parent ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," are called, ",(0,o.kt)("inlineCode",{parentName:"p"},"GasKv.Store")," automatically consumes appropriate amount of gas depending on the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.gasConfig"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/gas.go#L219-L228\n")),(0,o.kt)("p",null,"By default, all ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStores")," are wrapped in ",(0,o.kt)("inlineCode",{parentName:"p"},"GasKv.Stores")," when retrieved. This is done in the ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore()")," method of the ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/core/context"},(0,o.kt)("inlineCode",{parentName:"a"},"context")),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/types/context.go#L259-L262\n")),(0,o.kt)("p",null,"In this case, the default gas configuration is used:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/types/gas.go#L230-L241\n")),(0,o.kt)("h3",{id:"tracekv-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"TraceKv")," Store"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"tracekv.Store")," is a wrapper ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," which provides operation tracing functionalities over the underlying ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore"),". It is applied automatically by the Cosmos SDK on all ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," if tracing is enabled on the parent ",(0,o.kt)("inlineCode",{parentName:"p"},"MultiStore"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/tracekv/store.go#L20-L43\n")),(0,o.kt)("p",null,"When each ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," methods are called, ",(0,o.kt)("inlineCode",{parentName:"p"},"tracekv.Store")," automatically logs ",(0,o.kt)("inlineCode",{parentName:"p"},"traceOperation")," to the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.writer"),". ",(0,o.kt)("inlineCode",{parentName:"p"},"traceOperation.Metadata")," is filled with ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.context")," when it is not nil. ",(0,o.kt)("inlineCode",{parentName:"p"},"TraceContext")," is a ",(0,o.kt)("inlineCode",{parentName:"p"},"map[string]interface{}"),"."),(0,o.kt)("h3",{id:"prefix-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"Prefix")," Store"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"prefix.Store")," is a wrapper ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," which provides automatic key-prefixing functionalities over the underlying ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/prefix/store.go#L16-L22\n")),(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.{Get, Set}()")," is called, the store forwards the call to its parent, with the key prefixed with the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.prefix"),"."),(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.Iterator()")," is called, it does not simply prefix the ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.prefix"),", since it does not work as intended. In that case, some of the elements are traversed even they are not starting with the prefix."),(0,o.kt)("h3",{id:"listenkv-store"},(0,o.kt)("inlineCode",{parentName:"h3"},"ListenKv")," Store"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"listenkv.Store")," is a wrapper ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," which provides state listening capabilities over the underlying ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore"),".\nIt is applied automatically by the Cosmos SDK on any ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore")," whose ",(0,o.kt)("inlineCode",{parentName:"p"},"StoreKey")," is specified during state streaming configuration.\nAdditional information about state streaming configuration can be found in the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cosmos/cosmos-sdk/tree/v0.46.0/store/streaming"},"store/streaming/README.md"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go",metastring:"reference",reference:!0},"https://github.com/cosmos/cosmos-sdk/blob/v0.46.0/store/listenkv/store.go#L11-L18\n")),(0,o.kt)("p",null,"When ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore.Set")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"KVStore.Delete")," methods are called, ",(0,o.kt)("inlineCode",{parentName:"p"},"listenkv.Store")," automatically writes the operations to the set of ",(0,o.kt)("inlineCode",{parentName:"p"},"Store.listeners"),"."),(0,o.kt)("h2",{id:"new-store-package-storev2alpha1"},"New Store package (",(0,o.kt)("inlineCode",{parentName:"h2"},"store/v2alpha1"),")"),(0,o.kt)("p",null,"The SDK is in the process of transitioning to use the types listed here as the default interface for state storage. At the time of writing, these cannot be used within an application and are not directly compatible with the ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitMultiStore")," and related types."),(0,o.kt)("p",null,"These types use the new ",(0,o.kt)("inlineCode",{parentName:"p"},"db")," sub-module of Cosmos-SDK (",(0,o.kt)("inlineCode",{parentName:"p"},"github.com/cosmos/cosmos-sdk/db"),"), rather than ",(0,o.kt)("inlineCode",{parentName:"p"},"tmdb")," (",(0,o.kt)("inlineCode",{parentName:"p"},"github.com/tendermint/tm-db"),")."),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"/v0.47/architecture/adr-040-storage-and-smt-state-commitments"},"ADR-040")," for the motivations and design specifications of the change."),(0,o.kt)("h2",{id:"basickvstore-interface"},(0,o.kt)("inlineCode",{parentName:"h2"},"BasicKVStore")," interface"),(0,o.kt)("p",null,"An interface providing only the basic CRUD functionality (",(0,o.kt)("inlineCode",{parentName:"p"},"Get"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Set"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"Has"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"Delete")," methods), without iteration or caching. This is used to partially expose components of a larger store, such as a ",(0,o.kt)("inlineCode",{parentName:"p"},"root.Store"),"."),(0,o.kt)("h2",{id:"multistore-1"},"MultiStore"),(0,o.kt)("p",null,"This is the new interface (or, set of interfaces) for the main client store, replacing the role of ",(0,o.kt)("inlineCode",{parentName:"p"},"store/types.MultiStore")," (v1). There are a few significant differences in behavior compared with v1:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Commits are atomic and are performed on the entire store state; individual substores cannot be committed separately and cannot have different version numbers."),(0,o.kt)("li",{parentName:"ul"},"The store's current version and version history track that of the backing ",(0,o.kt)("inlineCode",{parentName:"li"},"db.Connection"),". Past versions are accessible read-only."),(0,o.kt)("li",{parentName:"ul"},"The set of valid substores is defined at initialization and cannot be updated dynamically in an existing store instance.")),(0,o.kt)("h3",{id:"commitmultistore-1"},(0,o.kt)("inlineCode",{parentName:"h3"},"CommitMultiStore")),(0,o.kt)("p",null,"This is the main interface for persisent application state, analogous to the original ",(0,o.kt)("inlineCode",{parentName:"p"},"CommitMultiStore"),"."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Past version views are accessed with ",(0,o.kt)("inlineCode",{parentName:"li"},"GetVersion"),", which returns a ",(0,o.kt)("inlineCode",{parentName:"li"},"BasicMultiStore"),"."),(0,o.kt)("li",{parentName:"ul"},"Substores are accessed with ",(0,o.kt)("inlineCode",{parentName:"li"},"GetKVStore"),". Trying to get a substore that was not defined at initialization will cause a panic."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Close")," must be called to release the DB resources being used by the store.")),(0,o.kt)("h3",{id:"basicmultistore"},(0,o.kt)("inlineCode",{parentName:"h3"},"BasicMultiStore")),(0,o.kt)("p",null,"A minimal interface that only allows accessing substores. Note: substores returned by ",(0,o.kt)("inlineCode",{parentName:"p"},"BasicMultiStore.GetKVStore")," are read-only and will panic on ",(0,o.kt)("inlineCode",{parentName:"p"},"Set")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"Delete")," calls."),(0,o.kt)("h3",{id:"implementation-rootstore"},"Implementation (",(0,o.kt)("inlineCode",{parentName:"h3"},"root.Store"),")"),(0,o.kt)("p",null,"The canonical implementation of ",(0,o.kt)("inlineCode",{parentName:"p"},"MultiStore")," is in ",(0,o.kt)("inlineCode",{parentName:"p"},"store/v2alpha1/root"),". It internally decouples the concerns of state storage and state commitment: values are stored in, and read directly from, the backing key-value database (state storage, or ",(0,o.kt)("em",{parentName:"p"},"SS"),"), but are also mapped in a logically separate database which generates cryptographic proofs (for state-commitment or ",(0,o.kt)("em",{parentName:"p"},"SC"),")."),(0,o.kt)("p",null,"The state-commitment component of each substore is implemented as an independent ",(0,o.kt)("inlineCode",{parentName:"p"},"smt.Store")," (see below). Internally, each substore is allocated in a logically separate partition within the same backing DB, such that commits apply to the state of all substores. Therefore, views of past versions also include the state of all substores (including ",(0,o.kt)("em",{parentName:"p"},"SS")," and ",(0,o.kt)("em",{parentName:"p"},"SC")," data)."),(0,o.kt)("p",null,"This store can optionally be configured to use a different backend database instance for ",(0,o.kt)("em",{parentName:"p"},"SC")," (e.g., ",(0,o.kt)("inlineCode",{parentName:"p"},"badgerdb")," for the state storage DB and ",(0,o.kt)("inlineCode",{parentName:"p"},"memdb")," for the state-commitment DB; see ",(0,o.kt)("inlineCode",{parentName:"p"},"StoreConfig.StateCommitmentDB"),")."),(0,o.kt)("h2",{id:"smt-store"},"SMT Store"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"store/v2alpha1/smt.Store")," maps values into a Sparse Merkle Tree (SMT), and supports a ",(0,o.kt)("inlineCode",{parentName:"p"},"BasicKVStore")," interface as well as methods for cryptographic proof generation."))}d.isMDXComponent=!0}}]);