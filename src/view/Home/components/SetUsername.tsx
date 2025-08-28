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
import { NumSplic1, addMessage } from "../../../utils/tool";
import { updateNickName } from "../../../API";

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
  input {
    width: 100%;
    display: flex;
    padding: 1.5rem 0.83rem;
    margin: 2rem 0px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 1.33333rem;
    background: #fff;
    border: none;
    color: #000;
    font-family: "Clash Display";
    font-size: 1.33333rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &::placeholder {
      color: #7685bc;
      font-family: "Clash Display";
      font-size: 1.33333rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
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
export default function ModalContent(props: any) {
  const { t } = useTranslation();
  const { width } = useViewport();
  const [NeedORANum, setNeedORANum] = useState<any>({});
  const [UseName, setUseName] = useState("");
  const [RecordList3, setRecordList3] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const token = useSelector((state: any) => state?.token);

  const updateFun = () => {
    if (!props?.ShowTipModal) return;
    if (!UseName) return;
    updateNickName({
      nickName: UseName,
    }).then((res: any) => {
      if (res?.code === 200) {
        props.fun();
        props.close();
        return addMessage(!!props?.name ? t("修改成功") : t("设置成功"));
      }
    });
  };

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
          {t("Set Username")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => {
              props.close();
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
          <input
            type="text"
            placeholder={t("输入新昵称")}
            onChange={(e: any) => {
              let value = e.target.value.trim();
              setUseName(value);
            }}
          />
          <div
            className="confirm"
            onClick={() => {
              updateFun();
            }}
          >
            {!!props?.name ? t("修改") : t("设置")}
          </div>
        </ModalContainer_Content>
      </ModalContainer>
    </AllModal>
  );
}
