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
import { addMessage, startWord } from "../utils/tool";
import { useSelector, useDispatch } from "react-redux";
import { stateType } from "../store/reducer";
import { Contracts } from "../web3";
import { createLoginSuccessAction, savePriceAction } from "../store/actions";
import BigNumber from "big.js";
import copy from "copy-to-clipboard";

import "../assets/style/layout.scss";
import { isMain, LOCAL_KEY } from "../config";
import { useViewport } from "./viewportContext";
import Web3 from "web3";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSBCBox } from "./FlexBox";
import { useSign } from "../hooks/useSign";
import { useNoGas } from "../hooks/useNoGas";
import home from "../assets/image/Layout/home.png";
import home_active from "../assets/image/Layout/home_active.png";
import node from "../assets/image/Layout/node.png";
import node_active from "../assets/image/Layout/node_active.png";
import blind_box from "../assets/image/Layout/blind_box.png";
import blind_box_active from "../assets/image/Layout/blind_box_active.png";
import person from "../assets/image/Layout/person.png";
import person_active from "../assets/image/Layout/person_active.png";
import { bscTestnet, bsc, mainnet, holesky } from "@reown/appkit/networks";
import ThemeContext, { Themes } from "./ThemeContext";
const { Header, Content } = Layout;

let refereeUserAddress: any;

const FooterContainer = styled(Header)`
  margin: 0px auto;
  backdrop-filter: blur(10px);
  padding: 0;
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100%;
  max-width: 450px;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background: #101936;
  box-shadow: 0 -6px 17px 0 rgba(0, 0, 0, 0.08),
    0 4px 17px 0 rgba(0, 0, 0, 0.08);
  .navs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.83rem 1.5rem 1.08rem;
    .nav_item {
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        width: 2rem;
        height: 2rem;
        aspect-ratio: 1/1;
      }
      div {
        margin-top: 0.33rem;
        color: #7685bc;
        font-family: "Clash Display";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem; /* 100% */
      }
    }
    .nav_item_active {
      div {
        color: #fff;
        font-family: "Clash Display";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1rem; /* 100% */
      }
    }
  }
`;

const MyLayout = styled.div``;

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

  const { signFun } = useSign();
  const { isNoGasFun } = useNoGas();
  const location = useLocation();
  const pathname = startWord(location.pathname);

  // 导航
  const navigateFun = (path: string) => {
    Navigate("/View" + path);
  };

  useEffect(() => {
    if (!!pathname) {
      setItemActive(pathname ?? "/");
    }
  }, [pathname]);

  return (
    <FooterContainer>
      <div className="navs">
        {[
          { path: "/", img: home, active_img: home_active, name: "首页" },
          { path: "/node", img: node, active_img: node_active, name: "节点池" },
          {
            path: "/blind_box",
            img: blind_box,
            active_img: blind_box_active,
            name: "购买",
          },
          {
            path: "/person",
            img: person,
            active_img: person_active,
            name: "个人中心",
          },
        ]?.map((item: any, index: any) => (
          <div
            key={index}
            className={
              ItemActive === item?.path
                ? "nav_item nav_item_active"
                : "nav_item"
            }
            onClick={() => {
              // if (item?.path === "/blind_box") {
              //   return addMessage(t("敬请期待"));
              // } else {
              navigateFun(item?.path);
              // }
            }}
          >
            <img
              src={ItemActive === item?.path ? item?.active_img : item?.img}
              alt=""
            />
            <div>{t(item?.name)}</div>
          </div>
        ))}
      </div>
    </FooterContainer>
  );
};
export default MainLayout;
