import React, { useEffect, useState } from "react";
import HeaderBox from "../../components/HeaderBox";
import { Carousel, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
  useDisconnect,
} from "@reown/appkit/react";
import { Contracts } from "../../web3";
import Web3 from "web3";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../../utils/tool";
import { useDispatch, useSelector } from "react-redux";
import { aepAssetInfo, getUserInfo } from "../../API";
import { contractAddress } from "../../config";
import { createLoginSuccessAction } from "../../store/actions";
import { useSign } from "../../hooks/useSign";
import { useTranslation } from "react-i18next";

import PageLoding from "../../components/PageLoding";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { useNoGas } from "../../hooks/useNoGas";
import FooterBox from "../../components/FooterBox";
import "./index.scss";
import banner from "../../assets/image/Asset/banner.png";
import title_logo from "../../assets/image/title_logo.png";
import SAEP from "../../assets/image/SAEP.png";
import AEP from "../../assets/image/AEP.png";
import USDT from "../../assets/image/USDT.png";
import item1 from "../../assets/image/Asset/item1.png";
import item2 from "../../assets/image/Asset/item2.png";
import item3 from "../../assets/image/Asset/item3.png";
import item4 from "../../assets/image/Asset/item4.png";
const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const { walletProvider } = useAppKitProvider("eip155");
  const Navigate = useNavigate();
  const [BuyModalState, setBuyModalState] = useState(false);
  const [AepAssetInfo, setAepAssetInfo] = useState<any>({});
  const [Balance, setBalance] = useState<any>({
    USDTBalance: "0",
    AEPBalance: "0",
  });
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();

  const getInitDate = () => {
    aepAssetInfo({}).then((res: any) => {
      setAepAssetInfo(res?.data || {});
    });
  };
  const getTokenBalance = async () => {
    new Contracts(walletProvider);
    const [resUsdt, resAep] = await Promise.all([
      Contracts.example?.balanceOf(
        web3ModalAccount as string,
        contractAddress.USDT
      ),
      Contracts.example?.balanceOf(
        web3ModalAccount as string,
        contractAddress.AEP
      ),
    ]);
    setBalance({
      USDTBalance: Web3.utils.fromWei(resUsdt?.toString() || "0", "ether"),
      AEPBalance: Web3.utils.fromWei(resAep?.toString() || "0", "ether"),
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitDate();
    } else {
    }
  }, [token]);
  useEffect(() => {
    setAepAssetInfo({});
  }, [isConnected]);

  useEffect(() => {
    if (!!web3ModalAccount) {
      getTokenBalance();
    }
  }, [web3ModalAccount]);

  return (
    <div className="asset all_page_conttainer">
      <HeaderBox></HeaderBox>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="star3"
      >
        <path
          d="M8 0L8.48335 3.27248C8.80766 5.46818 10.5318 7.19234 12.7275 7.51665L16 8L12.7275 8.48335C10.5318 8.80766 8.80766 10.5318 8.48335 12.7275L8 16L7.51665 12.7275C7.19234 10.5318 5.46818 8.80766 3.27247 8.48335L0 8L3.27248 7.51665C5.46818 7.19234 7.19234 5.46818 7.51665 3.27247L8 0Z"
          fill="black"
          fill-opacity="0.31"
        />
      </svg>
      <div className="asset_content">
        <div className="asset_title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="star1"
          >
            <path
              d="M7 0L7.35466 2.40117C7.67897 4.59687 9.40313 6.32103 11.5988 6.64534L14 7L11.5988 7.35466C9.40313 7.67897 7.67897 9.40313 7.35466 11.5988L7 14L6.64534 11.5988C6.32103 9.40313 4.59687 7.67897 2.40117 7.35466L0 7L2.40117 6.64534C4.59687 6.32103 6.32103 4.59687 6.64534 2.40117L7 0Z"
              fill="black"
              fill-opacity="0.31"
            />
          </svg>
          <div className="asset_title1">
            <img src={title_logo} alt="" />
            <div>{t("49")}</div>
            <img src={title_logo} alt="" />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="star2"
          >
            <path
              d="M5 0L5.09727 0.658553C5.42158 2.85426 7.14574 4.57842 9.34144 4.90273L10 5L9.34144 5.09727C7.14574 5.42158 5.42158 7.14574 5.09727 9.34144L5 10L4.90273 9.34144C4.57842 7.14574 2.85426 5.42158 0.658553 5.09727L0 5L0.658553 4.90273C2.85426 4.57842 4.57842 2.85426 4.90273 0.658554L5 0Z"
              fill="black"
              fill-opacity="0.31"
            />
          </svg>
        </div>

        <div className="account_box">
          <div className="title">{t("50")}</div>
          <div className="devider"></div>
          <div className="all_asset">
            <div className="all_asset_value">
              {t("51")}
              <div>${NumSplic1(AepAssetInfo?.assetPrice, 4) ?? 0}</div>
            </div>
            <img src={banner} alt="" />
          </div>
          <div className="devider"></div>
          <div className="coins">
            <div className="coin_item">
              SAEP
              <div>
                <img src={SAEP} alt="" />
                {NumSplic1(AepAssetInfo?.amountReceiveSaep, 4) ?? 0}
              </div>
            </div>
            <div className="coin_item">
              USDT
              <div>
                <img src={USDT} alt="" />
                {NumSplic1(AepAssetInfo?.amountReceiveUsdt, 4) ?? 0}
              </div>
            </div>
            <div className="coin_item">
              AEP
              <div>
                <img src={AEP} alt="" />
                {NumSplic1(AepAssetInfo?.amountReceiveAep, 4) ?? 0}
              </div>
            </div>
            <div className="btns">
              <div
                className="btn btn1 pointer"
                onClick={() => {
                  Navigate("/View/exchange");
                }}
              >
                {t("52")}
              </div>
              <div
                className="btn btn2 pointer"
                onClick={() => {
                  Navigate("/View/withdraw");
                }}
              >
                {t("53")}
              </div>
            </div>
          </div>
        </div>
        <div className="wallet_asset_box">
          <div className="title">{t("54")}</div>
          <div className="devider"></div>
          <div className="items">
            <div className="item">
              USDT
              <div className="item_bottom">
                <img src={USDT} alt="" />
                {NumSplic1(Balance?.USDTBalance ?? 0, 4)}
              </div>
            </div>
            <div className="item_devider"></div>
            <div className="item">
              AEP
              <div className="item_bottom">
                <img src={AEP} alt="" />
                {NumSplic1(Balance?.AEPBalance ?? 0, 4)}
              </div>
            </div>
          </div>
        </div>

        <div className="end_items">
          {[
            {
              name: "55",
              img: item1,
              color: "#05FCE9",
              background:
                "linear-gradient(122deg, rgba(5, 252, 233, 0.00) 54.89%, rgba(5, 252, 233, 0.40) 100%), rgba(5, 252, 233, 0.05)",
            },
            {
              name: "56",
              img: item2,
              color: "#52B7FF",
              background:
                "linear-gradient(122deg, rgba(82, 183, 255, 0.00) 54.89%, rgba(82, 183, 255, 0.40) 100%), rgba(82, 183, 255, 0.05)",
            },
            {
              name: "57",
              img: item3,
              color: "#00D558",
              background:
                "linear-gradient(122deg, rgba(0, 255, 56, 0.00) 54.89%, rgba(0, 255, 56, 0.40) 100%), rgba(0, 255, 56, 0.05)",
            },
            {
              name: "58",
              img: item4,
              color: "#FFAE00",
              background:
                "linear-gradient(122deg, rgba(255, 174, 0, 0.00) 54.89%, rgba(255, 174, 0, 0.40) 100%), rgba(255, 174, 0, 0.05)",
            },
          ]?.map((item: any, index: any) => (
            <div
              className="item pointer"
              key={index}
              onClick={() => {
                return addMessage(t("Coming soon"));
              }}
              style={{ background: item?.background }}
            >
              <div className="item_left" style={{ color: item?.color }}>
                {t(item?.name)}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 0C12.4182 0 16 3.58177 16 8C16 12.4182 12.4182 16 8 16C3.58177 16 0 12.4182 0 8C4.76845e-08 3.58177 3.58177 4.76827e-08 8 0ZM8 1.33301C4.3235 1.33301 1.33301 4.3235 1.33301 8C1.33301 11.6765 4.3235 14.667 8 14.667C11.6765 14.667 14.667 11.6765 14.667 8C14.667 4.3235 11.6765 1.33301 8 1.33301ZM6.11621 4.7002C6.37539 4.43945 6.79772 4.43932 7.05859 4.7002L9.88379 7.53125C10.1447 7.79041 10.1447 8.21269 9.88379 8.47363L7.05664 11.3008C6.79748 11.5617 6.37521 11.5617 6.11426 11.3008C5.85359 11.0398 5.85347 10.6183 6.11426 10.3574L8.47168 8L6.11621 5.64453C5.85526 5.38358 5.85526 4.96114 6.11621 4.7002Z"
                    fill="black"
                    fill-opacity="0.1"
                  />
                </svg>
              </div>
              <img src={item?.img} alt="" />
            </div>
          ))}
        </div>
      </div>
      <FooterBox></FooterBox>
    </div>
  );
};

export default Home;
