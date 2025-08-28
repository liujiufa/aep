import Token from "./ABI/ERC20Token.json";
import T_SToken from "./ABI/T_SToken.json";
import T_RToken from "./ABI/T_RToken.json";
import Stake from "./ABI/Stake.json";
import Box from "./ABI/Box.json";
import RewardDistribute from "./ABI/RewardDistribute.json";
import { defineChain } from "@reown/appkit/networks";
// 正式
export const isMain = false;
export const isAllOpen = true;
export const curentBSCChainId: number = isMain ? 56 : 97;
export const curentETHChainId: number = isMain ? 1 : 17000;

export const LOCAL_KEY = "ORA_LANG";
export let baseUrl: string = isMain ? "" : "http://52.74.247.74:28885/";

// "https://test.datadao.top/api/";

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
  name: "BSC",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
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
  T_SToken: T_SToken,
  Stake: Stake,
  RewardDistribute: RewardDistribute,
  T_RToken: T_RToken,
  Box: Box,
};

export const Main: contractAddressType = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  ORA: "0x87b756A58a29B9D320C9987E88B4410C9c01633c",
  Bind: "0x8B6eE2F23253cDD4E49369bAac6d460c91FD7d77",
  PrizePool_BSC: "0xfc2409fE62aE3CD2B6b4384851f764280752779A",
  PrizePool_ETH: "0x6395286a3ee2872a8d862BeCC6048eF05D20876F",
  // 机关枪池合约
  Pledge: "0xf51d85065F0dcdFAa349EB1b9fb108408d2375c8",
  PrivateSale_BSC: "0xF337892C964F9e56d9A4b59Ad275D3b6856Cf876",
  PrivateSale_ETH: "0xb51a9C8572710fDB489f298EdbF826Ed72b73b79",
  PrivateSale_ReferReward_BSC: "0xFe741adA6E8f938c92e7513b6391B821A2F05D6b",
  PrivateSale_ReferReward_ETH: "0xE712048A1D2611CCAb78CEAaD0917d2cA5723a63",
  NFT: "0x504D967e8C0CDe03CaD99C0a1Df39cDacad2F434",
  NFTTrade: "0x50bA157ceab71B7F0F3d452E203E8b449F87b4d0",
  ORATopUp: "0x03A21d65c9A798Dfe4f7cb255Bf2AA86c3eA50c9",
  NFTHoldDevide: "0xA5927A7025DD1317a1c724953193eB9B1f3342Bb",
};

const Test = {
  USDT: "0x38CF198E94ccc9561488869EF38fDd91D7FF62d7",
  T_SToken: "0x4c1C698A48A1645B1b96db1A2D5F7BE456Ee1207",
  Stake: "0xB23539367274eA1e18e4c2a4aa3bb7B07EB33281",
  RewardDistribute: "0xb78afc88427e3a4128F4AD919FF00687490b12Ff",
  T_RToken: "0x2AC82AD9a1302af804d43C4d9286f92a415A9421",
  Box: "0xb9061E78BD246B8f7e1a43d5c686Bea366801Cd8",
};
export const contractAddress: contractAddressType = isMain ? Main : Test;
