import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import btn_bg from "../assets/image/Home/btn_bg.png";
import { useSelector } from "react-redux";
import { useViewport } from "./viewportContext";

import { useAppKitAccount } from "@reown/appkit/react";
import point_icon from "../assets/image/PersonCenter/point_icon.png";
import USDT from "../assets/image/USDT.png";
import { NumSplic1, addMessage, dateFormat } from "../utils/tool";

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
  font-family: "Clash Display";
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
  .items {
    width: 100%;
    border-radius: 1.33333rem;
    background: #fff;
    padding: 0.83rem;
    margin: 1.33rem 0px 1rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #73777b;
      text-align: center;
      font-family: Inter;
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin: 0.83rem 0px 0px;
      &:first-child {
        margin-top: 0px;
      }
      span {
        color: #000;
        text-align: center;
        font-family: Inter;
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 4.33rem;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
     
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
  const [NeedORANum, setNeedORANum] = useState<any>({});
  const [UseName, setUseName] = useState("");
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);

  useEffect(() => {
    if (!!props?.name) {
      setUseName(props?.name ?? "");
    }
  }, [props?.name]);

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
          {t("5")}
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
          <div className="items">
            <div className="item">
              {t("6")}
              <span>
                {dateFormat(
                  "YY/mm/dd HH:MM:SS",
                  new Date(props?.data?.tradeTime)
                )}
              </span>
            </div>
            <div className="item">
              {t("7")}
              <span>
                {props?.data?.numInProto} {props?.data?.numInCoinName}
              </span>
            </div>
            <div className="item">
              {t("8")}
              <span>
                {props?.data?.numOutActual} {props?.data?.numOutCoinName}
              </span>
            </div>
            <div className="item">
              {t("9")}
              <span>
                1 {props?.data?.numInCoinName}={props?.data?.price}{" "}
                {props?.data?.numOutCoinName}
              </span>
            </div>
            <div className="item">
              {t("10")}
              <span>
                {props?.data?.feeIn} {props?.data?.feeInCoinName}
              </span>
            </div>
          </div>
          <div
            className="confirm"
            onClick={() => {
              props?.close();
            }}
          >
            {t("Confirm")}
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
