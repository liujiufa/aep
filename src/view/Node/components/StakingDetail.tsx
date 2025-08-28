import styled, { keyframes } from "styled-components";
import loadingIcon from "../assets/image/loadingIcon.svg";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../../../components/FlexBox";
import { Modal, Pagination, PaginationProps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../assets/image/closeIcon.svg";
import codeImg from "../assets/image/Invite/codeImg.png";
import { useSelector } from "react-redux";
import { useViewport } from "../../../components/viewportContext";
import { useAppKitAccount } from "@reown/appkit/react";
import point_icon from "../assets/image/PersonCenter/point_icon.png";
import ora from "../assets/image/PersonCenter/ora.png";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../../../utils/tool";
   
import { Contracts } from "../../../web3";
import { useNoGas } from "../../../hooks/useNoGas";

const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    opacity: 1;
    border-radius: 1.66667rem;
    background: #f4f4f4;
    padding: 0px;

    .ant-modal-body {
      position: relative;
      padding: 1.92rem 1.33rem;
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
    top: 1.5rem;
    right: 1.17rem;
  }
`;

const ModalContainer_Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .items {
    margin: 2rem 0px;
    width: 100%;
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #7685bc;
      font-family: "Clash Display";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 0.83rem;
      &:last-child {
        margin: 0px;
      }
      span {
        color: #000;
        text-align: right;
        font-family: "Clash Display";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
  .confirm {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: "Clash Display";
    font-size: 1.33333rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 83.25rem;
    background: #6b72ff;
    padding: 1rem;
    width: 100%;
  }
`;

let NodeInter: any = null;
export default function ModalContent({
  ShowModalState,
  CurrentItem,
  close,
  fun,
}: any) {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [NeedORANum, setNeedORANum] = useState<any>({});
  const [UseNum, setUseNum] = useState(10);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);
  const { isNoGasFun } = useNoGas();

  const withdrawFun = async () => {
    if (!web3ModalAccount) return;
    let abi_res: any = null;
    try {
      if (!!(await isNoGasFun())) return;
      showLoding(true);
      abi_res = await Contracts.example.unstake(
        web3ModalAccount,
        CurrentItem?.chainId
      );
    } catch (error: any) {
      showLoding(false);
      return addMessage(t("failed"));
    }
    if (!!abi_res?.status) {
      setTimeout(() => {
        showLoding(false);
        fun();
        close();
        return addMessage(t("赎回成功"));
      }, 5000);
    }
  };

  return (
    <AllModal
      visible={ShowModalState}
      className="Modal"
      centered
      width={"26.08333rem"}
      closable={false}
      footer={null}
    >
      <ModalContainer>
        <ModalContainer_Title>
          {t("Staking Detail")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => {
              close();
            }}
          >
            <rect width="24" height="24" rx="12" fill="#E6E6E5" />
            <path
              d="M17.7863 6.21373C17.854 6.28148 17.9078 6.36191 17.9445 6.45044C17.9811 6.53896 18 6.63384 18 6.72966C18 6.82548 17.9811 6.92037 17.9445 7.00889C17.9078 7.09742 17.854 7.17785 17.7863 7.2456L7.24558 17.7863C7.10875 17.9231 6.92316 18 6.72965 18C6.53613 18 6.35054 17.9231 6.21371 17.7863C6.07687 17.6495 6 17.4639 6 17.2704C6 17.0768 6.07687 16.8913 6.21371 16.7544L16.7544 6.21373C16.8221 6.14597 16.9026 6.09222 16.9911 6.05555C17.0796 6.01887 17.1745 6 17.2703 6C17.3662 6 17.461 6.01887 17.5496 6.05555C17.6381 6.09222 17.7185 6.14597 17.7863 6.21373Z"
              fill="#7F7F7F"
            />
            <path
              d="M6.21373 6.21373C6.28148 6.14597 6.36191 6.09222 6.45044 6.05555C6.53896 6.01887 6.63384 6 6.72966 6C6.82548 6 6.92037 6.01887 7.00889 6.05555C7.09742 6.09222 7.17785 6.14597 7.2456 6.21373L17.7863 16.7544C17.9231 16.8913 18 17.0768 18 17.2704C18 17.4639 17.9231 17.6495 17.7863 17.7863C17.6495 17.9231 17.4639 18 17.2704 18C17.0768 18 16.8913 17.9231 16.7544 17.7863L6.21373 7.2456C6.14597 7.17785 6.09222 7.09742 6.05555 7.00889C6.01887 6.92037 6 6.82548 6 6.72966C6 6.63384 6.01887 6.53896 6.05555 6.45044C6.09222 6.36191 6.14597 6.28148 6.21373 6.21373Z"
              fill="#7F7F7F"
            />
          </svg>
        </ModalContainer_Title>
        <ModalContainer_Content>
          <div className="items">
            <div className="item">
              {t("Time")}：{" "}
              <span>
                {dateFormat(
                  "YYYY.mm.dd HH:MM:SS",
                  new Date(CurrentItem?.pledgeTime)
                )}
              </span>
            </div>
            <div className="item">
              {t("User Address")}：{" "}
              <span>{AddrHandle(CurrentItem?.userAddress, 5, 4)}</span>
            </div>
            {/* 
            <div className="item">
              User Identity： <span>Node User</span>
            </div>
             */}
            <div className="item">
              {t("Staked Amount")}： <span>{CurrentItem?.pledgeAmount}</span>
            </div>
            <div className="item">
              {t("Staking Time")}： <span>{CurrentItem?.pledgeDay}</span>
            </div>
            <div className="item">
              {t("Status")}：{" "}
              <span>
                {CurrentItem?.status === 1 ? t("待赎回") : t("Staking")}
              </span>
            </div>
          </div>
          {CurrentItem?.status === 1 ? (
            <div
              className="confirm"
              onClick={() => {
                withdrawFun();
              }}
            >
              {t("赎回")}
            </div>
          ) : (
            <div
              className="confirm"
              onClick={() => {
                close();
              }}
            >
              {t("Confirm")}
            </div>
          )}
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
