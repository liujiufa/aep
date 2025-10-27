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
import { Login, userIsBind } from "../API/index";
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
import BindModal from "../components/BindModal";

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

  font-family: "Inter";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 100% */
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
  const { open, close } = useAppKit();
  const { disconnect } = useDisconnect();
  const [showMask, setShowMask] = useState(false);
  const [BindModalState, setBindModalState] = useState(false);

  const LoginFun = useCallback(
    async (refereeAddress = "") => {
      if (web3ModalAccount) {
        await signFun(
          (res: any) => {
            Login({
              ...res,
              userAddress: web3ModalAccount as string,
              refereeUserAddress: refereeAddress,
            }).then((res: any) => {
              if (res.code === 200) {
                showLoding(false);
                setBindModalState(false);
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
    [web3ModalAccount]
  );

  const getInitData = async () => {
    let tag = await web3.utils.isAddress(window.location.pathname.slice(1));
    if (tag) {
      refereeUserAddress = window.location.pathname.slice(1);
    } else {
      refereeUserAddress = "";
    }
    userIsBind({
      userAddress: web3ModalAccount,
    })
      .then((res: any) => {
        if (res?.code === 200 && !!res?.data?.isBind) {
          LoginFun(refereeUserAddress);
        } else {
          setBindModalState(!res?.data?.isBind);
        }
      })
      .catch((e: any) => {
        disconnect();
      });
  };

  const bindInviteFun = async (address: any = null) => {
    let tag = await web3.utils.isAddress(window.location.pathname.slice(1));
    if (tag) {
      refereeUserAddress = window.location.pathname.slice(1);
    } else {
      refereeUserAddress = "";
    }
    LoginFun(!!refereeUserAddress ? refereeUserAddress : address);
  };

  useEffect(() => {
    if (!!web3ModalAccount) {
      new Contracts(walletProvider);
      getInitData();
    }
  }, [web3ModalAccount]);
  useEffect(() => {
    if (!web3ModalAccount) {
      dispatch(createLoginSuccessAction(web3ModalAccount as string, ""));
    }
  }, [web3ModalAccount, isConnected]);

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

      <BindModal
        refereeUserAddress={refereeUserAddress}
        fun={bindInviteFun}
        ShowTipModal={BindModalState}
        close={() => {
          setBindModalState(false);
        }}
      />
    </MyLayout>
  );
};
export default MainLayout;
