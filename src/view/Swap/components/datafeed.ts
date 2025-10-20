import { aepKline } from "../../../API";
import {
  OnReadyCallback,
  LibrarySymbolInfo,
  ResolutionString,
  PeriodParams,
  HistoryCallback,
  Bar,
  SubscribeBarsCallback,
} from "./charting_library/charting_library";
// import { lotteryLatelyWinning } from "../../API/raffle";
// import { webSocketUrl } from "../../config";
// import { kline } from "../../API/exchange";

declare let window: any;

// 將tradingview的resolution轉成api的resolution, 1c是跨日
const formatResolution = (resolution: ResolutionString) => {
  switch (resolution) {
    case "1":
    case "5":
    // case "10":
    case "15":
    // case "30":
    case "60":
    case "240":
      return Number(resolution) * 60 * 1000;
    case "1D":
      return 24 * 60 * 60 * 1000;
    // case "1W":
    //   return 7 * 24 * 60 * 60;
    // case "1M":
    //   return 30 * 7 * 24 * 60 * 60;
    default:
      return resolution;
    // return /[0-9]+[DWM]/.test(resolution)
    //   ? String(resolution).replace(/[0-9]/g, "")
    //   : resolution;
  }
};

const DataFeed = {
  onReady: (callback: OnReadyCallback) => {
    console.log("[onReady]: Method call");
    const config: any = {
      supports_search: false,
      supports_group_request: false,
      supports_marks: false,
      supported_resolutions: ["1", "15", "240", "1D"],
      symbols_types: [{ name: "crypto", value: "crypto" }],
    };
    callback(config);
  },
  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (info: LibrarySymbolInfo) => void,
    onResolveErrorCallback: any
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const [market, code] = symbolName.split("/");
    const name = `${market}:${code}`;

    const symbolInfo = {
      description: symbolName,
      name: symbolName,
      session: "24x7",
      timezone: "Asia/Shanghai",
      type: "crypto",
      has_intraday: true,
      has_daily: true,
      exchange: "",
      minmov: 1,
      minmove2: 0,
      fractional: false,
      pricescale: 100000000,
      format: "price",
      supported_resolutions: ["1", "15", "240", "D"],
    } as LibrarySymbolInfo;

    setTimeout(() => {
      if (!!symbolName) {
        onSymbolResolvedCallback(symbolInfo);
      } else {
        onResolveErrorCallback("unknown_symbol");
      }
    }, 50);
  },

  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: ErrorCallback
  ) => {
    // tradingview會設定每個尺度(resolution)下要有幾個bars,如果沒有滿足數量可能會造成一直call getBars的無窮迴圈
    setTimeout(async () => {
      const symbol = symbolInfo.name;
      const { from, to } = periodParams;

      if (!!symbol) {
        try {
          const { data, code }: any = await aepKline({
            endTime: to * 1000,
            intervalTime: formatResolution(resolution),
            startTime: from * 1000,
          });

          if (code !== 200 || data?.length === 0) {
            onHistoryCallback([], { noData: true });
            return;
          }

          const bars = data.map((item: any) => {
            return {
              time: item?.time,
              low: item?.low,
              high: item?.high,
              open: item?.open,
              close: item?.close,
              volume: item?.volume,
            };
          });

          window.bars = bars;
          onHistoryCallback(bars as Bar[], { noData: false });
        } catch (error) {
          console.log(error);
        }
      }
    }, 50);
  },

  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: Function
  ) => {
    // console.log("[subscribeBars]: Method call with subscriberUID:");
    // var socket: any;
    // var chartInterval: any;
    // var socketData: any = {};
    // //判断当前浏览器是否支持websocket
    // if (window.WebSocket) {
    //   //go on
    //   socket = new WebSocket(webSocketUrl);
    //   //相当于channelReado, ev 收到服务器端回送的消息
    //   socket.onmessage = (ev: any, onTick: any) => {
    //     socketData = { ...JSON.parse(ev.data) };
    //     // debugger;
    //     //@ts-nocheck
    //     let { time, open, low, high, close } =
    //       window.bars[window.bars?.length - 1];
    //     console.log(
    //       window.bars[window.bars?.length - 1],
    //       "----------last---------",
    //       socketData?.data?.swapKLineResp,
    //       "-----------new---------",
    //       Number(formatResolution(resolution)) * 60 * 1000
    //     );
    //     let reallyBar: any = {};
    //     if (
    //       Number(socketData?.data?.swapKLineResp?.openTime) * 1000 - time >=
    //       Number(formatResolution(resolution)) * 60 * 1000
    //     ) {
    //       reallyBar.time =
    //         Number(time) + Number(formatResolution(resolution)) * 60 * 1000;
    //       reallyBar.open = close;
    //       reallyBar.low =
    //         Number(close) < Number(socketData?.data?.swapKLineResp?.low)
    //           ? close
    //           : Number(socketData?.data?.swapKLineResp?.low);
    //       reallyBar.high =
    //         Number(close) > Number(socketData?.data?.swapKLineResp?.high)
    //           ? close
    //           : Number(socketData?.data?.swapKLineResp?.high);
    //       reallyBar.close = socketData?.data?.swapKLineResp?.close;
    //     } else {
    //       reallyBar.time = time;
    //       reallyBar.open = open;
    //       reallyBar.close = socketData?.data?.swapKLineResp?.close;
    //       reallyBar.low =
    //         Number(low) < Number(socketData?.data?.swapKLineResp?.low)
    //           ? Number(low)
    //           : Number(socketData?.data?.swapKLineResp?.low);
    //       reallyBar.high =
    //         Number(high) > Number(socketData?.data?.swapKLineResp?.high)
    //           ? Number(high)
    //           : Number(socketData?.data?.swapKLineResp?.high);
    //     }
    //     console.log(reallyBar, "reallyBar");
    //     window.bars = [reallyBar];
    //     onTick(reallyBar);
    //     // onTick({
    //     //   close: 2.108454110269884,
    //     //   high: 2.0023845411026984,
    //     //   low: 2.0023845411026984,
    //     //   open: 2.0023845411026984,
    //     //   time: 1734955778000,
    //     // });
    //   };
    //   //相当于连接开启(感知到连接开启)
    //   socket.onopen = function (ev: any) {
    //     console.log("WebSocket opened: " + ev);
    //   };
    //   //相当于连接关闭(感知到连接关闭)
    //   socket.onclose = function (ev: any) {
    //     console.log("WebSocket closed: " + ev);
    //   };
    //   socket.onerror = function (ev: any) {
    //     console.info(ev);
    //     console.log("WebSocket error：" + ev);
    //   };
    // } else {
    //   alert("当前浏览器不支持websocket");
    // }
    // //发送消息到服务器
    // function send(message: any) {
    //   if (socket.readyState == WebSocket.OPEN) {
    //     //通过socket 发送消息
    //     socket.send(message);
    //   } else {
    //     alert("连接没有开启");
    //   }
    // }
    // chartInterval = setTimeout(() => {
    //   if (!!symbolInfo?.base_name && window?.bars?.length > 0) {
    //     send(
    //       JSON.stringify({
    //         lastBar: window?.bars[window?.bars?.length - 1],
    //         operate: 4,
    //         intervalTime: formatResolution(resolution),
    //         swapTokenName1: symbolInfo?.base_name[0]?.split("/")[0],
    //         swapTokenName2: symbolInfo?.base_name[0]?.split("/")[1],
    //       })
    //     );
    //   }
    // }, 1000);
    // setInterval(() => {
    //   onTick(
    //     {
    //       time: Number(socketData?.data?.swapKLineResp?.openTime) * 1000,
    //       low: socketData?.data?.swapKLineResp?.low,
    //       high: socketData?.data?.swapKLineResp?.high,
    //       open: socketData?.data?.swapKLineResp?.open,
    //       close: socketData?.data?.swapKLineResp?.close,
    //     }
    //     // { time: 1734690879758, open: 10, high: 14, low: 9, close: 14 }
    //   );
    // }, 2000);
    // console.log(onTick, "onTick");
    // let { time, open, low, high, close } = window.bars[window.bars?.length - 1];
    // console.log(window.bars[window.bars?.length - 1], "subscribeBars");
    // debugger;
    // onTick(window.bars[window.bars?.length - 1]);
  },
  unsubscribeBars: () => {
    console.log("[unsubscribeBars]: Method call with subscriberUID:");
  },
  searchSymbols: async (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any
  ) => {
    console.log("[searchSymbols]: Method call");
    // const symbols = await getMatchingSymbolsFromBackend(
    //   userInput,
    //   exchange,
    //   symbolType
    // );
    // const newSymbols: any = [
    //   {
    //     symbol: "DEMAIN_BTIA",
    //     description: "DEMAIN_BTIA/USDA",
    //     exchange: "USDA",
    //     ticker: "DEMAIN_BTIA:USDA",
    //     type: "crypto", // "futures"/"crypto"/"forex"/"index"
    //   },
    // ];
    onResultReadyCallback([]);
  },
};

export default DataFeed;
