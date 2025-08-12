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
import {
  Login,
  checkAddressLogin,
  getUserInfo,
  isNewUser,
  isRefereeAddress,
  signBindReferee,
} from "../API/index";
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
import CodeInputBox from "./CodeInputBox";
import { useSign } from "../hooks/useSign";
import { useNoGas } from "../hooks/useNoGas";
import useTipLoding from "./ModalContent";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import logo from "../assets/image/layout/logo.png";
import logo_dark from "../assets/image/layout/logo_dark.png";
import c_img1 from "../assets/image/layout/c_img1.png";
import c_img2 from "../assets/image/layout/c_img2.png";
import c_img3 from "../assets/image/layout/c_img3.png";
import c_img4 from "../assets/image/layout/c_img4.png";
import c_img5 from "../assets/image/layout/c_img5.png";
import menuIcon1 from "../assets/image/layout/menuIcon1.png";
import menuIcon2 from "../assets/image/layout/menuIcon2.png";
import menuIcon3 from "../assets/image/layout/menuIcon3.png";
import menuIcon3_1 from "../assets/image/layout/menuIcon3_1.png";
import menuIcon4 from "../assets/image/layout/menuIcon4.png";
import menuIcon5 from "../assets/image/layout/menuIcon5.png";
import menuIcon6 from "../assets/image/layout/menuIcon6.png";
import menuIcon7 from "../assets/image/layout/menuIcon7.png";
import menuIcon8 from "../assets/image/layout/menuIcon8.png";
import menuIcon9 from "../assets/image/layout/menuIcon9.png";

import chain_img1 from "../assets/image/layout/chain_img1.png";
import chain_img2 from "../assets/image/layout/chain_img2.png";
import chain_img2_dark from "../assets/image/layout/chain_img2_dark.png";
import chain_img3 from "../assets/image/layout/chain_img3.png";
import chain_img4 from "../assets/image/layout/chain_img4.png";
import chain_img_not3 from "../assets/image/layout/chain_img_not3.png";
import chain_img_not4 from "../assets/image/layout/chain_img_not4.png";
import slider_logo from "../assets/image/layout/slider_logo.png";
import slider_logo_dark from "../assets/image/layout/slider_logo_dark.png";
import dropDownIcon from "../assets/image/layout/dropDownIcon.png";
import dropDownIcon_dark from "../assets/image/layout/dropDownIcon_dark.png";
import menu_fill from "../assets/image/layout/menu_fill.png";
import menu_fill_dark from "../assets/image/layout/menu_fill_dark.png";
import languageIcon from "../assets/image/layout/languageIcon.png";
import languageIcon_dark from "../assets/image/layout/languageIcon_dark.png";
import light from "../assets/image/layout/light.png";
import dark from "../assets/image/layout/dark.png";
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
    width: 6.33333rem;
    height: 2rem;
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
    padding: 1.08rem 1.33rem;
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
    width: 1.66667rem;
    height: 1.66667rem;
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
    font-family: "Alibaba PuHuiTi 3.0";
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
      font-family: "Alibaba PuHuiTi 3.0";
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
    border-radius: 124px;
    opacity: 1;
    background: var(--primary-card-color);
    color: var(--primary-card-font-color);
    font-family: "Alibaba PuHuiTi 3.0";
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1rem; /* 100% */
    padding: 0.58rem 1rem;
  }
  .LangDropDown {
    .ant-dropdown-menu {
      color: var(--primary-card-font-color);
      font-family: "Alibaba PuHuiTi 3.0";
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
          margin-bottom: 1.17rem;
          padding: 0 0.83rem;
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
          color: var(--primary-card-font-color);
          font-family: "Alibaba PuHuiTi 3.0";
          font-size: 1rem;
          font-style: normal;
          font-weight: 500;
          line-height: 1rem; /* 100% */
          img {
            width: 1.16667rem;
            height: 1.16667rem;
            flex-shrink: 0;
            margin-right: 0.33rem;
          }
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
      font-family: "Alibaba PuHuiTi 3.0";
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
        font-family: "Alibaba PuHuiTi 3.0";
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
export let communityObj = [
  {
    key: "c_item1",
    img: c_img1,
    link: "soon",
  },
  {
    key: "c_item2",
    img: c_img2,
    link: "soon",
  },
  {
    key: "c_item3",
    img: c_img3,
    link: "https://www.youtube.com/ORA_Web3",
  },
  {
    key: "c_item4",
    img: c_img4,
    link: "https://x.com/ORA_Web3",
  },
  {
    key: "c_item5",
    img: c_img5,
    link: "https://t.me/ORA_Global",
  },
];

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
    { value: "English", key: "en" },
    { value: "简体中文", key: "zh-CN" },
    { value: "繁体中文", key: "zh-TW" },
    { value: "日本語", key: "ja" },
    { value: "한국인", key: "kr" },
    // { value: "Nederlands", key: "lang1" },
    // { value: "Polski", key: "lang2" },
    // { value: "Português (Brazil)", key: "lang3" },
    // { value: "Italiano", key: "lang4" },
    // { value: "Bahasa Indonesia", key: "lang5" },
  ];

  const menu2 = (
    <Menu
      onClick={() => {}}
      items={[
        ...ChainObj.map((item: any) => {
          return {
            label: (
              <span
                className="LangItem"
                onClick={() => {
                  new Contracts(walletProvider);
                  if (item?.chainId === curentBSCChainId) {
                    showLoding(true);
                    switchNetwork(
                      isMain ? customNetwork_BSC : customNetwork_BSC_TEST
                    );
                  } else if (item?.chainId === curentETHChainId) {
                    showLoding(true);
                    switchNetwork(isMain ? mainnet : holesky);
                  } else {
                    return addMessage(t("Coming soon"));
                  }
                }}
              >
                <img className="img" src={item?.imgNot ?? item?.img} alt="" />
                {item.value}
              </span>
            ),
            key: item?.key,
          };
        }),
      ]}
    />
  );
  const menu3 = (
    <Menu
      onClick={changeLanguage}
      items={langObj.map((item: any) => {
        return {
          label: <span className="LangItem ReallyLangItem">{item.value}</span>,
          key: item?.key,
        };
      })}
    />
  );

  const headerNavObj: any = [
    {
      name: "首页",
      pathname: "/",
      icon: menuIcon1,
      menu: "menu pointer",
      menuActive: "menu pointer active",
    },
    {
      name: "使用AI",
      pathname: "/AI",
      icon: menuIcon2,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "ORA发射",
      pathname: "/ORA",
      icon: menuIcon3,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "NFT",
      pathname: "/NFT",
      icon: menuIcon4,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "邀请好友",
      pathname: "/Invite",
      icon: menuIcon3_1,
      menu: "menu pointer",
      menuActive: "menu pointer active",
    },
    {
      name: "交易市场",
      pathname: "/NFTTrade",
      icon: menuIcon5,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "盲盒抽奖",
      pathname: "/Lottery",
      icon: menuIcon6,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "收益赚取",
      pathname: "/EarnReward",
      icon: menuIcon7,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "奖励中心",
      pathname: "/RewardCenter",
      icon: menuIcon8,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
    {
      name: "个人中心",
      pathname: "/PersonCenter",
      icon: menuIcon9,
      menu: "menu pointer",
      menuActive: "menu pointer active",
      // isSoon: true,
    },
  ];

  // 导航
  const navigateFun = (path: string) => {
    Navigate("/View" + path);
  };

  function menuActive(path: string) {
    if (ItemActive === path) {
      return headerNavObj?.find(
        (item: any) => String(item?.pathname) === String(path)
      )?.menuActive;
    } else {
      return headerNavObj?.find(
        (item: any) => String(item?.pathname) === String(path)
      )?.menu;
    }
  }
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

  useEffect(() => {
    if (chainId) {
      if (
        Object.keys(
          ChainObj?.find(
            (item: any) => Number(item?.chainId) === Number(chainId)
          ) ?? {}
        ).length !== 0
      ) {
        showLoding(false);
        setCurrentChain(
          ChainObj?.find(
            (item: any) => Number(item?.chainId) === Number(chainId)
          ) || {}
        );
      }
    }
  }, [web3ModalAccount, chainId]);

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
              src={theme === "light" ? logo : logo_dark}
            />
          </LogoContainer>

          <SetBox>
            <Dropdown
              overlay={menu2}
              placement="bottom"
              overlayClassName="LangDropDown ChainDropDown"
              trigger={["click"]}
              arrow={false}
              getPopupContainer={(triggerNode: any) => triggerNode}
            >
              <div className="ChainDropBox  pointer">
                <img src={CurrentChain?.img} alt="" className="chainIcon" />
                <div className="chainName">{CurrentChain?.value}</div>
                <img
                  src={theme === "light" ? dropDownIcon : dropDownIcon_dark}
                  alt=""
                  className="dropDownIcon"
                />
              </div>
            </Dropdown>

            {!!token ? (
              <div
                className="Connect  pointer "
                onClick={() => {
                  // open();
                }}
              >
                {/* <img src={walletIcon} alt="" />{" "} */}
                {AddrHandle(web3ModalAccount as string, 2, 4)}{" "}
              </div>
            ) : (
              <div
                className="Connect  pointer "
                onClick={() => {
                  open();
                }}
              >
                {t("连接钱包")}
              </div>
            )}

            <Dropdown
              overlay={menu3}
              placement="bottom"
              overlayClassName="LangDropDown ChainDropDown"
              trigger={["click"]}
              arrow={false}
              getPopupContainer={(triggerNode: any) => triggerNode}
            >
              <div className="langDrowDrop pointer">
                <img
                  src={theme === "light" ? languageIcon : languageIcon_dark}
                  alt=""
                />
              </div>
            </Dropdown>

            {!!token && (
              <img
                src={theme === "light" ? menu_fill : menu_fill_dark}
                alt=""
                onClick={() => {
                  setShowMask(!showMask);
                }}
                className="menuBox"
              />
            )}
          </SetBox>
        </div>
      </HeaderContainer>

      <MobileSlider isOpen={showMask}>
        <div className="menus">
          <MobileSlider_Menu>
            <div className="logo_box">
              <img
                src={theme === "light" ? slider_logo : slider_logo_dark}
                alt=""
              />
              <div className="switch pointer">
                {theme === "light" ? (
                  <img
                    src={light}
                    alt=""
                    onClick={() => {
                      setTheme(Themes.dark);
                    }}
                  />
                ) : (
                  <img
                    src={dark}
                    alt=""
                    onClick={() => {
                      setTheme(Themes.light);
                    }}
                  />
                )}
              </div>
            </div>
            {headerNavObj?.map((item: any, index: any) => (
              <div
                key={index}
                className={menuActive(item?.pathname)}
                onClick={() => {
                  if (!item?.isSoon) {
                    navigateFun(item?.pathname);
                    setShowMask(false);
                  } else {
                    return addMessage(t("敬请期待"));
                  }
                }}
              >
                <div>
                  <img src={item?.icon} alt="" />
                  {t(item?.name)}
                </div>
                {/* <img src={go_to_icon} alt="" /> */}
              </div>
            ))}
            <div className="about">
              <div className="about_us_title">
                <div>About us</div>{" "}
                <div
                  style={{
                    background: theme === "light" ? "#d9d9d9" : "#222337",
                  }}
                ></div>
              </div>
              <div className="box">
                {communityObj?.map((item: any, indx: any) => (
                  <img
                    src={item?.img}
                    alt=""
                    key={indx}
                    onClick={() => {
                      if (String(item?.link) !== "soon") {
                        window.open(item?.link);
                      } else {
                        return addMessage(t("敬请期待"));
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </MobileSlider_Menu>
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
