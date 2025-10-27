import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../../../components/FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import codeModalBg from "../assets/image/Invite/codeModalBg.png";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { useAppKitAccount } from "@reown/appkit/react";
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
      padding: 1.5rem 1.67rem 2rem;
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
  font-weight: 500;
  line-height: normal;
  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
`;

const ModalContainer_Content = styled.div`
  width: 100%;
  margin-top: 0.83rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 0px 2rem; */
  .subtitle {
    color: #73777b;
    text-align: center;
    font-family: "Inter";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .svgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    padding: 5px;
    border: 5px solid transparent;
    margin: 2rem 0px;
    position: relative;
    z-index: 0;
    svg {
      position: relative;
      z-index: 1;
      width: 16.66667rem;
      height: 16.66667rem;
      flex-shrink: 0;
    }
  }
  .inviteAddress {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    font-family: "Inter";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    > div {
      width: 100%;

      margin-top: 0.25rem;
      color: #73777b;
      text-align: center;
      font-family: "Inter";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
let NodeInter: any = null;
export default function ModalContent(props: any) {
  const { t } = useTranslation();
  const [PageNum, setPageNum] = useState(1);
  const [RecordList3, setRecordList3] = useState<any>({});

  const token = useSelector((state: any) => state?.token);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  const getRecordFun = () => {};
  useEffect(() => {
    if (!!token) {
      getRecordFun();
    } else {
      // setRecordList3({});
    }
    return () => {
      clearInterval(NodeInter);
    };
  }, [token, PageNum, props?.ShowTipModal]);
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
          {t("113")}{" "}
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
        <ModalContainer_Content>
          <div className="subtitle">{t("114")}</div>

          {/* <img src={codeImg} alt="" /> */}
          <div className="svgBox">
            {" "}
            {/* <QRCode
              value={window.location.origin + "/" + web3ModalAccount}
              bgColor="transparent"
              // fgColor="background: linear-gradient(180deg, #00D558 0%, #05FCE9 50%, #0140E7 100%)"
              // style={{
              //   background:
              //     "linear-gradient(180deg, #00D558 0%, #05FCE9 50%, #0140E7 100%)",
              // }}
            /> */}
            <svg width="100%" height="100%" viewBox="0 0 256 256">
              {/* 定义渐变 */}
              <defs>
                <linearGradient
                  id="qrGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00D558" />
                  <stop offset="50%" stopColor="#05FCE9" />
                  <stop offset="100%" stopColor="#0140E7" />
                </linearGradient>
              </defs>

              {/* 使用 QRCode 并应用渐变 */}
              <QRCode
                value={window.location.origin + "/" + web3ModalAccount}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                fgColor="url(#qrGradient)"
                bgColor="transparent"
              />
            </svg>
          </div>
          <div className="inviteAddress">
            {t("115")}
            <div>{web3ModalAccount}</div>
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
