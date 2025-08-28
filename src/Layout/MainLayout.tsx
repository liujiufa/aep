import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import type { MenuProps } from "antd";
import {
  AddrHandle,
  addMessage,
  GetQueryString,
  showLoding,
  NumSplic,
  getFullNum,
  startWord,
} from "../utils/tool";
import { Login } from "../API/index";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";
import { createLoginSuccessAction, savePriceAction } from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import { useViewport } from "../components/viewportContext";
import Web3 from "web3";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "../components/FlexBox";
import { useSign } from "../hooks/useSign";
import { useNoGas } from "../hooks/useNoGas";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import { curentBSCChainId } from "../config";
import ThemeContext from "../components/ThemeContext";

const { Header, Content } = Layout;

let refereeUserAddress: any;

const MyLayout = styled(Layout)`
  position: relative;
`;

export const ModalContainer_Title_Container = styled(FlexCCBox)`
  width: 100%;
  > img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  > svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export const ModalContainer_Title = styled(FlexSBCBox)`
  width: 100%;
  color: var(--primary-card-font-color);

  font-family: "Clash Display";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 100% */
`;

const AllModal = styled(Modal)`
  z-index: 10000;
  .ant-modal-content {
    overflow: hidden;
    border-radius: 12px;
    opacity: 1;
    border-radius: 1.66667rem;
    background: var(--primary-drow-down-bg-color);

    padding: 0px;

    .ant-modal-body {
      position: relative;
      padding: 2.67rem 2rem 2rem;
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

const ModalContainer_Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled(FlexCCBox)`
  width: 100%;
  padding: 1.42rem;
  margin: 2rem 0px;
  color: var(--primary-card-font-color);
  text-align: center;
  font-family: "Clash Display";
  font-size: 1.16667rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.16667rem; /* 100% */
  border-radius: 1.33333rem;
  background: var(--primary-card-heavy-color);
`;

const Btn = styled(FlexCCBox)`
  width: fit-content;
  opacity: 1;
  width: 100%;
  padding: 0.83rem;
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
  cursor: pointer;
  color: #fff;
  font-family: "Clash Display";
  font-size: 1.16667rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem; /* 171.429% */
`;

const ConfirmBtn = styled(FlexCCBox)`
  width: 100%;
  > div {
    width: 100%;
  }
`;
const InputBox_Top = styled(FlexBox)`
  width: 100%;
  align-items: flex-start;
  /* padding-bottom: 5.42rem; */
  textarea {
    width: 100%;
    flex: 1;
    color: var(--primary-card-font-color);
    font-family: "Clash Display";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.16667rem; /* 100% */
    background: transparent;
    outline: none;
    border: none;
    padding: 0px;
    margin-right: 5px;
    &::placeholder {
      color: var(--primary-card-title-font-color);

      font-family: "Clash Display";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.16667rem; /* 100% */
      /* opacity: 0.6; */
    }
  }
  div {
    color: #000;
    text-align: center;
    font-family: "Clash Display";
    font-size: 1.16667rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.16667rem; /* 100% */
  }
`;

declare let window: any;
let isBindInterval: any = null;
const MainLayout: any = () => {
  const inputsRef: any = useRef();
  const web3 = new Web3();
  const codeInputRef = useRef<any>(null);
  let dispatch = useDispatch();
  let token = useSelector<any>((state) => state.token);
  let { t, i18n } = useTranslation();
  const [InputValue, setInputValue] = useState<any>(null);
  const Navigate = useNavigate();
  const { width } = useViewport();

  const { signFun } = useSign();
  const { isNoGasFun } = useNoGas();
  const { walletProvider } = useAppKitProvider("eip155");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { open, close } = useAppKit();
  const { disconnect } = useDisconnect();
  const [BindModal, setBindModal] = useState(false);
  const [showMask, setShowMask] = useState(false);
  const [IsUpLevel, setIsUpLevel] = useState(false);
  const [BackBscModalState, setBackBscModalState] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const LoginFun = useCallback(
    async (refereeAddress = "") => {
      if (web3ModalAccount) {
        await signFun(
          (res: any) => {
            Login({
              ...res,
              userAddress: web3ModalAccount as string,
              refereeAddress: refereeAddress,
            }).then((res: any) => {
              if (res.code === 200) {
                showLoding(false);
                dispatch(
                  createLoginSuccessAction(
                    web3ModalAccount as string,
                    res.data.token
                  )
                );
              } else {
                disconnect();
                showLoding(false);
                addMessage(res.msg);
              }
            });
          },
          `userAddress=${web3ModalAccount as string}`,
          () => {
            disconnect();
          }
        );
      }
    },
    [web3ModalAccount, chainId]
  );

  const getInitData = () => {};

  const getInviteFun = async () => {
    let tag = await web3.utils.isAddress(window.location.pathname.slice(1));
    if (tag) {
      refereeUserAddress = window.location.pathname.slice(1);
    } else {
      refereeUserAddress = "";
    }
    LoginFun(refereeUserAddress);
  };

  useEffect(() => {
    if (!!web3ModalAccount) {
      new Contracts(walletProvider);
      getInviteFun();
      // SelectBindFun();
    }
  }, [web3ModalAccount]);
  useEffect(() => {
    if (!web3ModalAccount) {
      dispatch(createLoginSuccessAction(web3ModalAccount as string, ""));
    }
  }, [web3ModalAccount, isConnected]);

  useEffect(() => {
    if (!!token) {
      getInitData();
    }
    return () => {
      clearInterval(isBindInterval);
    };
  }, [token]);

  return (
    <MyLayout>
      <Content>
        <Outlet />
        {!!showMask && (
          <div
            className="Mask"
            onClick={() => {
              setShowMask(false);
            }}
          ></div>
        )}
      </Content>

      <AllModal
        visible={BindModal}
        className="Modal"
        centered
        width={"26.08333rem"}
        closable={false}
        footer={null}
      >
        <ModalContainer>
          <ModalContainer_Title>
            {t("推荐绑定")}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              onClick={() => {
                disconnect();
                setBindModal(false);
              }}
            >
              <g opacity="0.6">
                <path
                  d="M10 1C5.032 1 1 5.032 1 10C1 14.968 5.032 19 10 19C14.968 19 19 14.968 19 10C19 5.032 14.968 1 10 1ZM10 17.56C5.824 17.56 2.44 14.176 2.44 10C2.44 5.824 5.824 2.44 10 2.44C14.176 2.44 17.56 5.824 17.56 10C17.56 14.176 14.176 17.56 10 17.56ZM12.799 7.201C13.078 7.48 13.078 7.939 12.799 8.218L11.017 10L12.799 11.782C13.078 12.061 13.078 12.52 12.799 12.799C12.655 12.943 12.475 13.006 12.286 13.015C12.097 13.006 11.917 12.943 11.773 12.799L10 11.017L8.218 12.799C7.939 13.078 7.48 13.078 7.201 12.799C7.057 12.655 6.994 12.475 6.985 12.286C6.976 12.097 7.057 11.926 7.201 11.773L8.983 10L7.201 8.218C6.922 7.939 6.922 7.48 7.201 7.201C7.48 6.922 7.939 6.922 8.218 7.201L10 8.983L11.782 7.201C12.061 6.922 12.52 6.922 12.799 7.201Z"
                  fill={theme === "light" ? "black" : "white"}
                />
              </g>
            </svg>
          </ModalContainer_Title>
          <ModalContainer_Content>
            {IsUpLevel ? (
              <InputBox>{AddrHandle(refereeUserAddress, 10, 10)}</InputBox>
            ) : (
              <InputBox>
                <InputBox_Top>
                  <textarea
                    rows={5} // 指定文本区域的行数
                    cols={50} // 指定文本区域的列数
                    placeholder={t("请绑定上级邀请地址")}
                    value={InputValue}
                    onChange={(e: any) => {
                      setInputValue(e.target.value);
                    }}
                    style={{ resize: "none" }}
                  />{" "}
                  {/* <div
                    onClick={(e) => {
                      handlePaste(e);
                      // handleClick();
                    }}
                  >
                    粘贴
                  </div> */}
                </InputBox_Top>
              </InputBox>
            )}
            <ConfirmBtn>
              <Btn
                onClick={() => {
                  if (Number(chainId) === curentBSCChainId) {
                    // BindFun();
                  } else {
                    setBindModal(false);
                    return setBackBscModalState(true);
                  }
                  // if (!!NoNewUserState) {
                  // } else {
                  //   LoginFun(InputValue);
                  // }
                }}
              >
                {t("Confirm")}
              </Btn>
            </ConfirmBtn>
          </ModalContainer_Content>
        </ModalContainer>
      </AllModal>
    </MyLayout>
  );
};
export default MainLayout;
