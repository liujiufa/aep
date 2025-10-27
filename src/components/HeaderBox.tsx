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
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";
import { createLoginSuccessAction, savePriceAction } from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";
import demo from "../assets/image/demo.svg";

import "../assets/style/layout.scss";
import { Menu, Dropdown, Modal } from "antd";
import {
  contractAddress,
  curentBSCChainId,
  curentETHChainId,
  customNetwork_BSC,
  customNetwork_BSC_TEST,
  GoTo,
  isMain,
  LOCAL_KEY,
} from "../config";
import { useViewport } from "./viewportContext";
import Web3 from "web3";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import { useSign } from "../hooks/useSign";
import { useNoGas } from "../hooks/useNoGas";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import logo_dark from "../assets/image/logo.png";

import chain_img1 from "../assets/image/Layout/chain_img1.png";
import chain_img2 from "../assets/image/Layout/chain_img2.png";
import chain_img2_dark from "../assets/image/Layout/chain_img2_dark.png";
import chain_img3 from "../assets/image/Layout/chain_img3.png";
import chain_img4 from "../assets/image/Layout/chain_img4.png";
import chain_img_not3 from "../assets/image/Layout/chain_img_not3.png";
import chain_img_not4 from "../assets/image/Layout/chain_img_not4.png";
import walletIcon from "../assets/image/Layout/walletIcon.png";
import languageIcon_dark from "../assets/image/Layout/languageIcon_dark.png";
import light from "../assets/image/Layout/light.png";
import dark from "../assets/image/Layout/dark.png";
import { bscTestnet, bsc, mainnet, holesky } from "@reown/appkit/networks";
import ThemeContext, { Themes } from "./ThemeContext";
const { Header, Content } = Layout;

let refereeUserAddress: any;

const LogoContainer = styled(FlexCCBox)`
  width: fit-content;
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #ffffff;

  > img {
    width: 3.16667rem;
    height: 3.16667rem;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    flex-shrink: 0;
  }
`;

const HeaderContainer = styled(Header)`
  margin: 0px auto;
  backdrop-filter: blur(10px);
  padding: 0;
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  max-width: 450px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;

  background: transparent;
  .HeaderNav {
    padding: 0.37rem 1.5rem;
  }
`;

const SetBox = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  line-height: normal;
  .menuBox {
    width: 1.66667rem;
    height: 1.66667rem;
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .activeConnect {
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .walletInfo {
      font-family: "Space Grotesk";
      font-size: 14px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      > div {
        font-family: "Space Grotesk";
        font-size: 12px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #999999;
      }
    }
  }
  .langDrowDrop {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    > img {
      width: 100%;
    }
  }
  .ChainDropBox {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    height: fit-content;
    padding: 0.5rem 0.67rem;
    border-radius: 16px;
    opacity: 1;
    background: var(--primary-card-color);
    color: var(--primary-card-font-color);
    font-family: "Inter";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem; /* 100% */
    .chainIcon {
      width: 1.16667rem;
      height: 1.16667rem;
      flex-shrink: 0;
    }
    .dropDownIcon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    .chainName {
      color: var(--primary-card-font-color);
      font-family: "Inter";
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1rem; /* 100% */
      padding: 0 0.5rem;
    }
  }

  .Connect {
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 1.91667rem;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.5);
    padding: 0.45rem 0.667rem;
    color: #5b5d5e;
    font-family: "Inter";
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    img {
      width: 1.66667rem;
      height: 1.66667rem;
      margin-right: 0.17rem;
    }
  }
  .LangDropDown {
    .ant-dropdown-menu {
      color: var(--primary-card-font-color);
      font-family: "Inter";
      font-size: 1rem;
      font-style: normal;
      font-weight: 600;
      line-height: 1rem; /* 100% */
      padding: 0.92rem 0px;
      border-radius: 12px;
      opacity: 1;
      background: var(--primary-drow-down-bg-color);
      /* border: 2px solid var(--primary-drow-down-border-color); */
      .ant-dropdown-menu-item {
        padding: 0;
        .LangItem {
          cursor: pointer;
          margin-bottom: 0.67rem;
          padding: 0 1.5rem;
        }
        /* 语言切换下拉 */

        &:last-child {
          .LangItem {
            margin-bottom: 0px;
          }
        }
        .LangItem {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #000;
          text-align: right;
          font-family: "Inter";
          font-size: 1.16667rem;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          img {
            width: 1.16667rem;
            height: 1.16667rem;
            flex-shrink: 0;
            margin-right: 0.33rem;
          }
        }
        .active {
          color: #00d558;
          text-align: right;
          font-family: "Inter";
          font-size: 1.16667rem;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
    }
  }

  > div {
    margin-left: 0.5rem;
  }
`;

const MyLayout = styled(Layout)``;

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

export const ModalContainer_Title = styled(FlexBox)`
  width: 100%;
  align-items: flex-start;
  font-family: "Space Grotesk";
  font-size: 24px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
`;

const MobileSlider = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0px;

  /* right: 50%;
  transform: translateX(255px); */
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  /* max-width: 450px; */
  max-width: ${({ isOpen }) => (isOpen ? "450px" : "0px")};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  opacity: 1;
  z-index: 99;

  transition: width 1.5s;
  display: flex;
  justify-content: flex-end;
  .menus {
    overflow: auto;
    height: 100vh;
    border-radius: 16px 0px 0px 16px;
    background: var(--primary-color);
    width: 20rem;
    padding: 6.67rem 0rem 4.67rem;
    z-index: 99;
  }
`;
const MobileSlider_Menu = styled.div`
  width: 100%;
  .logo_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3.67rem;
    padding: 0px 2rem;
    > img {
      width: 8.44442rem;
      height: 2.66667rem;
      flex-shrink: 0;
    }
    div {
      img {
        width: 4rem;
        height: 2rem;
        flex-shrink: 0;
      }
    }
  }
  .menu {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: MiSans;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #c5ccd4;
    /* margin-bottom: 2.67rem; */
    padding: 1.33rem 2rem;
    border: transparent;
    > img {
      width: 1.33333rem;
      height: 1.33333rem;
      flex-shrink: 0;
    }
    > div {
      display: flex;
      align-items: center;
      color: var(--primary-card-font-color);
      font-family: "Inter";
      font-size: 1.16667rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.33333rem; /* 114.286% */
      img {
        width: 1.33333rem;
        height: 1.33333rem;
        flex-shrink: 0;
        margin-right: 1rem;
      }
    }
  }
  .active {
    /* border: 1px solid #fff; */
    background: var(--primary-card-color);
  }

  .about {
    padding: 0px 2rem;
    margin-top: 2.67rem;

    .about_us_title {
      display: flex;
      align-items: center;
      div {
        color: var(--primary-card-font-color);
        font-family: "Inter";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem; /* 100% */
        &:last-child {
          margin-left: 0.33rem;
          flex: 1;
          height: 0.08333rem;
          /* background: #d9d9d9; */
          opacity: 0.5;
        }
      }
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 2rem;
      img {
        width: 2.66rem;
        height: 2.66rem;
      }
    }
  }
`;

declare let window: any;
const MainLayout: any = () => {
  const web3 = new Web3();
  const codeInputRef = useRef<any>(null);
  let dispatch = useDispatch();
  let token = useSelector<any>((state) => state.token);
  let { t, i18n } = useTranslation();
  let [ItemActive, setItemActive] = useState("/");
  const [InputValue, setInputValue] = useState<any>(null);
  const Navigate = useNavigate();
  const { width } = useViewport();
  const { theme, setTheme } = useContext(ThemeContext);
  const [CurrentChain, setCurrentChain] = useState<any>({
    value: "BNB Chain",
    chainId: isMain ? 56 : 97,
    key: "chain_item1",
    img: chain_img1,
  });
  const { signFun } = useSign();
  const { isNoGasFun } = useNoGas();
  const { walletProvider } = useAppKitProvider("eip155");
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { open, close } = useAppKit();
  const { disconnect } = useDisconnect();
  const [BindModal, setBindModal] = useState(false);
  const location = useLocation();
  const pathname = startWord(location.pathname);

  const [showMask, setShowMask] = useState(false);
  const [RewardRecordModalState, setRewardRecordModalState] = useState(false);
  const [OpenList, setOpenList] = useState<any>([]);
  const [UserInfo, setUserInfo] = useState<any>({});

  function changeLanguage(lang: any) {
    window.localStorage.setItem(LOCAL_KEY, lang.key);
    i18n.changeLanguage(lang.key);
  }
  const openFun = (type: any) => {
    let Arr: any = OpenList;
    if (Arr?.some((item: any) => Number(item) === Number(type))) {
      Arr = Arr?.filter((item: any) => Number(item) !== Number(type));
    } else {
      Arr = [...Arr, type];
    }

    setOpenList(Arr);
    console.log(Arr, "Arr");
  };
  let ChainObj = [
    {
      value: "BSC",
      chainId: curentBSCChainId,
      key: "chain_item1",
      img: chain_img1,
      link: "https://www.uniagent.co/pdf/Whitepaper.pdf",
    },

    {
      value: "Ethereum",
      chainId: curentETHChainId,
      key: "chain_item4",
      img: theme === "light" ? chain_img2 : chain_img2_dark,
      link: "https://www.uniagent.co/pdf/DeAILightingPlan.pdf",
    },

    {
      value: "Solana",
      chainId: 112,
      key: "chain_item5",
      img: chain_img3,
      imgNot: chain_img_not3,
      link: "",
    },
    {
      value: "Base",
      chainId: 112123,
      key: "chain_item6",
      img: chain_img4,
      imgNot: chain_img_not4,
      link: "",
    },
  ];

  let langObj = [
    { value: "EN", key: "en" },
    { value: "CN", key: "zh-CN" },
  ];

  const menu3 = (
    <Menu
      onClick={changeLanguage}
      items={langObj.map((item: any) => {
        return {
          label: (
            <span
              className={
                i18n.language === item?.key
                  ? "LangItem ReallyLangItem active"
                  : "LangItem ReallyLangItem"
              }
            >
              {item.value}
            </span>
          ),
          key: item?.key,
        };
      })}
    />
  );

  // 导航
  const navigateFun = (path: string) => {
    Navigate("/View" + path);
  };

  const getInitData = () => {};

  useEffect(() => {
    // if (String(pathname) !== "/Bridge") {
    //   switchNetwork(customNetwork_UNI);
    // }
    if (!!pathname) {
      setItemActive(pathname ?? "/");
    }
  }, [pathname, token]);

  useEffect(() => {
    if (!!token) {
      getInitData();
    }
  }, [token]);

  return (
    <MyLayout>
      <HeaderContainer>
        <div className="HeaderNav">
          <LogoContainer>
            <img
              onClick={() => {
                setShowMask(false);
                Navigate("/View/");
              }}
              src={logo_dark}
            />
          </LogoContainer>

          <SetBox>
            <Dropdown
              overlay={menu3}
              placement="bottom"
              overlayClassName="LangDropDown ChainDropDown"
              trigger={["click"]}
              arrow={false}
              getPopupContainer={(triggerNode: any) => triggerNode}
            >
              <div className="langDrowDrop pointer">
                <img src={languageIcon_dark} alt="" />
              </div>
            </Dropdown>

            {!!token ? (
              <div
                className="Connect  pointer "
                onClick={() => {
                  // open();
                }}
              >
                <img src={walletIcon} alt="" />{" "}
                {AddrHandle(web3ModalAccount as string, 4, 4)}{" "}
              </div>
            ) : (
              <div
                className="Connect  pointer "
                onClick={() => {
                  open();
                }}
              >
                <img src={walletIcon} alt="" /> {t("Connect wallet")}
              </div>
            )}
          </SetBox>
        </div>
      </HeaderContainer>

      <MobileSlider isOpen={showMask}>
        <div className="menus">
          <MobileSlider_Menu></MobileSlider_Menu>
        </div>
        {!!showMask && (
          <div
            className="Mask"
            onClick={() => {
              setShowMask(false);
            }}
          ></div>
        )}
      </MobileSlider>
    </MyLayout>
  );
};
export default MainLayout;
