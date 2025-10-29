import Token from "./ABI/ERC20Token.json";
import AEP from "./ABI/AEP.json";
import Market from "./ABI/Market.json";
import AEPWithdraw from "./ABI/AEPWithdraw.json";
import { defineChain } from "@reown/appkit/networks";
// 正式
export const isMain = true;
export const isAllOpen = true;
export const curentBSCChainId: number = isMain ? 56 : 97;
export const curentETHChainId: number = isMain ? 1 : 17000;
export const mathRandom = (
  Math.random() * (0.00013 - 0.00009) +
  0.00009
).toFixed(8);

export const LOCAL_KEY = "ORA_LANG";
export let baseUrl: string = isMain ? window.location.origin + "/user/" : "";

export let ContractUrl: string = isMain
  ? "https://bscscan.com/address/"
  : "https://testnet.bscscan.com/address/";
export let BlockUrl: string = isMain
  ? "https://bscscan.com/tx/"
  : "https://testnet.bscscan.com/tx/";
export const GoTo = "https://node.pijswap.com/";
// Documentation
export const Documentation = "https://pijswap.gitbook.io/pijswap";
// InviteRebateKOLApplication
export const InviteRebateKOLApplication = "https://pijswap.gitbook.io/pijswap";
// TermsofService
export const TermsofService =
  "https://pijswap.gitbook.io/pijswap/terms-of-service";
// TokenEconomicModel
export const TokenEconomicModel =
  "https://pijswap.gitbook.io/pijswap/token-economic-model";
//@ts-ignore
export const customNetwork_BSC = defineChain({
  id: 56,
  caipNetworkId: "eip155:56",
  chainNamespace: "eip155",
  name: "BSC",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-dataseed.binance.org"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://bscscan.com",
    },
  },
});

export const customNetwork_BSC_TEST = defineChain({
  id: 97,
  caipNetworkId: "eip155:97",
  chainNamespace: "eip155",
  name: "BNB Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: {
      http: ["https://bsc-testnet-rpc.publicnode.com"],
      webSocket: ["WS_RPC_URL"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://data-seed-prebsc-2-s1.bnbchain.org:8545",
    },
  },
});

export const defaultNetwork: any = {
  chainId: 656898,
  name: "UNI",
  currency: "UAC",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "http://chain.uniagent.co/",
};
export const loginNetworkId = [
  { id: isMain ? 56 : 97, name: "BSC" },
  { id: isMain ? 1 : 17000, name: "Ethereum" },
];

interface abiObjType {
  [propName: string]: any;
}

interface contractAddressType {
  [propName: string]: string;
}

export const abiObj: abiObjType = {
  USDT: Token,
  AEP: AEP,
  Market: Market,
  AEPWithdraw: AEPWithdraw,
};

export const Main: contractAddressType = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  AEP: "0xA1961aeB27aa4c41Cd13d578F3a3a776F15E3178",
  Market: "0x4DbBAf563e7460E908FdC67ec9667229314fb4F2",
  AEPWithdraw: "0xe1c79f0E5f1491722Ae18ba78b676A733C34995f",
};

const Test = {
  USDT: "0x38CF198E94ccc9561488869EF38fDd91D7FF62d7",
  AEP: "0x7809Cf4eB8F0f609E61D454589ef55354205220a",
  Market: "0xa09FAA8f9df61492b784324c3fdAA88f60FA5Cfc",
  AEPWithdraw: "0xf06Db5aebb1D23979372957ab7CD6C73a29C6349",
};
export const contractAddress: contractAddressType = isMain ? Main : Test;
