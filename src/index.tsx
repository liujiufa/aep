//@ts-ignore
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "swiper/css";
import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import store from "./store";
import Web3 from "web3";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChainId, Contracts } from "./web3";
import "antd/dist/reset.css";
import "animate.css";
// import { customNetwork_BSC, mainnet } from "./config";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
//@ts-ignore
import { bscTestnet, bsc, mainnet, holesky } from "@reown/appkit/networks";
import {
  customNetwork_BSC,
  customNetwork_BSC_TEST,
  defaultNetwork,
  isMain,
} from "./config";
import ViewportProvider from "./components/viewportContext";
function getLibrary(provider: any): Web3 {
  const library = new Web3(provider);
  new Contracts(provider);
  return library;
}

// 1. Get projectId
const projectId = "186f339155f56029e009e98e4579e480";
// const projectId = 'YOUR_PROJECT_ID'

// 2. Set chains

// 3. Create a metadata object
const metadata = {
  name: "Depin",
  description: "Depin",
  url: "https://nexusrwa.io/",
  // url: "https://kf-panda.com/",
  icons: ["https://nexusrwa.io/favicon.ico"],
  // icons: ["http://yhhyn.com/vtb.png"],
};

// 4. Create Ethers config
// const ethersConfig = defaultConfig({
//   /*Required*/
//   metadata,

//   /*Optional*/
//   enableEIP6963: true, // true by default
//   enableInjected: true, // true by default
//   enableCoinbase: false, // true by default
//   rpcUrl: "...", // used for the Coinbase SDK
//   defaultChainId: 1, // used for the Coinbase SDK
// });

// 5. Create a Web3Modal instance
// createWeb3Modal({
//   allWallets: "SHOW",
//   ethersConfig,
//   chains: [mainnet[ChainId?.BSC]],
//   projectId,
//   enableAnalytics: true, // Optional - defaults to your Cloud configuration
//   themeMode: "dark",
//   featuredWalletIds: [
//     "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
//     "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
//     "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
//     "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",
//   ],
// });

createAppKit({
  adapters: [new EthersAdapter()],
  networks: isMain ? [customNetwork_BSC] : [customNetwork_BSC_TEST],
  metadata,
  projectId,
  themeMode: "light",
  enableCoinbase: false,
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
    "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",
  ],
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    connectMethodsOrder: ["wallet"],
  },
  defaultNetwork: isMain ? customNetwork_BSC : bscTestnet,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* @ts-ignore  */}
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
