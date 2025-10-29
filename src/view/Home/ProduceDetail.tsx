import React, { useState, useEffect, useRef, useContext } from "react";
import "./ProduceDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../store/reducer";
import styled, { keyframes } from "styled-components";
import { useViewport } from "../../components/viewportContext";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ContainerBox,
  FlexBox,
  FlexCCBox,
  FlexSASBox,
  FlexSBCBox,
} from "../../components/FlexBox";
import return_icon from "../../assets/image/return_icon.svg";
import USDT from "../../assets/image/USDT.png";
import product_img from "../../assets/image/Home/product.png";
import product_demo from "../../assets/image/Home/product_demo.png";
import Web3 from "web3";
import { contractAddress } from "../../config";
import { Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
// import { getNftAwardRecord } from "../../API";
import { AddrHandle, addMessage, dateFormat } from "../../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../../components/NoData";
import ThemeContext from "../../components/ThemeContext";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import BuyModal from "./components/BuyModal";
import BuySuccessModal from "./components/BuySuccessModal";
import AddressModal from "./components/AddressModal";
import { aepPayInfo } from "../../API";
const HomeContainer = styled.div`
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100vh;
  /* padding-bottom: 3.67rem; */
`;
const ReturnBox = styled(FlexSBCBox)`
  padding: 1rem 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  background: transparent;
  div {
    flex: 1;
    color: var(--primary-card-font-color);
    text-align: center;
    font-family: "Inter";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 100% */
  }
  img {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
  .search_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    margin-left: 1.17rem;
    color: #000;
    font-family: "Inter";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.33333rem; /* 133.333% */
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 1.33rem;
      width: 100%;
      border-radius: 1.33333rem;
      background: #f9fafc;
      padding: 0.83rem 1.33rem;
      input {
        margin-left: 0.67rem;
        flex: 1;
        border: none;
        background: transparent;
        outline: none;
        color: #000;
        font-family: "Inter";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.33333rem; /* 133.333% */
        &::placeholder {
          color: #000;
          font-family: "Inter";
          font-size: 1rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.33333rem; /* 133.333% */
          opacity: 0.6;
        }
      }
    }
  }
  .null {
    flex: auto;
    max-width: 32px;
  }
`;

export default function Rank() {
  const web3 = new Web3();
  const divRef = useRef(null);
  const scrollPosition = useScrollPosition(divRef);
  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { token } = useSelector<stateType, stateType>((state) => state);
  const [Tip, setTip] = useState("");
  const [BuyModalState, setBuyModalState] = useState(false);
  const [AddressModalState, setAddressModalState] = useState(false);
  const [BuySuccessModalState, setBuySuccessModalState] = useState(false);
  const [InputAddress, setInputAddress] = useState<any>(null);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [AepPayInfo, setAepPayInfo] = useState<any>({});
  const location = useLocation();
  const id = location?.state?.id;
  const amount = location?.state?.amount;
  const outAmount = location?.state?.outAmount;
  const img = location?.state?.img;
  const banner = location?.state?.banner;
  const produce_name = location?.state?.produce_name;
  const getContainerClassName = () => {
    if (scrollPosition > 0) {
      return "product_produce scrolled-deep";
    } else {
      return "product_produce";
    }
  };
  const getInitData = () => {
    if (!id) return;
    aepPayInfo({
      id: id,
    }).then((res: any) => {
      setAepPayInfo(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [token, id]);

  return (
    <HomeContainer className={getContainerClassName()} ref={divRef}>
      <ReturnBox>
        <img
          src={return_icon}
          alt=""
          onClick={() => {
            Navigate(-1);
          }}
        />

        <div> {t("86")}</div>

        <div className="null"></div>
      </ReturnBox>

      <div className="product_top">
        <img src={img} alt="" />
        {!(scrollPosition > 0) ? (
          <div className="right_box">
            <div className="value">{t(produce_name)}</div>
            {Number(id) === 2 ? (
              <div className="price">
                <img src={USDT} alt="" />
                {amount}U / 5 {t("163")}
              </div>
            ) : (
              <div className="price">
                <img src={USDT} alt="" />
                {amount}U / {t("163")}
              </div>
            )}
            <div
              className="btn"
              onClick={() => {
                setBuyModalState(true);
              }}
            >
              {t("87")}
            </div>
          </div>
        ) : (
          <>
            <div className="right_box">
              <div className="value">{t(produce_name)}</div>
              {Number(id) === 2 ? (
                <div className="price">
                  <img src={USDT} alt="" />
                  {amount}U/5{t("163")}
                </div>
              ) : (
                <div className="price">
                  <img src={USDT} alt="" />
                  {amount}U / {t("163")}
                </div>
              )}
            </div>
            <div
              className="btn"
              onClick={() => {
                setBuyModalState(true);
              }}
            >
              {t("87")}
            </div>
          </>
        )}
      </div>

      <div className="devider">
        <div className="title">{t("88")}</div>
      </div>

      <div className="product_bottom">
        <img src={banner} alt="" />
      </div>

      <BuyModal
        // fun={getInitDate}
        data={{ ...AepPayInfo, id: id }}
        addaddressfun={() => {
          setBuyModalState(false);
          setAddressModalState(true);
        }}
        getInitData={() => {
          getInitData();
        }}
        showSuccessModal={() => {
          setBuySuccessModalState(true);
        }}
        ShowTipModal={BuyModalState}
        close={() => {
          setBuyModalState(false);
        }}
      />
      <AddressModal
        data={{ ...AepPayInfo, id: id }}
        getInitData={() => {
          getInitData();
        }}
        showBuyModal={() => {
          setBuyModalState(true);
        }}
        ShowTipModal={AddressModalState}
        close={() => {
          setAddressModalState(false);
        }}
      />
      <BuySuccessModal
        // fun={getInitDate}
        ShowTipModal={BuySuccessModalState}
        close={() => {
          setBuySuccessModalState(false);
        }}
      />
    </HomeContainer>
  );
}
