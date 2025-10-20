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
import { aepList, aepPay, aepPayInfo, aepPayList } from "../../API";
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
import title_logo from "../../assets/image/title_logo.png";
import USDT from "../../assets/image/USDT.png";
import go_to from "../../assets/image/Home/go_to.svg";
import info from "../../assets/image/Home/info.svg";
import LinkChart from "../../components/linkChart";
import buy_item1 from "../../assets/image/Home/buy_item1.png";
import buy_item2 from "../../assets/image/Home/buy_item2.png";
import buy_item3 from "../../assets/image/Home/buy_item3.png";
import banner_item1 from "../../assets/image/Home/banner_item1.png";
import banner_item2 from "../../assets/image/Home/banner_item2.png";
import banner_item3 from "../../assets/image/Home/banner_item3.png";

import BuyModal from "./components/BuyModal";
import copy from "copy-to-clipboard";
//@ts-ignore
import ThreeSixty from "react-360-view";
import NoData from "../../components/NoData";
import BuySuccessModal from "./components/BuySuccessModal";
import AddressModal from "./components/AddressModal";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [BuyModalState, setBuyModalState] = useState(false);
  const [BuySuccessModalState, setBuySuccessModalState] = useState(false);
  const [AddressModalState, setAddressModalState] = useState(false);
  const [AepList, setAepList] = useState<any>([]);
  const [UserInfo, setUserInfo] = useState<any>({});
  const [AepPayList, setAepPayList] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [AepPayInfo, setAepPayInfo] = useState<any>({});
  const [CurrentId, setCurrentId] = useState<any>();

  const goodsObj = [
    { img: buy_item1, id: 1, banner: banner_item1 },
    { img: buy_item2, id: 2, banner: banner_item2 },
    { img: buy_item3, id: 3, banner: banner_item3 },
  ];

  const getInitDate = () => {
    aepList({}).then((res: any) => {
      const result = goodsObj.map((good) => {
        const target = res?.data?.find((item: any) => item.id === good.id);
        return target ? { ...target, ...good } : good;
      });
      setAepList(result || []);
    });
    aepPayList({
      pageNum: 1,
      pageSize: 999,
    }).then((res: any) => {
      setAepPayList(res?.data || {});
    });
  };
  // 获取当前商品详情
  const getInitData = () => {
    aepPayInfo({
      id: CurrentId,
    }).then((res: any) => {
      setAepPayInfo(res?.data || {});
    });
  };
  const getRecordData = () => {
    aepPayInfo({
      id: CurrentId,
    }).then((res: any) => {
      setAepPayInfo(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token && !!CurrentId) {
      getInitData();
    }
  }, [token, CurrentId]);
  useEffect(() => {
    if (!!token) {
      getInitDate();
    } else {
    }
  }, [token]);

  useEffect(() => {
    setUserInfo({});
    setAepPayList({});
  }, [isConnected]);

  return (
    <div className="consume all_page_conttainer">
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
      <div className="consume_content">
        <div className="consume_title">
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
          <div className="consume_title1">
            <img src={title_logo} alt="" />
            <div>{t("74")}</div>
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
        {AepList?.map((item: any, index: any) => (
          <div className="buy_item" key={index}>
            <div className="buy_item_left">
              <img src={item?.img} alt="" />
            </div>
            <div className="buy_item_right">
              <div className="value">AKG</div>
              <div className="price">
                {t("75")}：
                <span>
                  <img src={USDT} alt="" />
                  {item?.amount} USDT
                </span>
              </div>
              <div className="btns">
                <div
                  className="btn"
                  onClick={() => {
                    setCurrentId(item?.id);
                    setBuyModalState(true);
                  }}
                >
                  {t("76")}
                </div>
                <div
                  className="view"
                  onClick={() => {
                    Navigate("/View/producedetail", {
                      state: {
                        id: item?.id,
                        amount: item?.amount,
                        outAmount: item?.outAmount,
                        img: item?.img,
                        banner: item?.banner,
                      },
                    });
                  }}
                >
                  {t("77")}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="history">
          <div className="record_title">{t("78")}</div>
          <div className="devider"></div>
          {AepPayList?.total > 0 ? (
            <div className="record_content">
              <div className=" items title_items">
                <div className="item">{t("79")}(U)</div>
                <div className="item">SAEP{t("29")}</div>
                <div className="item">{t("80")}</div>
                <div className="item">{t("81")}</div>
                <div className="item"></div>
              </div>
              {AepPayList?.list?.map((item: any, index: any) => (
                <div
                  className={
                    item?.logisticsStatus === 2 && item?.status === 2
                      ? "items content_items content_items_end"
                      : "items content_items"
                  }
                  key={index}
                >
                  <div className="item">{item?.amount}</div>
                  <div className="item">{item?.outAmount}</div>
                  <div
                    className="item"
                    style={{
                      color:
                        item?.logisticsStatus === 1 ? "#0140E7" : "#00D558",
                    }}
                  >
                    {item?.logisticsStatus === 1 ? t("82") : t("83")}
                  </div>
                  <div className="item">
                    {item?.status === 1 ? t("84") : t("85")}
                  </div>
                  <div className="item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      onClick={() => {
                        Navigate("/View/ReleaseRecord", {
                          state: { item: item },
                        });
                      }}
                    >
                      <path
                        d="M0.132687 0.0933985C0.0123441 0.195967 -0.031417 0.35887 0.0232843 0.505181L2.2676 6.4798L0.0295358 12.4951C-0.0251655 12.6415 0.0185957 12.8044 0.140501 12.9069C0.262407 13.0095 0.435889 13.0291 0.578112 12.9567L12.7906 6.80862C12.9203 6.74376 13 6.61404 13 6.47377C13 6.33349 12.9187 6.20377 12.789 6.13891L0.568735 0.0421142C0.426511 -0.0287788 0.25303 -0.00917004 0.132687 0.0933985Z"
                        fill="url(#paint0_linear_102_8653)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_102_8653"
                          x1="0"
                          y1="6.88235"
                          x2="13"
                          y2="6.88235"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#00FF38" />
                          <stop offset="0.5" stop-color="#05FCE9" />
                          <stop offset="1" stop-color="#191AFF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoData></NoData>
          )}
        </div>
      </div>
      <FooterBox></FooterBox>

      <BuyModal
        // fun={getInitDate}
        data={{ ...AepPayInfo, id: CurrentId }}
        addaddressfun={() => {
          setBuyModalState(false);
          setAddressModalState(true);
        }}
        getInitData={() => {
          getInitData();
          // 获取购买记录
          getInitDate();
        }}
        showSuccessModal={() => {
          setBuySuccessModalState(true);
        }}
        ShowTipModal={BuyModalState}
        close={() => {
          setBuyModalState(false);
        }}
      />
      <AddressModal
        data={{ ...AepPayInfo, id: CurrentId }}
        getInitData={() => {
          getInitData();
        }}
        showBuyModal={() => {
          setBuyModalState(true);
        }}
        ShowTipModal={AddressModalState}
        close={() => {
          setAddressModalState(false);
        }}
      />
      <BuySuccessModal
        // fun={getInitDate}
        ShowTipModal={BuySuccessModalState}
        close={() => {
          setBuySuccessModalState(false);
        }}
      />
    </div>
  );
};

export default Home;
