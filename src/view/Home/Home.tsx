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
import { getEarnData, getUserInfo } from "../../API";
import { contractAddress } from "../../config";
import { createLoginSuccessAction } from "../../store/actions";
import { useSign } from "../../hooks/useSign";
import { useTranslation } from "react-i18next";

import PageLoding from "../../components/PageLoding";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { useNoGas } from "../../hooks/useNoGas";
import FooterBox from "../../components/FooterBox";
import "./Home.scss";
import home_stake from "../../assets/image/Home/home_stake.png";
import coin_logo from "../../assets/image/coin_logo.png";
import go_to from "../../assets/image/Home/go_to.svg";
import info from "../../assets/image/Home/info.svg";
import LinkChart from "../../components/linkChart";
import SetUsername from "./components/SetUsername";
import copy from "copy-to-clipboard";
//@ts-ignore
import ThreeSixty from "react-360-view";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [UsernameState, setUsernameState] = useState(false);
  const [UserInfo, setUserInfo] = useState<any>({});
  const [AllData, setAllData] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  const getInitDate = () => {
    getUserInfo().then((res: any) => {
      setUserInfo(res?.data || {});
    });
    getEarnData().then((res: any) => {
      setAllData(res?.data || {});
    });
  };

  useEffect(() => {}, [web3ModalAccount]);
  useEffect(() => {
    if (!!token) {
      getInitDate();
    } else {
    }
  }, [token]);
  useEffect(() => {
    setUserInfo({});
    setAllData({});
  }, [isConnected]);

  return (
    <div className="ai all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="ai_content">
        <div className="net_work_box">
          <div className="ip">
            {t("IP Address")}{" "}
            <div> {UserInfo?.ipAddress ?? "--.--.--.---"}</div>
          </div>
          <div className="net_quilty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
            >
              <path
                d="M18.75 24.25C18.75 23.2554 18.3549 22.3016 17.6517 21.5984C16.9484 20.8951 15.9946 20.5 15 20.5C14.0054 20.5 13.0516 20.8951 12.3483 21.5984C11.6451 22.3016 11.25 23.2554 11.25 24.25C11.25 25.2446 11.6451 26.1984 12.3483 26.9017C13.0516 27.6049 14.0054 28 15 28C15.9946 28 16.9484 27.6049 17.6517 26.9017C18.3549 26.1984 18.75 25.2446 18.75 24.25ZM13.75 24.25C13.75 23.9185 13.8817 23.6005 14.1161 23.3661C14.3505 23.1317 14.6685 23 15 23C15.3315 23 15.6495 23.1317 15.8839 23.3661C16.1183 23.6005 16.25 23.9185 16.25 24.25C16.25 24.5815 16.1183 24.8995 15.8839 25.1339C15.6495 25.3683 15.3315 25.5 15 25.5C14.6685 25.5 14.3505 25.3683 14.1161 25.1339C13.8817 24.8995 13.75 24.5815 13.75 24.25ZM29.3775 8.46251C29.5907 8.71662 29.6942 9.04501 29.6652 9.37542C29.6363 9.70584 29.4772 10.0112 29.2231 10.2244C29.0973 10.3299 28.9519 10.4097 28.7953 10.459C28.6386 10.5084 28.4738 10.5264 28.3102 10.5121C27.9798 10.4831 27.6744 10.3241 27.4613 10.07C25.9379 8.24569 24.0319 6.77868 21.8785 5.77292C19.725 4.76716 17.3767 4.24724 15 4.25001C10.1475 4.25001 5.645 6.38751 2.575 10.0263C2.36117 10.2799 2.05535 10.4382 1.72482 10.4663C1.39428 10.4944 1.06611 10.3901 0.8125 10.1763C0.558887 9.96243 0.400605 9.65661 0.372474 9.32608C0.344344 8.99555 0.448669 8.66738 0.6625 8.41376C2.42101 6.32376 4.61582 4.64415 7.09274 3.49294C9.56966 2.34172 12.2686 1.74681 15 1.75001C20.62 1.75001 25.8375 4.23876 29.3775 8.46251ZM24.7075 12.5388C24.9124 12.7936 25.0092 13.1186 24.9772 13.4441C24.9452 13.7695 24.787 14.0694 24.5365 14.2796C24.286 14.4897 23.9631 14.5933 23.637 14.5681C23.311 14.543 23.0078 14.3911 22.7925 14.145C21.8384 13.0023 20.6446 12.0835 19.2958 11.4536C17.947 10.8237 16.4761 10.4981 14.9875 10.5C13.5048 10.498 12.0397 10.8208 10.6951 11.4458C9.35056 12.0707 8.15926 12.9827 7.205 14.1175C6.98932 14.3645 6.68522 14.5168 6.35826 14.5417C6.0313 14.5666 5.70766 14.462 5.45711 14.2504C5.20655 14.0389 5.04915 13.7374 5.01883 13.4109C4.9885 13.0844 5.08769 12.7591 5.295 12.505C6.48389 11.0922 7.96765 9.95683 9.64209 9.17856C11.3165 8.4003 13.141 7.99803 14.9875 8.00001C16.8413 7.99814 18.6728 8.40371 20.3524 9.18803C22.0321 9.97235 23.5189 11.1162 24.7075 12.5388ZM20.9575 17.035C21.1624 17.2899 21.2592 17.6149 21.2272 17.9403C21.1952 18.2657 21.037 18.5657 20.7865 18.7758C20.536 18.9859 20.2131 19.0895 19.887 19.0644C19.561 19.0392 19.2578 18.8873 19.0425 18.6413C18.5475 18.0482 17.9281 17.5714 17.2282 17.2445C16.5282 16.9177 15.765 16.7488 14.9925 16.75C14.2232 16.749 13.4631 16.9166 12.7655 17.2409C12.068 17.5653 11.45 18.0386 10.955 18.6275C10.7393 18.8745 10.4352 19.0268 10.1083 19.0517C9.7813 19.0766 9.45766 18.972 9.20711 18.7604C8.95655 18.5489 8.79915 18.2474 8.76883 17.9209C8.7385 17.5944 8.83769 17.2691 9.045 17.015C9.77458 16.1481 10.685 15.4514 11.7125 14.9737C12.7399 14.4961 13.8595 14.2491 14.9925 14.25C17.3237 14.25 19.49 15.2838 20.9575 17.035Z"
                fill="#D5DAFF"
              />
            </svg>
            {token ? (
              <div className="connected">
                <div></div> {t("Connected")}
              </div>
            ) : (
              <div className="disconnected">
                <div></div> {t("Disconnected")}
              </div>
            )}
          </div>
          <div className="tip1">{t("Connect more devices to earn more.")}</div>
          {/* <div className="tip2">
            {t("You can always disconnect device in the profile tab.")}
          </div> */}
        </div>

        <div className="stake_box">
          <div className="stake_box_left">
            <img src={home_stake} alt="" />
          </div>
          <div className="stake_box_right">
            <div
              className="btn"
              onClick={() => {
                Navigate("/View/stake");
              }}
            >
              {t("Stake")}
            </div>
            <div
              className="btn"
              onClick={() => {
                Navigate("/View/node");
              }}
            >
              {t("Node Pool")}
            </div>
            <div
              className="record"
              onClick={() => {
                Navigate("/View/stakingrecord");
              }}
            >
              {t("Staking Records")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M10.8538 7.36678L6.21475 4.16336C6.0842 4.07322 5.9284 4.01791 5.76493 4.00367C5.60146 3.98943 5.43686 4.01683 5.2897 4.08278C5.14254 4.14873 5.0187 4.2506 4.93216 4.37688C4.84563 4.50316 4.79984 4.64882 4.79999 4.79741L4.79999 11.2033C4.79998 11.3518 4.84586 11.4974 4.93245 11.6235C5.01904 11.7497 5.14289 11.8515 5.29003 11.9174C5.43716 11.9832 5.60171 12.0106 5.76511 11.9963C5.92851 11.9821 6.08425 11.9267 6.21475 11.8366L10.8538 8.63322C10.9615 8.55886 11.0487 8.46304 11.1087 8.35322C11.1688 8.2434 11.2 8.12252 11.2 8C11.2 7.87748 11.1688 7.7566 11.1087 7.64678C11.0487 7.53696 10.9615 7.44114 10.8538 7.36678Z"
                  fill="#7685BC"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="earn_box">
          <div className="title">{t("My Earning Data")}</div>
          <div className="earn_box_item">
            {t("我的昵称")}：{" "}
            <div
              onClick={() => {
                if (!!token) {
                  setUsernameState(true);
                }
              }}
            >
              {UserInfo?.nickName ?? t("Set Username")}{" "}
              <img src={go_to} alt="" />
            </div>
          </div>
          <div className="earn_box_item">
            {t("我的身份")}：{" "}
            <div>
              {!!UserInfo?.isNode ? t("节点用户") : t("普通用户")}{" "}
              <Tooltip
                title={
                  <div className="tip">
                    {t("Total amount of Token staked in all statuses")}
                  </div>
                }
                trigger={["click"]}
                showArrow={false}
                getPopupContainer={(triggerNode) => triggerNode}
              >
                <div style={{ cursor: "pointer" }}>
                  <img src={info} alt="" />
                </div>
              </Tooltip>
            </div>
          </div>
          {!!UserInfo?.isNode ? (
            <div className="earn_box_item">
              {t("已挂载用户")}：{" "}
              <div
                onClick={() => {
                  Navigate("/View/userlist");
                }}
              >
                {t("用户列表")} <img src={go_to} alt="" />
              </div>
            </div>
          ) : (
            <div className="earn_box_item">
              {t("已挂载节点")}：{" "}
              <div
                style={{ textDecoration: "underline" }}
                onClick={() => {
                  if (!!UserInfo?.mountNodeAddress) {
                    copy(UserInfo?.mountNodeAddress);
                    addMessage(t("Copied successfully"));
                  }
                }}
              >
                {!!UserInfo?.mountNodeAddress
                  ? AddrHandle(UserInfo?.mountNodeAddress, 6, 6)
                  : "-"}
              </div>
            </div>
          )}

          <div className="data_box">
            <div className="data_item">
              <div className="data_item_top">
                <img src={coin_logo} alt="" />
                {NumSplic1(AllData?.totalNodeData, 4) ?? "0"}
              </div>
              <div className="data_item_bottom">{t("总节点数据")}</div>
            </div>
            <div className="line"></div>
            <div className="data_item">
              <div className="data_item_top">
                <img src={coin_logo} alt="" />
                {NumSplic1(AllData?.totalMineData, 4) ?? "0"}
              </div>
              <div className="data_item_bottom">{t("总挖矿数据")}</div>
            </div>
          </div>
        </div>

        <div className="link_box">
          <LinkChart />
        </div>
      </div>
      <FooterBox></FooterBox>

      <SetUsername
        name={UserInfo?.nickName ?? ""}
        fun={getInitDate}
        ShowTipModal={UsernameState}
        close={() => {
          setUsernameState(false);
        }}
      />
    </div>
  );
};

export default Home;
