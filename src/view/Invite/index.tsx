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
import { aepRefereeInfo, aepRefereeList, getUserInfo } from "../../API";
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
import go_to from "../../assets/image/Home/go_to.svg";
import info from "../../assets/image/Home/info.svg";
import LinkChart from "../../components/linkChart";
import banner from "../../assets/image/Invite/banner.png";
import ec_code from "../../assets/image/Invite/ec_code.png";

import copy from "copy-to-clipboard";
//@ts-ignore
import ThreeSixty from "react-360-view";
import NoData from "../../components/NoData";
import CodeModal from "./components/CodeModal";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [BuyModalState, setBuyModalState] = useState(false);
  const [AepRefereeInfo, setAepRefereeInfo] = useState<any>({});
  const [AllData, setAllData] = useState<any>({});
  const [RefereeList, setRefereeList] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const CopyCodeFun = () => {
    if (!web3ModalAccount) {
      return addMessage(t("Please Connect wallet"));
    } else {
      copy(window.location.origin + "/" + web3ModalAccount);
      addMessage(t("Copied successfully"));
    }
  };
  const getInitDate = () => {
    aepRefereeInfo({}).then((res: any) => {
      setAepRefereeInfo(res?.data || {});
    });
    aepRefereeList({
      orderType: 0,
      pageNum: 1,
      pageSize: 5,
      userAddress: "",
    }).then((res: any) => {
      setRefereeList(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitDate();
    } else {
    }
  }, [token]);
  useEffect(() => {
    setAepRefereeInfo({});
    setAllData({});
  }, [isConnected]);

  return (
    <div className="invite all_page_conttainer">
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
      <div className="invite_content">
        <div className="invite_title">
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
          <div className="invite_title1">
            <img src={title_logo} alt="" />
            <div>{t("104")}</div>
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

        <div className="banner">
          <img src={banner} alt="" />
        </div>
        <div className="invite_box">
          <div className="btn">
            {t("105")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              onClick={() => {
                CopyCodeFun();
              }}
            >
              <path
                d="M11.0176 5.20996C12.0354 5.20996 12.8559 5.20982 13.501 5.29688C14.1705 5.38618 14.7352 5.57894 15.1816 6.02637C15.6304 6.47508 15.8238 7.03927 15.9131 7.70898C16.0001 8.3541 16 9.17472 16 10.1914V11.0176C16 12.0353 16.0001 12.8559 15.9131 13.501C15.8227 14.1706 15.6303 14.7352 15.1816 15.1816C14.7341 15.6303 14.1706 15.8238 13.501 15.9131C12.8559 16.0001 12.0354 16 11.0176 16H10.1914C9.17467 16 8.35411 16.0001 7.70898 15.9131C7.03927 15.8227 6.47508 15.6304 6.02637 15.1816C5.57896 14.7341 5.38618 14.1705 5.29688 13.501C5.20983 12.8559 5.20996 12.0353 5.20996 11.0176V10.1914C5.20996 9.17469 5.20985 8.35411 5.29688 7.70898C5.38617 7.03929 5.57881 6.47507 6.02637 6.02637C6.47508 5.57877 7.03927 5.38617 7.70898 5.29688C8.35413 5.20983 9.17462 5.20996 10.1914 5.20996H11.0176ZM6.1748 0C7.3669 0 8.31172 0.000547897 9.05957 0.0898438C9.82627 0.179154 10.4584 0.369565 10.9863 0.803711C11.1648 0.948781 11.3284 1.11444 11.4746 1.29297C11.8853 1.79292 12.0777 2.38642 12.1748 3.10059C12.1971 3.26576 12.2151 3.44253 12.2285 3.62891C12.2441 3.8431 12.2513 3.95005 12.1855 4.02148C12.1186 4.09292 12.0091 4.09375 11.7881 4.09375H10.125C9.16183 4.09375 8.27861 4.09333 7.55762 4.19043C6.76526 4.2965 5.92601 4.54766 5.23633 5.2373C4.54652 5.92711 4.29549 6.76707 4.18945 7.55957L4.19043 7.56055C4.09337 8.27922 4.09375 9.16299 4.09375 10.126V11.7891C4.09375 12.0101 4.09292 12.1196 4.02148 12.1865C3.95005 12.2523 3.84317 12.2451 3.62891 12.2295C3.45208 12.217 3.27536 12.199 3.09961 12.1758C2.38538 12.0798 1.79295 11.8863 1.29297 11.4756C1.11411 11.3291 0.949649 11.1658 0.802734 10.9873C0.369682 10.4594 0.180403 9.8273 0.0888672 9.06055C0.000687546 8.31269 0 7.36788 0 6.17578V6.10352C0 4.91164 0.00058937 3.96639 0.0898438 3.21973C0.179129 2.45188 0.369624 1.82089 0.803711 1.29297C0.948817 1.11438 1.11438 0.950073 1.29297 0.802734C1.8209 0.369724 2.45296 0.180388 3.21973 0.0888672C3.96753 0.000724179 4.91172 0 6.10254 0H6.1748Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="ec_code">
            <img
              src={ec_code}
              alt=""
              onClick={() => {
                if (web3ModalAccount) {
                  setBuyModalState(true);
                } else {
                  return addMessage(t("Please Connect wallet"));
                }
              }}
            />
          </div>
        </div>

        <div className="level_box">
          <div className="title">
            {t("106")}：C{AepRefereeInfo?.level ?? 0}
          </div>
          <div className="devider"></div>
          <div className="items">
            <div className="item">
              {t("107")}
              <div className="item_bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.1166 8.14306C12.5484 7.70811 13.5827 6.45969 13.5827 4.9872C13.5827 3.1533 11.9786 1.66663 9.99997 1.66663C8.02129 1.66663 6.41728 3.1533 6.41728 4.9872C6.41728 6.45969 7.45149 7.70811 8.88334 8.14306C6.22823 8.4842 4.16663 10.6101 4.16663 13.1609V18.3333H15.8333V13.1609C15.8333 10.6101 13.7717 8.4842 11.1166 8.14306Z"
                    fill="url(#paint0_linear_104_9177)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_104_9177"
                      x1="9.99996"
                      y1="1.66663"
                      x2="9.99996"
                      y2="18.3333"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#00D558" />
                      <stop offset="0.5" stop-color="#05FCE9" />
                      <stop offset="1" stop-color="#0140E7" />
                    </linearGradient>
                  </defs>
                </svg>
                {AepRefereeInfo?.refereeNumValid ?? 0}
              </div>
            </div>
            <div className="item_devider"></div>
            <div className="item">
              {t("108")}
              <div className="item_bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.25 10.625C12.5 10.625 13.5 11.125 14.375 12.125C14.875 12.75 15.125 13.625 15.125 14.5C15.125 15.375 15.125 16.375 15 17.375C15 17.5 15 17.625 14.875 17.625C14.125 17.875 13.375 18.125 12.625 18.25C11.75 18.375 10.75 18.375 9.875 18.375C8.375 18.375 7 18 5.5 17.625C5.375 17.625 5.125 17.5 5 17.5C5.125 16.25 5 15 5.125 13.875C5.25 12.875 5.75 12 6.625 11.375C7.375 10.875 8.125 10.625 9 10.625H11.25ZM6.5 7.625C6.5 8.625 6.87501 9.375 7.625 10.125C7.375 10.25 7.24999 10.25 7 10.375C5.75001 11 4.875 12 4.5 13.5C4.375 13.875 4.375 14.25 4.375 14.625V15.375C4 15.375 3.5 15.25 3.125 15.25C2.125 15.125 1.125 14.875 0.125 14.625C1.05193e-05 14.5 0 14.5 0 14.375V11.25C1.04845e-05 9.75001 1.12501 8.375 2.5 7.875C2.875 7.75 3.375 7.625 3.875 7.625H6.5ZM16.125 7.625C17.75 7.625 18.875 8.37501 19.625 9.875C19.875 10.375 20 11 20 11.5V14C20 14.125 20 14.25 19.875 14.25C19.125 14.625 18.25 14.875 17.5 15C16.875 15.125 16.375 15.125 15.75 15.25V14.375C15.75 13.25 15.375 12.25 14.625 11.375C14.125 10.875 13.5 10.5 12.875 10.25C12.8739 10.2489 12.7494 10.125 12.625 10.125C13.375 9.5 13.75 8.62499 13.75 7.625H16.125ZM10.125 4.625C11.625 4.62501 13 5.87502 13 7.5C13.125 9.125 11.75 10.5 10.125 10.5C8.5 10.5 7.25 9.125 7.125 7.5C7.12502 5.87502 8.50001 4.625 10.125 4.625ZM5 1.75C6.5 1.75 7.875 3 7.875 4.625V4.75C7.125 5.25 6.625 6.125 6.5 7.125C6.125 7.375 5.5 7.5 5 7.5C3.37501 7.5 2.00001 6.12499 2 4.625C2 3 3.375 1.75 5 1.75ZM15 1.625C16.5 1.625 17.875 2.875 17.875 4.5C18 6.12498 16.625 7.5 15 7.5C14.5 7.5 14.125 7.375 13.75 7.25C13.625 6.00001 13 5 12 4.5C12 2.875 13.375 1.625 15 1.625Z"
                    fill="url(#paint0_linear_104_9181)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_104_9181"
                      x1="10"
                      y1="1.625"
                      x2="10"
                      y2="18.375"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#00D558" />
                      <stop offset="0.5" stop-color="#05FCE9" />
                      <stop offset="1" stop-color="#0140E7" />
                    </linearGradient>
                  </defs>
                </svg>
                {AepRefereeInfo?.teamNum ?? 0}
              </div>
            </div>
          </div>
        </div>
        <div className="level_box market_box">
          <div className="title">{t("109")}</div>
          <div className="devider"></div>
          <div className="items">
            <div className="item">
              {t("109")}
              <div className="item_bottom">
                <img src={SAEP} alt="" />
                {AepRefereeInfo?.teamAchieve ?? 0}
              </div>
            </div>
            <div className="item_devider"></div>
            <div className="item">
              {t("110")}
              <div className="item_bottom">
                <img src={SAEP} alt="" />
                {AepRefereeInfo?.minAchieve ?? 0}
              </div>
            </div>
          </div>
        </div>

        <div className="refer_list">
          <div className="record_title">
            {t("111")}({RefereeList?.totol ?? 0})
          </div>
          <div className="devider"></div>
          {RefereeList?.totol > 0 ? (
            <>
              <div className="record_content">
                {RefereeList?.list?.map((item: any, index: any) => (
                  <div
                    className="items content_items content_items_end"
                    key={index}
                  >
                    <div className="item">
                      {AddrHandle(item?.userAddress, 6, 4)}
                    </div>

                    <div className="item">
                      {dateFormat("mm/dd HH:MM", new Date(item?.createTime))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="all"
                onClick={() => {
                  Navigate("/View/InviteRecord");
                }}
              >
                {t("112")}
              </div>
            </>
          ) : (
            <NoData></NoData>
          )}
        </div>
      </div>
      <FooterBox></FooterBox>

      <CodeModal
        fun={getInitDate}
        ShowTipModal={BuyModalState}
        close={() => {
          setBuyModalState(false);
        }}
      />
    </div>
  );
};

export default Home;
