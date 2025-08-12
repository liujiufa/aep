import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import { useSelector } from "react-redux";
import { useViewport } from "./viewportContext";
import QRCode from "react-qr-code";
import { useAppKitAccount } from "@reown/appkit/react";
import point_icon from "../assets/image/PersonCenter/point_icon.png";
import ora from "../assets/image/PersonCenter/ora.png";
import { NumSplic1, addMessage } from "../utils/tool";
import { aiRecharge } from "../API";
import ThemeContext from "./ThemeContext";

const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    opacity: 1;
    border-radius: 1.66667rem;
    background: var(--primary-drow-down-bg-color);
    padding: 0px;

    .ant-modal-body {
      padding: 2.67rem 2rem;
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

const ModalContainer_Close = styled(FlexCCBox)`
  position: absolute;
  z-index: 100;
  top: 2.83rem;
  right: 2.42rem;
  z-index: 100;
`;

export const ModalContainer_Title = styled(FlexSBCBox)`
  width: 100%;
  color: var(--primary-card-font-color);
  font-family: "Alibaba PuHuiTi 3.0";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 100% */
`;

const ModalContainer_Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  .inputItem {
    width: 100%;
    margin-top: 2rem;
    .inputItemTitle {
      display: flex;
      align-items: center;

      color: var(--primary-card-title-font-color);
      font-family: "Alibaba PuHuiTi 3.0";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.16667rem; /* 100% */
      /* opacity: 0.6; */
      svg {
        margin-left: 0.17rem;
      }
    }
    .input {
      margin-top: 1rem;
      border-radius: 1.33333rem;
      background: var(--primary-input-light-color);
      padding: 1.42rem 1.33rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--primary-card-font-color);
      text-align: right;
      font-family: "Alibaba PuHuiTi 3.0";
      font-size: 1rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1rem; /* 100% */

      input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        color: var(--primary-card-font-color);
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.16667rem; /* 100% */
        &::placeholder {
          color: var(--primary-card-title-font-color);
          font-family: "Alibaba PuHuiTi 3.0";
          font-size: 1.16667rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.16667rem; /* 100% */
          /* opacity: 0.6; */
        }
      }
      .max {
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.16667rem; /* 100% */
        color: #05efb6;
      }
      img {
        width: 1.33333rem;
        height: 1.33333rem;
        flex-shrink: 0;
        aspect-ratio: 1/1;
        margin-right: 0.5rem;
      }
    }
  }
  .able_point {
    width: 100%;
    text-align: left;
    color: var(--primary-card-title-font-color);
    font-family: "Alibaba PuHuiTi 3.0";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem; /* 100% */
    /* opacity: 0.6; */
    margin-top: 1rem;
  }

  .btns {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    width: 100%;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 3.66667rem;

      color: #fff;
      font-family: "Alibaba PuHuiTi 3.0";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 700;
      line-height: 2rem; /* 171.429% */
      border-radius: 1.33333rem;
      background: linear-gradient(
        91deg,
        #04efb5 1.56%,
        #06eab6 15.03%,
        #0cddba 29.45%,
        #16c8c1 44.84%,
        #24abcb 60.22%,
        #3684d8 75.61%,
        #4b56e7 90.99%,
        #573ff0 97.73%
      );
    }
  }
`;

let NodeInter: any = null;
export default function ModalContent(props: any) {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [NeedORANum, setNeedORANum] = useState<any>({});
  const [UseNum, setUseNum] = useState(10);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);
  const { theme, setTheme } = useContext(ThemeContext);

  const getRecordFun = () => {
    if (!props?.ShowTipModal) return;
    if (!UseNum) return;

    aiRecharge({
      num: !!UseNum ? UseNum : 0,
    }).then((res: any) => {
      setNeedORANum(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getRecordFun();
    } else {
      // setRecordList3({});
    }
    return () => {
      // clearInterval(NodeInter);
    };
  }, [token, UseNum, props?.ShowTipModal]);
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
          {t("AI使用充值")}
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              onClick={() => {
                props.close();
              }}
            >
              <g opacity="0.6">
                <path
                  d="M10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1ZM10 17.56C5.824 17.56 2.44 14.176 2.44 10C2.44 5.824 5.824 2.44 10 2.44C14.176 2.44 17.56 5.824 17.56 10C17.56 14.176 14.176 17.56 10 17.56ZM12.799 7.201C13.078 7.48 13.078 7.939 12.799 8.218L11.017 10L12.799 11.782C13.078 12.061 13.078 12.52 12.799 12.799C12.655 12.943 12.475 13.006 12.286 13.015C12.097 13.006 11.917 12.943 11.773 12.799L10 11.017L8.218 12.799C7.939 13.078 7.48 13.078 7.201 12.799C7.057 12.655 6.994 12.475 6.985 12.286C6.976 12.097 7.057 11.926 7.201 11.773L8.983 10L7.201 8.218C6.922 7.939 6.922 7.48 7.201 7.201C7.48 6.922 7.939 6.922 8.218 7.201L10 8.983L11.782 7.201C12.061 6.922 12.52 6.922 12.799 7.201Z"
                  fill="black"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              onClick={() => {
                props.close();
              }}
            >
              <g opacity="0.6">
                <path
                  d="M10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1ZM10 17.56C5.824 17.56 2.44 14.176 2.44 10C2.44 5.824 5.824 2.44 10 2.44C14.176 2.44 17.56 5.824 17.56 10C17.56 14.176 14.176 17.56 10 17.56ZM12.799 7.201C13.078 7.48 13.078 7.939 12.799 8.218L11.017 10L12.799 11.782C13.078 12.061 13.078 12.52 12.799 12.799C12.655 12.943 12.475 13.006 12.286 13.015C12.097 13.006 11.917 12.943 11.773 12.799L10 11.017L8.218 12.799C7.939 13.078 7.48 13.078 7.201 12.799C7.057 12.655 6.994 12.475 6.985 12.286C6.976 12.097 7.057 11.926 7.201 11.773L8.983 10L7.201 8.218C6.922 7.939 6.922 7.48 7.201 7.201C7.48 6.922 7.939 6.922 8.218 7.201L10 8.983L11.782 7.201C12.061 6.922 12.52 6.922 12.799 7.201Z"
                  fill="white"
                />
              </g>
            </svg>
          )}
        </ModalContainer_Title>
        <ModalContainer_Content>
          
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
