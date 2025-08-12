// @ts-nocheck
import "./App.scss";
import "./App.css";
import React from "react";

import { useEffect } from "react";
import "./lang/i18n";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Routers from "./router";
import { GetQueryString, showLoding, startWord } from "./utils/tool";
// import web3 from 'web3';
import { stateType } from "./store/reducer";
import {
  createAddMessageAction,
  createLoginSuccessAction,
  createDelMessageAction,
} from "./store/actions";
import { Login } from "./API";
import Loding from "./components/loding";
import ViewportProvider from "./components/viewportContext";
// import { useNavigate } from "react-router-dom";
// import Home from './view/Home';
import prohibit from "./assets/image/prohibit.png";
import info from "./assets/image/info.svg";

import { t } from "i18next";
import useConnectWallet, { connector } from "./hooks/useConnectWallet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useSign } from "./hooks/useSign";
import { useTitle } from "ahooks";
import { ThemeContextProvider } from "./components/ThemeContext";

import * as QB from "quickblox/quickblox";

import { QBConfig } from "./QBconfig";

declare let window: any;

const MessageBox = styled.div`
  position: fixed;
  z-index: 9999999;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);

  .messageItem {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 8px;
    opacity: 1;
    border-radius: 0.83333rem;
    border: 1px solid #04efb5;
    background: #fff;
    backdrop-filter: blur(5px);
    width: 28.25rem;
    div {
      word-break: break-all;
      flex: 1;
      color: #000;
      font-family: "Alibaba PuHuiTi 3.0";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.16667rem; /* 100% */
      text-transform: capitalize;
    }
    padding: 2rem 1.67rem;
    > svg {
      margin-left: 10px;
    }
    margin-bottom: 8px;
  }
`;

function App() {
  const { t } = useTranslation();
  // useTitle(t("Uni"));

  const web3React = useWeb3React();
  const { connectWallet } = useConnectWallet();
  const { signFun } = useSign();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let state = useSelector<stateType, stateType>((state) => state);

  return (
    <ViewportProvider>
      <ThemeContextProvider>
        <div className="App">
          {state?.message?.length > 0 && (
            <MessageBox>
              {state?.message?.map((item, index) => (
                <div className="messageItem" key={index}>
                  <div> {item.message}</div>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    onClick={() => {
                      dispatch(createDelMessageAction(item.index));
                    }}
                  >
                    <path
                      d="M13.3397 4.6603C13.3905 4.71111 13.4308 4.77143 13.4583 4.83783C13.4858 4.90422 13.5 4.97538 13.5 5.04725C13.5 5.11911 13.4858 5.19027 13.4583 5.25667C13.4308 5.32306 13.3905 5.38339 13.3397 5.4342L5.43419 13.3397C5.33156 13.4423 5.19237 13.5 5.04723 13.5C4.9021 13.5 4.76291 13.4423 4.66028 13.3397C4.55765 13.2371 4.5 13.0979 4.5 12.9528C4.5 12.8076 4.55765 12.6684 4.66028 12.5658L12.5658 4.6603C12.6166 4.60948 12.6769 4.56916 12.7433 4.54166C12.8097 4.51416 12.8809 4.5 12.9528 4.5C13.0246 4.5 13.0958 4.51416 13.1622 4.54166C13.2286 4.56916 13.2889 4.60948 13.3397 4.6603Z"
                      fill="#242D39"
                    />
                    <path
                      d="M4.6603 4.6603C4.71111 4.60948 4.77143 4.56916 4.83783 4.54166C4.90422 4.51416 4.97538 4.5 5.04725 4.5C5.11911 4.5 5.19027 4.51416 5.25667 4.54166C5.32306 4.56916 5.38339 4.60948 5.4342 4.6603L13.3397 12.5658C13.4423 12.6684 13.5 12.8076 13.5 12.9528C13.5 13.0979 13.4423 13.2371 13.3397 13.3397C13.2371 13.4423 13.0979 13.5 12.9528 13.5C12.8076 13.5 12.6684 13.4423 12.5658 13.3397L4.6603 5.4342C4.60948 5.38339 4.56916 5.32306 4.54166 5.25667C4.51416 5.19027 4.5 5.11911 4.5 5.04725C4.5 4.97538 4.51416 4.90422 4.54166 4.83783C4.56916 4.77143 4.60948 4.71111 4.6603 4.6603Z"
                      fill="#242D39"
                    />
                  </svg>
                </div>
              ))}
            </MessageBox>
          )}
          <Routers></Routers>
          {state.showLoding && <Loding></Loding>}
        </div>
      </ThemeContextProvider>
    </ViewportProvider>
  );
}

export default App;
