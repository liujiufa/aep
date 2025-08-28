import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { contractAddress } from "../../config";
import iconUSDT from "../../assets/image/BlindBox/USDT.png";

import blind_box_bottom from "../../assets/image/BlindBox/blind_box_bottom.png";
import icon1 from "../../assets/image/BlindBox/icon1.png";
import icon2 from "../../assets/image/BlindBox/icon2.png";
import icon3 from "../../assets/image/BlindBox/icon3.png";
import icon4 from "../../assets/image/BlindBox/icon4.png";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./index.scss";
import { NumSplic1, addMessage, roundTo, showLoding } from "../../utils/tool";
import FooterBox from "../../components/FooterBox";
import HeaderBox from "../../components/HeaderBox";
import Rules from "./components/Rules";
import { getBoxList } from "../../API";
import { useNoGas } from "../../hooks/useNoGas";
import { Contracts } from "../../web3";
import { useAppKitAccount } from "@reown/appkit/react";

const Account = () => {
  const token = useSelector((state: any) => state?.token);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  const {
    handleTransaction,
    TOKENAllowance,
    TOKENBalance,
    handleApprove,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress.Box, contractAddress?.USDT);

  const navigate = useNavigate();

  const [BlindTypeList, setBlindTypeList] = useState<any>([]);
  const { t, i18n } = useTranslation();
  const { isNoGasFun } = useNoGas();

  const [swiperIndex, setSwiperIndex] = useState(0);
  const [InputAmount, setInputAmount] = useState("0");
  const [swiperRef, setSwiperRef]: any = useState(null);
  const [RulesState, setRulesState] = useState(false);
  let CurrentBlind = BlindTypeList[swiperIndex] || {};
  const handleGetTeamInfo = async () => {
    getBoxList()
      .then((res: any) => {
        setBlindTypeList(res?.data || []);
      })
      .catch(() => {});
  };

  const handleSubmit = async (price: any) => {
    if (!token) return;
    if (!CurrentBlind?.remainNum && Number(CurrentBlind?.remainNum) <= 0)
      return addMessage(t("已售罄"));
    handleTransaction(
      Number(price ?? 0) + "",
      async (call: any) => {
        let abi_res: any = null;
        try {
          showLoding(true);
          if (!!(await isNoGasFun())) return showLoding(false);
          abi_res = await Contracts.example?.mintBox(
            web3ModalAccount as string,
            price
          );
        } catch (error: any) {
          // if (error?.code === 4001) {
          showLoding(false);
          return addMessage(t("failed"));
          // }
        }
        if (!!abi_res?.status) {
          await call();
          setTimeout(() => {
            showLoding(false);
            handleGetTeamInfo();
            return addMessage(t("购买成功"));
          }, 5000);
        } else if (abi_res?.status === false) {
          showLoding(false);
          return addMessage(t("failed"));
        }
      },
      () => {
        showLoding(true);
      },
      () => {
        showLoding(false);
      }
    );
  };
  useEffect(() => {
    if (token) {
      handleGetTeamInfo();
    }
  }, [token]);

  return (
    <div className="all_page_conttainer blind_box">
      <HeaderBox></HeaderBox>

      <div className="blind_box_content">
        <div className="blind_box_name">{t("盲盒抽奖")}</div>
        <div className="swiper_box">
          <div className="manage_icon">
            <div
              onClick={() => {
                swiperRef.slideTo(
                  swiperIndex === 0 ? BlindTypeList.length - 1 : swiperIndex - 1
                );
                // swiperRef.slideTo(swiperIndex === 0 ? 2 : swiperIndex - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 3.33337C29.2075 3.33337 36.6667 10.7926 36.6667 20C36.6667 29.2075 29.2075 36.6667 20 36.6667C10.7925 36.6667 3.33334 29.2075 3.33334 20C3.33334 10.7926 10.7925 3.33337 20 3.33337ZM11.4918 20.9324L13.9782 23.4577C14.0171 23.4965 14.0948 23.5742 14.1725 23.6131L21.7871 31.1889C21.9069 31.3089 22.0492 31.4041 22.2059 31.4691C22.3625 31.5341 22.5305 31.5676 22.7001 31.5676C22.8697 31.5676 23.0376 31.5341 23.1943 31.4691C23.3509 31.4041 23.4933 31.3089 23.6131 31.1889L26.1383 28.6636C26.2584 28.5438 26.3536 28.4015 26.4186 28.2448C26.4836 28.0882 26.517 27.9202 26.517 27.7506C26.517 27.581 26.4836 27.4131 26.4186 27.2564C26.3536 27.0998 26.2584 26.9575 26.1383 26.8376L19.3007 20L26.0995 13.1624C26.2195 13.0426 26.3148 12.9003 26.3797 12.7437C26.4447 12.587 26.4782 12.4191 26.4782 12.2495C26.4782 12.0799 26.4447 11.9119 26.3797 11.7553C26.3148 11.5986 26.2195 11.4563 26.0995 11.3365L23.5742 8.81123C23.0692 8.30618 22.2533 8.30618 21.7483 8.81123L14.0559 16.5035C14.0171 16.5424 13.9782 16.5424 13.9782 16.5812L11.453 19.1065C11.3364 19.223 11.2199 19.3784 11.181 19.5338C11.0256 20 11.1033 20.5439 11.4918 20.9324Z"
                  fill="url(#paint0_linear_627_2796)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_627_2796"
                    x1="20"
                    y1="3.33337"
                    x2="20"
                    y2="36.6667"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#CB2BFF" />
                    <stop offset="1" stop-color="#4C23FB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div
              onClick={() => {
                swiperRef.slideTo(
                  swiperIndex === BlindTypeList.length - 1 ? 0 : swiperIndex + 1
                );
                // swiperRef.slideTo(swiperIndex === 2 ? 0 : swiperIndex + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 3.33337C10.7925 3.33337 3.33333 10.7926 3.33333 20C3.33333 29.2075 10.7925 36.6667 20 36.6667C29.2075 36.6667 36.6667 29.2075 36.6667 20C36.6667 10.7926 29.2075 3.33337 20 3.33337ZM28.5082 20.9324L26.0217 23.4577C25.9829 23.4965 25.9052 23.5742 25.8275 23.6131L18.2129 31.1889C18.0931 31.3089 17.9508 31.4041 17.7941 31.4691C17.6375 31.5341 17.4695 31.5676 17.2999 31.5676C17.1303 31.5676 16.9624 31.5341 16.8057 31.4691C16.6491 31.4041 16.5067 31.3089 16.3869 31.1889L13.8617 28.6636C13.7416 28.5438 13.6464 28.4015 13.5814 28.2448C13.5164 28.0882 13.483 27.9202 13.483 27.7506C13.483 27.581 13.5164 27.4131 13.5814 27.2564C13.6464 27.0998 13.7416 26.9575 13.8617 26.8376L20.6993 20L13.9005 13.1624C13.7805 13.0426 13.6852 12.9003 13.6203 12.7437C13.5553 12.587 13.5218 12.4191 13.5218 12.2495C13.5218 12.0799 13.5553 11.9119 13.6203 11.7553C13.6852 11.5986 13.7805 11.4563 13.9005 11.3365L16.4258 8.81123C16.9308 8.30618 17.7467 8.30618 18.2517 8.81123L25.944 16.5035C25.9829 16.5424 26.0217 16.5424 26.0217 16.5812L28.547 19.1065C28.6636 19.223 28.7801 19.3784 28.819 19.5338C28.9744 20 28.8967 20.5439 28.5082 20.9324Z"
                  fill="url(#paint0_linear_627_2862)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_627_2862"
                    x1="20"
                    y1="3.33337"
                    x2="20"
                    y2="36.6667"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#CB2BFF" />
                    <stop offset="1" stop-color="#4C23FB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div
            className="swiper_box_bg"
            style={{
              background: `url(${blind_box_bottom})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <Swiper
            spaceBetween={0}
            ref={swiperRef}
            onSwiper={setSwiperRef}
            centeredSlides={true}
            onSlideChange={(swiper: any) => {
              setSwiperIndex(swiper.activeIndex);
            }}
            slidesPerView={2.2}
            className=""
          >
            {BlindTypeList?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className={`swiper_item`}>
                  <img
                    src={
                      index == 0
                        ? icon1
                        : index === 1
                        ? icon2
                        : index === 2
                        ? icon3
                        : icon4
                    }
                    alt=""
                    className={`
                  ${
                    swiperIndex === Number(index)
                      ? "anim"
                      : "mt60 opacity06 scale06"
                  }`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="current_box">
          {t("盲盒")}
          {swiperIndex + 1}
        </div>

        <div className="manage_box">
          <div className="price_box">
            <div className="title">{t("认购价格")} :</div>
            <div className="value">{CurrentBlind?.price ?? 0} USDT</div>
            {/* <div className="value">
              {CurrentBlind?.amountMin}
              {!!CurrentBlind?.amountMax ? "-" : "+"}
              {CurrentBlind?.amountMax} USDT
            </div> */}
          </div>
          <div className="price_box price_box1">
            <div className="title">{t("额度数量")} :</div>
            <div className="value">
              {NumSplic1(
                roundTo(CurrentBlind?.price * CurrentBlind?.awardQuota, 4),
                4
              )}{" "}
              Token
            </div>
            {/* <div className="value">
              {CurrentBlind?.amountMin}
              {!!CurrentBlind?.amountMax ? "-" : "+"}
              {CurrentBlind?.amountMax} USDT
            </div> */}
          </div>
          {/* <div className="input_box">
            <div className="title">{t("认购数量")} :</div>
            <div className="input">
              <input
                type="text"
                value={
                  !!InputAmount && Number(InputAmount) > 0 ? InputAmount : ""
                }
                onChange={(e: any) => {
                  let value = String(e.target.value)
                    ?.replace(/[+-]/g, "")
                    .replace(/[^0-9]/g, "");
                  setInputAmount(value);
                }}
              />
              <div className="coin_info">
                <img src={iconUSDT} className="w-[20px] mr-4" alt="" />
                <div>USDT</div>
              </div>
            </div>
          </div> */}
          <div
            className={
              !!CurrentBlind?.isBuy ? "buy_btn" : "buy_btn buy_btn_no_work"
            }
            onClick={() => {
              if (!!CurrentBlind?.isBuy) {
                handleSubmit(CurrentBlind?.price);
              }
            }}
          >
            {t("认购")}
          </div>

          <div className="record_items">
            <div className="record_item" onClick={() => setRulesState(true)}>
              {t("参与规则")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2.74975 11.5C2.55775 11.5 2.36575 11.427 2.21975 11.28C1.92675 10.987 1.92675 10.512 2.21975 10.219L5.68975 6.74902L2.21975 3.28002C1.92675 2.98702 1.92675 2.51202 2.21975 2.21902C2.51275 1.92602 2.98775 1.92602 3.28075 2.21902L7.28075 6.21902C7.57375 6.51202 7.57375 6.98702 7.28075 7.28002L3.28075 11.28C3.13375 11.427 2.94175 11.5 2.74975 11.5Z"
                  fill="#4A5682"
                />
                <path
                  d="M7.74975 11.5C7.55775 11.5 7.36575 11.427 7.21975 11.28C6.92675 10.987 6.92675 10.512 7.21975 10.219L10.6897 6.74902L7.21975 3.28002C6.92675 2.98702 6.92675 2.51202 7.21975 2.21902C7.51275 1.92602 7.98775 1.92602 8.28075 2.21902L12.2807 6.21902C12.5738 6.51202 12.5738 6.98702 12.2807 7.28002L8.28075 11.28C8.13375 11.427 7.94175 11.5 7.74975 11.5Z"
                  fill="#4A5682"
                />
              </svg>
            </div>
            <div
              className="record_item"
              onClick={() => navigate("/View/blind_record")}
            >
              {t("认购记录")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2.74975 11.5C2.55775 11.5 2.36575 11.427 2.21975 11.28C1.92675 10.987 1.92675 10.512 2.21975 10.219L5.68975 6.74902L2.21975 3.28002C1.92675 2.98702 1.92675 2.51202 2.21975 2.21902C2.51275 1.92602 2.98775 1.92602 3.28075 2.21902L7.28075 6.21902C7.57375 6.51202 7.57375 6.98702 7.28075 7.28002L3.28075 11.28C3.13375 11.427 2.94175 11.5 2.74975 11.5Z"
                  fill="#4A5682"
                />
                <path
                  d="M7.74975 11.5C7.55775 11.5 7.36575 11.427 7.21975 11.28C6.92675 10.987 6.92675 10.512 7.21975 10.219L10.6897 6.74902L7.21975 3.28002C6.92675 2.98702 6.92675 2.51202 7.21975 2.21902C7.51275 1.92602 7.98775 1.92602 8.28075 2.21902L12.2807 6.21902C12.5738 6.51202 12.5738 6.98702 12.2807 7.28002L8.28075 11.28C8.13375 11.427 7.94175 11.5 7.74975 11.5Z"
                  fill="#4A5682"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Rules
        ShowModalState={RulesState}
        close={() => {
          setRulesState(false);
        }}
      />
      <FooterBox></FooterBox>
    </div>
  );
};

export default Account;
