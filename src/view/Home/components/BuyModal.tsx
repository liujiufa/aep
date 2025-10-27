import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../../../components/FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import btn_bg from "../../../assets/image/Invite/btn_bg.png";
import { useSelector } from "react-redux";
import { useViewport } from "../../../components/viewportContext";

import { useAppKitAccount } from "@reown/appkit/react";
import point_icon from "../assets/image/PersonCenter/point_icon.png";
import USDT from "../../../assets/image/USDT.png";
import { NumSplic1, addMessage, showLoding } from "../../../utils/tool";
import { aepPay } from "../../../API";
import { Contracts } from "../../../web3";
import Web3 from "web3";
import useUSDTGroup from "../../../hooks/useUSDTGroup";
import { contractAddress } from "../../../config";

const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    opacity: 1;
    border-radius: 1.66667rem;
    background: #e7eef5;
    box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.05),
      -8px 0 10px 0 rgba(205, 229, 253, 0.6) inset;
    padding: 0px;

    .ant-modal-body {
      position: relative;
      padding: 1rem 1.67rem 1rem;
    }
  }
`;

const ModalContainer = styled(FlexBox)`
  /* position: relative; */
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer_Title = styled(FlexCCBox)`
  width: 100%;
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const ModalContainer_Content = styled.div<{ src: any }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .pay_manage {
    width: 100%;
    margin: 1.33rem 0px 1rem;
    border-radius: 1.33333rem;
    background: #fff;
    padding: 1.33rem 1.17rem;
    .pay_box {
      .add_address {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        color: #73777b;
        text-align: center;
        text-overflow: ellipsis;
        font-family: "Inter";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.04667rem;
      }
      .address_info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info {
          flex: 1;
          .info_top {
            overflow: hidden;
            color: #000;
            text-align: left;
            text-overflow: ellipsis;
            font-family: "Inter";
            font-size: 1.16667rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: -0.04667rem;
          }
          .info_bottom {
            margin-top: 0.33rem;
            color: #73777b;
            font-family: "Inter";
            font-size: 1rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1rem;
            letter-spacing: -0.04rem;
          }
        }
        svg {
          margin-left: 1.42rem;
        }
      }
      .pay_title {
        overflow: hidden;
        color: #73777b;
        text-align: left;
        text-overflow: ellipsis;
        font-family: "Inter";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.04667rem;
      }
      .pay_item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0.83rem 0px;
        overflow: hidden;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
        text-overflow: ellipsis;
        font-family: "Inter";
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.04rem;
        word-break: break-all;
        .select {
          width: 1.33333rem;
          height: 1.33333rem;
          border: 1px solid #73777b;
          border-radius: 50%;
          min-width:1.33333rem;
        }
        .selected {
          width: 1.33333rem;
          height: 1.33333rem;
          border: 1px solid #000;
          background: #00d558;
          border-radius: 50%;
          min-width:1.33333rem;
        }
        .text {
          /* flex: 1; */
          /* overflow: hidden; */
          color: #000;
          /* text-align: center;
          font-variant-numeric: lining-nums proportional-nums;
          text-overflow: ellipsis; */
          font-family: "Inter";
          font-size: 1.16667rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          letter-spacing: -0.02333rem;
          white-space: nowrap;
          margin: 0px 0.33rem 0px 0.33rem;
        }
      }
      .devider {
        margin: 1.33rem 0px;
        height: 0.08333rem;
        width: 100%;
        background: rgba(0, 0, 0, 0.1);
      }
    }
    .pay_amount {
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      color: #73777b;
      text-align: center;
      text-overflow: ellipsis;
      font-family: "Inter";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.04667rem;
      span {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        overflow: hidden;
        color: #000;
        text-align: center;
        font-variant-numeric: lining-nums proportional-nums;
        text-overflow: ellipsis;
        font-family: "Inter";
        font-size: 1.33333rem;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: -0.02667rem;

        img {
          width: 1.66667rem;
          height: 1.66667rem;
          margin-right: 0.33rem;
        }
      }
    }
  }
  .tip {
    overflow: hidden;
    color: #e34956;
    text-align: center;
    text-overflow: ellipsis;
    font-family: "Inter";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.04rem;
  }
  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14rem;
    height: 4.41667rem;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: "Inter";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1.16667rem;

    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    background-image: ${({ src }) => `url(${src})`};
  }
  .confirm_no_work {
    opacity: 0.5;
  }
`;

let NodeInter: any = null;
export default function ModalContent(props: any) {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [ActiveType, setActiveType] = useState<any>(1);
  const [UseName, setUseName] = useState("");
  const [USDTBalance, setUSDTBalance] = useState("0");
  const [ShowTip, setShowTip] = useState<any>(false);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);
  const {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress?.Market, contractAddress?.USDT);

  const buyAEPFun = (id: any) => {
    showLoding(true);
    aepPay({
      id: id,
      payType: ActiveType === 1 ? 2 : 1,
    }).then(async (res: any) => {
      if (res?.code === 200 && !!res?.data?.signStr) {
        let value: any = null;
        try {
          // debugger;
          value = await Contracts.example.buy(
            web3ModalAccount as string,
            res?.data?.signStr
          );
        } catch (error: any) {
          showLoding(false);
          return addMessage(t("failed"));
        }
        if (!!value?.status) {
          showLoding(false);
          props?.showSuccessModal();
          props?.close();
          setTimeout(() => {
            props?.getInitData();
          }, 3000);
          // await callbackFun();
          // let tag = true;
          // RewardReceiveInterval = setInterval(async () => {
          //   let api_data: any = await getIdoAccount();
          //   if (api_data?.data?.amount <= 0 && tag) {
          //     showLoding(false);
          //     tag = false;
          //     clearInterval(RewardReceiveInterval);
          //     getInitDate();
          //     return addMessage(t("领取成功"));
          //   }
          // }, 3000);
        } else if (value?.status === false) {
          showLoding(false);
          addMessage(t("failed"));
        }
      } else {
        showLoding(false);
        addMessage(res.msg);
      }
    });
  };

  const buyFun = async (id: any, price: any) => {
    if (!web3ModalAccount) return addMessage(t("Please Connect wallet"));
    if (!token) return addMessage(t("Please log in first"));

    if (ActiveType === 1) {
      buyAEPFun(id);
    } else {
      handleTransaction(
        Number(price ?? 0) + "",
        async (call: any) => {
          buyAEPFun(id);
        },
        () => {
          showLoding(true);
        },
        () => {
          showLoding(false);
        }
      );
    }
  };

  useEffect(() => {
    if (
      !!props?.data?.address ||
      !!props?.data?.phone ||
      !!props?.data?.receiver
    ) {
      setShowTip(false);
    } else {
      setShowTip(true);
    }
  }, [
    props?.data?.address,
    props?.data?.phone,
    props?.data?.receiver,
    props?.ShowTipModal,
  ]);

  useEffect(() => {
    if (!!web3ModalAccount) {
      Contracts?.example
        ?.balanceOf(web3ModalAccount, contractAddress?.USDT)
        .then((res: any) => {
          setUSDTBalance(Web3.utils.fromWei(res + "", "ether") || "0");
        });
    }
  }, [web3ModalAccount, props?.ShowTipModal]);
  return (
    <AllModal
      visible={props?.ShowTipModal}
      className="Modal"
      centered
      width={"26.08333rem"}
      closable={false}
      footer={null}
    >
      <ModalContainer>
        <ModalContainer_Title>
          {t("87")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            onClick={() => {
              props?.close();
            }}
          >
            <path
              d="M15.5227 15.5234C15.2493 15.7969 14.802 15.7969 14.5286 15.5234L4.47583 5.4707C4.20239 5.19727 4.20239 4.75 4.47583 4.47656C4.74927 4.20312 5.19653 4.20312 5.46997 4.47656L15.5247 14.5312C15.7961 14.8027 15.7961 15.25 15.5227 15.5234Z"
              fill="black"
            />
            <path
              d="M15.5227 4.47681C15.7961 4.75024 15.7961 5.19751 15.5227 5.47095L5.46997 15.5237C5.19653 15.7971 4.74927 15.7971 4.47583 15.5237C4.20239 15.2502 4.20239 14.803 4.47583 14.5295L14.5305 4.47485C14.802 4.20337 15.2493 4.20337 15.5227 4.47681Z"
              fill="black"
            />
          </svg>
        </ModalContainer_Title>
        <ModalContainer_Content src={btn_bg}>
          <div className="pay_manage">
            <div className="pay_box">
              {!!props?.data?.address &&
              !!props?.data?.phone &&
              !!props?.data?.receiver ? (
                <div
                  className="address_info"
                  onClick={() => {
                    props?.addaddressfun();
                  }}
                >
                  <div className="info">
                    <div className="info_top">
                      {props?.data?.receiver} {props?.data?.phone}
                    </div>
                    <div className="info_bottom">{props?.data?.address}</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.05335 16.25C7.2591 16.25 7.46478 16.177 7.62183 16.0305L13.5146 10.5307C13.8285 10.2381 13.8285 9.76309 13.5146 9.47011L7.62183 3.96974C7.30782 3.67675 6.79943 3.67675 6.48544 3.96974C6.17152 4.26228 6.17152 4.7373 6.48544 5.03029L11.8098 10.0002L6.48544 14.9694C6.17152 15.2625 6.17152 15.737 6.48544 16.03C6.64189 16.177 6.84767 16.25 7.05335 16.25Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  className="add_address"
                  onClick={() => {
                    props?.addaddressfun();
                  }}
                >
                  {t("97")}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.05335 16.25C7.2591 16.25 7.46478 16.177 7.62183 16.0305L13.5146 10.5307C13.8285 10.2381 13.8285 9.76309 13.5146 9.47011L7.62183 3.96974C7.30782 3.67675 6.79943 3.67675 6.48544 3.96974C6.17152 4.26228 6.17152 4.7373 6.48544 5.03029L11.8098 10.0002L6.48544 14.9694C6.17152 15.2625 6.17152 15.737 6.48544 16.03C6.64189 16.177 6.84767 16.25 7.05335 16.25Z"
                      fill="#A6A6A6"
                    />
                  </svg>
                </div>
              )}
              <div className="devider"></div>
              <div className="pay_title">{t("98")}：</div>
              <div
                className="pay_item"
                onClick={() => {
                  setActiveType(1);
                }}
              >
                <div className={ActiveType === 1 ? "selected" : "select"}></div>{" "}
                <div className="text">{t("99")}</div> ({t("100")}：
                {NumSplic1(props?.data?.amountReceiveUsdt, 4) ?? 0} USDT)
              </div>
              <div
                className="pay_item"
                onClick={() => {
                  setActiveType(2);
                }}
              >
                <div className={ActiveType === 2 ? "selected" : "select"}></div>{" "}
                <div className="text">{t("101")}</div> ({t("100")}：
                {NumSplic1(USDTBalance, 4) ?? 0} USDT)
              </div>
              <div className="devider"></div>
            </div>
            <div className="pay_amount">
              {t("102")}：{" "}
              <span>
                <img src={USDT} alt="" />
                {props?.data?.amount}
              </span>
            </div>
          </div>
          {!!ShowTip && <div className="tip">{t("144")}</div>}
          {ActiveType === 1 && (
            <div
              className={
                Number(props?.data?.amountReceiveUsdt) >=
                  Number(props?.data?.amount) &&
                !!props?.data?.address &&
                !!props?.data?.phone &&
                !!props?.data?.receiver
                  ? "confirm"
                  : "confirm confirm_no_work"
              }
              onClick={() => {
                if (
                  Number(props?.data?.amountReceiveUsdt) >=
                  Number(props?.data?.amount)
                ) {
                  if (
                    !!props?.data?.address &&
                    !!props?.data?.phone &&
                    !!props?.data?.receiver
                  ) {
                    buyFun(props?.data?.id, props?.data?.amount);
                  }
                }
              }}
            >
              {Number(props?.data?.amountReceiveUsdt) >=
              Number(props?.data?.amount)
                ? t("Confirm")
                : t("Insufficient balance")}
            </div>
          )}
          {ActiveType === 2 && (
            <div
              className={
                Number(USDTBalance) >= Number(props?.data?.amount) &&
                !!props?.data?.address &&
                !!props?.data?.phone &&
                !!props?.data?.receiver
                  ? "confirm"
                  : "confirm confirm_no_work"
              }
              onClick={() => {
                if (Number(USDTBalance) >= Number(props?.data?.amount)) {
                  if (
                    !!props?.data?.address &&
                    !!props?.data?.phone &&
                    !!props?.data?.receiver
                  ) {
                    buyFun(props?.data?.id, props?.data?.amount);
                  }
                }
              }}
            >
              {Number(USDTBalance) >= Number(props?.data?.amount)
                ? t("Confirm")
                : t("Insufficient balance")}
            </div>
          )}
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
