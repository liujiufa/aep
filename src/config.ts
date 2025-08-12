import Token from "./ABI/ERC20Token.json";
import Bind from "./ABI/Bind.json";
import PrizePool from "./ABI/PrizePool.json";
import Pledge from "./ABI/YieldAggregator.json";
import PrivateSaleToken from "./ABI/PrivateSaleToken.json";
import ORA_NFT from "./ABI/ORA_NFT.json";
import RechargeCredits from "./ABI/RechargeCredits.json";
import NFTTrade from "./ABI/ExchangeNFT.json";
import { defineChain } from "@reown/appkit/networks";
// 正式
export const isMain = true;
export const isAllOpen = true;
export const curentBSCChainId: number = isMain ? 56 : 97;
export const curentETHChainId: number = isMain ? 1 : 17000;

export const LOCAL_KEY = "ORA_LANG";
export let baseUrl: string = isMain
  ? "https://oraai.io/api/"
  : // window.location.origin + "/api/"
    window.location.origin + "/api/";

export let ContractUrl: string = isMain
  ? "https://bscscan.com/address/"
  : "https://testnet.bscscan.com/address/";
export let BlockUrl: string = isMain
  ? "https://bscscan.com/tx/"
  : "https://testnet.bscscan.com/tx/";
export const BitNumber = 8;
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
  Bind: Bind,
  PrizePool: PrizePool,
  Pledge: Pledge,
  PrivateSale: PrivateSaleToken,
  NFT: ORA_NFT,
  NFTTrade: NFTTrade,
  ORATopUp: RechargeCredits,
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
  USDT: "0x2b11640f31b84dc727841FE6B5a905D366A00e78",
  ORA: "0x9c5fE08A64047d70887a85495AFdd9a4Bd86B36E",
  Bind: "0x9CeC777eDfE8381175B5287C64EC0FebB0bA5272",
  PrizePool_BSC: "0x93f980aE092D96A0c66838AC31284dDB89770b96",
  PrizePool_ETH: "0x8D94DAEffFe34Ab5427A69B058260A97423BD2e1",
  // 机关枪池合约
  Pledge: "0xdD351fE20A9eAA8AF27e3605246b451E6B989B23",
  PrivateSale_BSC: "0x6B6f8685aD6277c69fFC3a8d6ab11253CCaf8Cd5",
  PrivateSale_ETH: "0x71B0b6b67766848E9624cf20537df8bE6D28F573",
  PrivateSale_ReferReward_BSC: "0xDe06D31e5fA06dd68dA42Bca3f7A28468a6386E8",
  PrivateSale_ReferReward_ETH: "0xB1a5FD37eDb9063A4eD96b2633FaF27F32254680",
  NFT: "0x1EeE94fdEEf7621d6D2cC603EDE369f2d5E40038",
  NFTTrade: "0xbabea77fF1F51c2537C1c455d21730fE1c0E8022",
  ORATopUp: "0xECA5D5029A24fa1524D3678dBAA8B69EEe5E6FEA",
  NFTHoldDevide: "0x7c057423dD32D2F6380F9a66FFc63f88621a7f39",
};
export const contractAddress: contractAddressType = isMain ? Main : Test;
