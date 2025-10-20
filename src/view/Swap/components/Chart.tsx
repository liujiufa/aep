import React, { useEffect, useState } from "react";
import "./Chart.scss";
import TVChartContainer from "./TVChartContainer";
// import { change24 } from "../../../API/index";
import { NumSplic1, convert1, getFullNum } from "../../../utils/tool";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { aepChange24 } from "../../../API";
const Chart = () => {
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [Change24, setChange24] = useState<any>({});

  useEffect(() => {
    aepChange24({}).then((res: any) => {
      setChange24(res?.data || {});
    });
  }, []);
  return (
    <div className="chart_container">
      <div className="swap_enter">
        <div className="swap_coin">AEP/USDT</div>
        <div
          className="btn"
          onClick={() => {
            Navigate("/View/exchange");
          }}
        >
          {t("116")}
        </div>
      </div>
      <div className="data_info">
        <div className="item">
          24h Change
          <div style={{ color: Change24?.change > 0 ? "#00D558" : "#f45b5b" }}>
            {!!Change24?.change
              ? NumSplic1(getFullNum(Change24?.change * 100), 2) + "%"
              : "-%"}
          </div>
        </div>
        <div className="item">
          24h Vol
          <div>
            {!!Change24?.vol
              ? convert1(NumSplic1(getFullNum(Change24?.vol ?? 0), 0))
              : "-"}
          </div>
        </div>
        <div className="item">
          24h High
          <div>
            {!!Change24?.high ? NumSplic1(getFullNum(Change24?.high), 6) : "-"}
          </div>
        </div>
        <div className="item">
          24h Low
          <div>
            {!!Change24?.low
              ? NumSplic1(getFullNum(Change24?.low ?? 0), 6)
              : "-"}
          </div>
        </div>
      </div>
      <TVChartContainer
        coins={{ tokenNameIn: "AEP", tokenNameOut: "USDT" }}
      ></TVChartContainer>
    </div>
  );
};

export default Chart;
