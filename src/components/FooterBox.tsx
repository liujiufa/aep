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

import item1 from "../assets/image/Layout/item1.png";
import item1_active from "../assets/image/Layout/item1_active.png";
import item2 from "../assets/image/Layout/item2.png";
import item2_active from "../assets/image/Layout/item2_active.png";
import item3 from "../assets/image/Layout/item3.png";
import item3_active from "../assets/image/Layout/item3_active.png";
import item4 from "../assets/image/Layout/item4.png";
import item4_active from "../assets/image/Layout/item4_active.png";
import item5 from "../assets/image/Layout/item5.png";
import item5_active from "../assets/image/Layout/item5_active.png";

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
  border-radius: 3.33333rem;
  border: 2px solid #fff;
  background: #f3f7fc;
  backdrop-filter: blur(2px);
  padding: 1.67rem 2.5rem 1.17rem;
  .navs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav_item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 4.33333rem;
      height: 4.33333rem;
      img {
        width: 1.66667rem;
        height: 1.66667rem;
      }
    }
    .nav_item_active {
      img {
        width: 4.33333rem;
        height: 4.33333rem;
        flex-shrink: 0;
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
          { path: "/", img: item1, active_img: item1_active },
          {
            path: "/invite",
            img: item2,
            active_img: item2_active,
          },
          {
            path: "/swap",
            img: item3,
            active_img: item3_active,
          },
          {
            path: "/earn",
            img: item4,
            active_img: item4_active,
          },
          {
            path: "/asset",
            img: item5,
            active_img: item5_active,
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
              //   return addMessage(t("Coming soon"));
              // } else {
              navigateFun(item?.path);
              // }
            }}
          >
            <img
              src={ItemActive === item?.path ? item?.active_img : item?.img}
              alt=""
            />
            {/* <div>{t(item?.name)}</div> */}
          </div>
        ))}
      </div>
    </FooterContainer>
  );
};
export default MainLayout;
