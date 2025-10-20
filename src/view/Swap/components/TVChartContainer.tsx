import { useEffect, useRef } from "react";
import {
  widget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
} from "./charting_library";
import DataFeed from "./datafeed";
import * as React from "react";
export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions["symbol"];
  interval: ChartingLibraryWidgetOptions["interval"];

  // BEWARE: no trailing slash is expected in feed URL
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions["library_path"];
  chartsStorageUrl: ChartingLibraryWidgetOptions["charts_storage_url"];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions["charts_storage_api_version"];
  clientId: ChartingLibraryWidgetOptions["client_id"];
  userId: ChartingLibraryWidgetOptions["user_id"];
  fullscreen: ChartingLibraryWidgetOptions["fullscreen"];
  autosize: ChartingLibraryWidgetOptions["autosize"];
  studiesOverrides: ChartingLibraryWidgetOptions["studies_overrides"];
  container: ChartingLibraryWidgetOptions["container"];
  timezone: any;
  numeric_formatting: any;
}

const getLanguageFromURL = (): LanguageCode | null => {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window?.location?.search);
  return results === null
    ? null
    : (decodeURIComponent(results[1].replace(/\+/g, " ")) as LanguageCode);
};

const TVChartContainer = React.memo(
  (props: any) => {
    const chartContainerRef =
      useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

    const defaultProps: Omit<ChartContainerProps, "container"> = {
      symbol: `${props?.coins?.tokenNameIn}/${props?.coins?.tokenNameOut}`,
      interval: "1" as ResolutionString,
      datafeedUrl: "",
      libraryPath: "/charting_library/",
      chartsStorageUrl: "https://saveload.tradingview.com",
      chartsStorageApiVersion: "1.1",
      clientId: "tradingview.com",
      userId: "public_user_id",
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
      timezone: "Asia/Shanghai",
      numeric_formatting: { decimal_sign: "." },
    };

    useEffect(() => {
      const widgetOptions: any = {
        numeric_formatting: defaultProps.numeric_formatting,
        symbol: defaultProps.symbol as string,
        // BEWARE: no trailing slash is expected in feed URL
        // tslint:disable-next-line:no-any
        datafeed: DataFeed,
        interval: "15",
        container: chartContainerRef.current,
        library_path: defaultProps.libraryPath as string,

        locale: getLanguageFromURL() || "en",
        disabled_features: [
          "use_localstorage_for_settings",
          "header_symbol_search",
          "header_quick_search",
        ],
        enabled_features: [
          "study_templates",
          "hide_left_toolbar_by_default",
          "scales_date_format",
        ],
        load_last_chart: false,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        // charts_storage_url: defaultProps.chartsStorageUrl,
        // client_id: defaultProps.clientId,
        // user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: true,
        studies_overrides: defaultProps.studiesOverrides,
        theme: "dark",
        overrides: {
          "paneProperties.backgroundColor": "#242424",
          "paneProperties.backgroundGradientStartColor": "#242424",
          "paneProperties.backgroundGradientEndColor": "#242424",
          "paneProperties.horzGridProperties.style": "1",
          "paneProperties.vertGridProperties.style": "1",
          "paneProperties.gridLinesMode": "both",
          "scalesProperties.fontSize": 8,
        },
        toolbar_bg: "#242424",
        loading_screen: {
          backgroundColor: "#242424",
        },
        timezone: defaultProps.timezone,
        custom_formatters: {
          // priceFormatterFactory: (symbolInfo: any, minTick: any) => {
          //   debugger;
          //   if (
          //     symbolInfo?.fractional ||
          //     (minTick !== "default" && minTick.split(",")[2] === "true")
          //   ) {
          //     return {
          //       format: (price: any, signPositive: any) => {
          //         // return the appropriate format
          //       },
          //     };
          //   }
          //   return null; // this is to use default formatter;
          // },
        },
      };
      const tvWidget = new widget(widgetOptions);
      tvWidget.onChartReady(async () => {
        tvWidget.setCSSCustomProperty("--tv-color-pane-background", "#242424");
      });

      return () => {
        tvWidget.remove();
      };
    });
    return <div ref={chartContainerRef} className={"TVChartContainer"} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.coins.tokenNameIn === nextProps.coins.tokenNameIn &&
      prevProps.coins.tokenNameOut === nextProps.coins.tokenNameOut
    );
  }
);

export default TVChartContainer;
