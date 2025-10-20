import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../../../components/FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import btn_bg from "../../../assets/image/Home/btn_bg.png";
import { useSelector } from "react-redux";
import { useViewport } from "../../../components/viewportContext";

import { useAppKitAccount } from "@reown/appkit/react";
import point_icon from "../assets/image/PersonCenter/point_icon.png";
import USDT from "../../../assets/image/USDT.png";
import { NumSplic1, addMessage } from "../../../utils/tool";

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
  .success_box {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.33333rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 1.5rem 0px;
    svg {
      margin-bottom: 2rem;
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
          <div className="success_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <path
                d="M11.641 17.7269L16.1695 26.5006C16.1695 26.5006 23.5285 8.66987 35.1331 2.72629C34.8506 6.97123 33.7184 10.6514 35.6992 15.1799C30.6043 16.3108 20.1322 29.0476 16.7359 35.2741C11.9242 29.3308 6.26354 24.8023 2.30078 23.3862L11.641 17.7269Z"
                fill="url(#paint0_linear_154_1499)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_154_1499"
                  x1="19"
                  y1="2.72629"
                  x2="19"
                  y2="35.2741"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#00D558" />
                  <stop offset="0.5" stop-color="#05FCE9" />
                  <stop offset="1" stop-color="#0140E7" />
                </linearGradient>
              </defs>
            </svg>
            {t("103")}
          </div>
          <div
            className="confirm "
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
