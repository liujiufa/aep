import React, { useEffect, useState } from "react";
import HeaderBox from "../../components/HeaderBox";
import { Carousel, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
} from "@reown/appkit/react";
import { Contracts } from "../../web3";
import Web3 from "web3";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../../utils/tool";
import { useDispatch, useSelector } from "react-redux";
import { aepSwapInfo, getUserInfo } from "../../API";
import { contractAddress } from "../../config";
import { createLoginSuccessAction } from "../../store/actions";
import { useSign } from "../../hooks/useSign";
import { useTranslation } from "react-i18next";

import PageLoding from "../../components/PageLoding";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { useNoGas } from "../../hooks/useNoGas";
import FooterBox from "../../components/FooterBox";
import "./index.scss";
import home_stake from "../../assets/image/Home/home_stake.png";
import title_logo from "../../assets/image/title_logo.png";
import SAEP from "../../assets/image/SAEP.png";
import USDT from "../../assets/image/USDT.png";
import go_to from "../../assets/image/Home/go_to.svg";
import info from "../../assets/image/Home/info.svg";
import LinkChart from "../../components/linkChart";
import banner from "../../assets/image/Invite/banner.png";
import ec_code from "../../assets/image/Invite/ec_code.png";
import NoData from "../../components/NoData";
import Chart from "./components/Chart";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [AllData, setAllData] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  
  const getInitDate = () => {
    aepSwapInfo({}).then((res: any) => {
      setAllData(res?.data || {});
    });
  };

  useEffect(() => {}, [web3ModalAccount]);
  useEffect(() => {
    getInitDate();
  }, []);
  useEffect(() => {
    setAllData({});
  }, [isConnected]);

  return (
    <div className="swap all_page_conttainer">
      <HeaderBox></HeaderBox>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="star3"
      >
        <path
          d="M8 0L8.48335 3.27248C8.80766 5.46818 10.5318 7.19234 12.7275 7.51665L16 8L12.7275 8.48335C10.5318 8.80766 8.80766 10.5318 8.48335 12.7275L8 16L7.51665 12.7275C7.19234 10.5318 5.46818 8.80766 3.27247 8.48335L0 8L3.27248 7.51665C5.46818 7.19234 7.19234 5.46818 7.51665 3.27247L8 0Z"
          fill="black"
          fill-opacity="0.31"
        />
      </svg>
      <div className="swap_content">
        <div className="swap_title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="star1"
          >
            <path
              d="M7 0L7.35466 2.40117C7.67897 4.59687 9.40313 6.32103 11.5988 6.64534L14 7L11.5988 7.35466C9.40313 7.67897 7.67897 9.40313 7.35466 11.5988L7 14L6.64534 11.5988C6.32103 9.40313 4.59687 7.67897 2.40117 7.35466L0 7L2.40117 6.64534C4.59687 6.32103 6.32103 4.59687 6.64534 2.40117L7 0Z"
              fill="black"
              fill-opacity="0.31"
            />
          </svg>
          <div className="swap_title1">
            <img src={title_logo} alt="" />
            <div>{t("116")}</div>
            <img src={title_logo} alt="" />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="star2"
          >
            <path
              d="M5 0L5.09727 0.658553C5.42158 2.85426 7.14574 4.57842 9.34144 4.90273L10 5L9.34144 5.09727C7.14574 5.42158 5.42158 7.14574 5.09727 9.34144L5 10L4.90273 9.34144C4.57842 7.14574 2.85426 5.42158 0.658553 5.09727L0 5L0.658553 4.90273C2.85426 4.57842 4.57842 2.85426 4.90273 0.658554L5 0Z"
              fill="black"
              fill-opacity="0.31"
            />
          </svg>
        </div>

        <div className="chart">
          <Chart></Chart>
        </div>

        <div className=" market_box">
          <div className="title">{t("128")}</div>
          <div className="devider"></div>
          <div className="items">
            <div className="item">
              {t("128")}-USDT
              <div className="item_bottom">
                <img src={USDT} alt="" />
                {AllData?.tradePoolUSDT ?? 0}
              </div>
            </div>
            <div className="item_devider"></div>
            <div className="item">
              {t("128")}-AEP
              <div className="item_bottom">
                <img src={SAEP} alt="" />
                {AllData?.tradePoolAEP ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBox></FooterBox>
    </div>
  );
};

export default Home;
