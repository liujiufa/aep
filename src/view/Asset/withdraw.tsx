import React, { useEffect, useState } from "react";
import "./withdraw.scss";
import USDT from "../../assets/image/USDT.png";
import AEP from "../../assets/image/AEP.png";
import return_icon from "../../assets/image/return_icon.svg";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { exchequerTradeInfo_swap, swapInfo } from "../../API";
import {
  NumSplic1,
  addMessage,
  formatDecimal,
  getFullNum,
  roundTo,
  showLoding,
} from "../../utils/tool";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu } from "antd";
import { aepAssetInfo, aepDrawWithdraw, aepWithdrawInfo } from "../../API";
import Web3 from "web3";
import { Contracts } from "../../web3";
import { useAppKitAccount } from "@reown/appkit/react";
const App: React.FC = () => {
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [InputAmount, setInputAmount] = useState(0);
  const [AepAssetInfo, setAepAssetInfo] = useState<any>({});
  const [AepWithdrawInfo, setAepWithdrawInfo] = useState<any>({});
  const token = useSelector((state: any) => state?.token);
  const [amount, setAmount] = useState("");
  const [ReceiveAddress, setReceiveAddress] = useState("");
  const [CurrentCoin, setCurrentCoin] = useState<any>({
    icon: USDT,
    name: "USDT",
  });

  const { address: web3ModalAccount } = useAppKitAccount();
  let CoinObj: any = {
    AEP: {
      icon: AEP,
      balance: AepAssetInfo?.amountReceiveAep,
    },
    USDT: {
      icon: USDT,
      balance: AepAssetInfo?.amountReceiveUsdt,
    },
  };

  const menu3 = (
    <Menu
      items={[
        { icon: USDT, name: "USDT" },
        { icon: AEP, name: "AEP" },
      ].map((item: any) => {
        return {
          label: (
            <div
              className={
                String(CurrentCoin?.name) === String(item?.name)
                  ? "CoinItem active"
                  : "CoinItem"
              }
              onClick={() => {
                setInputAmount(0);
                setReceiveAddress("");
                setCurrentCoin(item);
              }}
            >
              <img src={item?.icon} alt="" />
              {item?.name}
            </div>
          ),
          key: item?.name,
        };
      })}
    />
  );

  const inputFun = (num: any) => {
    setInputAmount(
      // NumSplic1(
      roundTo(num * Number(CoinObj[CurrentCoin?.name]?.balance ?? 0), 6)
      //   0
      // )
    );
  };
  const getInitData = () => {
    aepAssetInfo({}).then((res: any) => {
      setAepAssetInfo(res?.data || {});
    });
  };

  const getInitWithdrawData = () => {
    aepWithdrawInfo({
      coinName: CurrentCoin?.name,
    }).then((res: any) => {
      setAepWithdrawInfo(res?.data || {});
    });
  };

  const swapFun = async () => {
    if (!InputAmount || Number(InputAmount) <= 0) return addMessage(t("62"));
    // if (!!InputAmount && Number(InputAmount) < AepWithdrawInfo?.withdrawMin)
    //   return addMessage(t("132", { num: AepWithdrawInfo?.withdrawMin }));
    let tag: boolean = false;
    try {
      const web3 = new Web3();
      tag = await web3.utils.isAddress(ReceiveAddress);
    } catch (e: any) {
      tag = false;
    }
    if (!tag) return addMessage(t("133"));
    showLoding(true);
    aepDrawWithdraw({
      address: ReceiveAddress,
      coinName: CurrentCoin?.name,
      num: InputAmount,
    }).then(async (res: any) => {
      if (res?.code === 200 && !!res?.data?.signStr) {
        let value: any = null;

        try {
          // debugger;
          value = await Contracts.example?.withdrawReward1(
            web3ModalAccount as string,
            res?.data?.signStr
          );
        } catch (error: any) {
          debugger;
          showLoding(false);
          return addMessage(t("failed"));
        }
        if (!!value?.status) {
          setTimeout(() => {
            showLoding(false);
            setInputAmount(0);
            setReceiveAddress("");
            addMessage(t("134"));
            getInitData();
          }, 3000);
          // await callbackFun();
          // let tag = true;
          // RewardReceiveInterval = setInterval(async () => {
          //   let api_data: any = await getIdoAccount();
          //   if (api_data?.data?.amount <= 0 && tag) {
          //     showLoding(false);
          //     tag = false;
          //     clearInterval(RewardReceiveInterval);
          //     getInitDate();
          //     return addMessage(t("领取成功"));
          //   }
          // }, 3000);
        } else if (value?.status === false) {
          showLoding(false);
          addMessage(t("failed"));
        }
      } else {
        showLoding(false);
        addMessage(res.msg);
      }
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    }
  }, [token]);
  useEffect(() => {
    if (!!token) {
      getInitWithdrawData();
    }
  }, [token, CurrentCoin?.name]);
  return (
    <div className="withdraw">
      <div className="return_box">
        <img
          src={return_icon}
          alt=""
          onClick={() => {
            Navigate("/View/asset");
          }}
        />

        <div> {t("42")}</div>

        <span
          className="svgs"
          onClick={() => {
            Navigate("/View/withdrawrecord");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => {
              Navigate("/View/SwapRecord");
            }}
          >
            <path
              d="M19.5 2C20.163 2 20.7989 2.26339 21.2678 2.73223C21.7366 3.20107 22 3.83696 22 4.5V11.6325C22 11.8535 21.9122 12.0654 21.7559 12.2217C21.5996 12.3779 21.3877 12.4657 21.1667 12.4657C20.9457 12.4657 20.7337 12.3779 20.5775 12.2217C20.4212 12.0654 20.3334 11.8535 20.3333 11.6325V8.66667H3.66667V19.5C3.66667 19.9392 4.00625 20.2992 4.43792 20.3308L4.5 20.3333H11.0425C11.2635 20.3334 11.4754 20.4212 11.6317 20.5775C11.7879 20.7337 11.8757 20.9457 11.8757 21.1667C11.8757 21.3877 11.7879 21.5996 11.6317 21.7559C11.4754 21.9122 11.2635 22 11.0425 22H4.5C3.83696 22 3.20107 21.7366 2.73223 21.2678C2.26339 20.7989 2 20.163 2 19.5V4.5C2 3.83696 2.26339 3.20107 2.73223 2.73223C3.20107 2.26339 3.83696 2 4.5 2H19.5ZM17.3783 12.5696C18.0287 12.5696 18.6613 12.7079 19.2429 12.9721C19.3426 13.0173 19.4324 13.0817 19.5072 13.1616C19.5819 13.2415 19.6403 13.3353 19.6788 13.4377C19.7173 13.5402 19.7353 13.6492 19.7316 13.7586C19.728 13.8679 19.7029 13.9755 19.6577 14.0752C19.6125 14.1749 19.5481 14.2647 19.4682 14.3395C19.3883 14.4142 19.2945 14.4726 19.1921 14.5111C19.0896 14.5496 18.9806 14.5675 18.8712 14.5639C18.7618 14.5603 18.6543 14.5352 18.5546 14.49C18.1852 14.3222 17.7841 14.2357 17.3783 14.2362C15.7783 14.2362 14.475 15.5637 14.475 17.2087C14.475 18.8538 15.7788 20.1812 17.3783 20.1812C18.9783 20.1812 20.2817 18.8538 20.2817 17.2087C20.2817 16.9877 20.3695 16.7758 20.5257 16.6195C20.682 16.4632 20.894 16.3754 21.115 16.3754C21.336 16.3754 21.548 16.4632 21.7043 16.6195C21.8605 16.7758 21.9483 16.9877 21.9483 17.2087C21.9483 19.7675 19.9058 21.8479 17.3783 21.8479C14.8512 21.8479 12.8083 19.7675 12.8083 17.2087C12.8083 14.6504 14.8512 12.5696 17.3783 12.5696ZM8.90458 15.3333C9.12558 15.3334 9.3375 15.4212 9.49376 15.5775C9.65001 15.7337 9.73779 15.9457 9.73779 16.1667C9.73779 16.3877 9.65001 16.5996 9.49376 16.7559C9.3375 16.9122 9.12558 17 8.90458 17H6.16667C5.94567 17 5.73375 16.9122 5.57749 16.7559C5.42124 16.5996 5.33346 16.3877 5.33346 16.1667C5.33346 15.9457 5.42124 15.7337 5.57749 15.5775C5.73375 15.4212 5.94567 15.3334 6.16667 15.3333H8.90458ZM12.4167 11.1667C12.6377 11.1667 12.8496 11.2545 13.0059 11.4107C13.1622 11.567 13.25 11.779 13.25 12C13.25 12.221 13.1622 12.433 13.0059 12.5893C12.8496 12.7455 12.6377 12.8333 12.4167 12.8333H6.16667C5.94565 12.8333 5.73369 12.7455 5.57741 12.5893C5.42113 12.433 5.33333 12.221 5.33333 12C5.33333 11.779 5.42113 11.567 5.57741 11.4107C5.73369 11.2545 5.94565 11.1667 6.16667 11.1667H12.4167ZM19.5 3.66667H4.5C4.27899 3.66667 4.06702 3.75446 3.91074 3.91074C3.75446 4.06702 3.66667 4.27899 3.66667 4.5V7H20.3333V4.5C20.3334 4.28969 20.2539 4.08714 20.1109 3.93297C19.9678 3.7788 19.7718 3.68442 19.5621 3.66875L19.5 3.66667Z"
              fill="#73777B"
            />
          </svg>
        </span>
      </div>

      <div className="withdraw_content">
        <div className="coins">
          {t("59")}
          <Dropdown
            overlay={menu3}
            placement="bottom"
            overlayClassName="CoinDropDown"
            trigger={["click"]}
            arrow={false}
            getPopupContainer={(triggerNode: any) => triggerNode}
          >
            <div className="current_coin">
              <img src={CurrentCoin?.icon} alt="" />
              {CurrentCoin?.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.62939 13.0959C9.54166 13.0964 9.45468 13.0796 9.37346 13.0464C9.29223 13.0132 9.21835 12.9643 9.15606 12.9025L4.19606 7.94253C4.1339 7.88037 4.08459 7.80658 4.05095 7.72537C4.01731 7.64415 4 7.55711 4 7.4692C4 7.38129 4.01731 7.29425 4.05095 7.21303C4.08459 7.13182 4.1339 7.05802 4.19606 6.99587C4.25822 6.93371 4.33201 6.8844 4.41323 6.85076C4.49444 6.81712 4.58149 6.7998 4.66939 6.7998C4.7573 6.7998 4.84435 6.81712 4.92556 6.85076C5.00678 6.8844 5.08057 6.93371 5.14273 6.99587L10.1027 11.9559C10.1652 12.0178 10.2148 12.0916 10.2487 12.1728C10.2825 12.2541 10.2999 12.3412 10.2999 12.4292C10.2999 12.5172 10.2825 12.6043 10.2487 12.6856C10.2148 12.7668 10.1652 12.8406 10.1027 12.9025C10.0404 12.9643 9.96656 13.0132 9.88533 13.0464C9.80411 13.0796 9.71713 13.0964 9.62939 13.0959Z"
                  fill="black"
                />
                <path
                  d="M9.76917 13.2355C9.68143 13.236 9.59445 13.2192 9.51323 13.186C9.432 13.1529 9.35813 13.104 9.29583 13.0422C9.23335 12.9802 9.18375 12.9065 9.1499 12.8252C9.11606 12.744 9.09863 12.6569 9.09863 12.5688C9.09863 12.4808 9.11606 12.3937 9.1499 12.3125C9.18375 12.2312 9.23335 12.1575 9.29583 12.0955L14.2492 7.13551C14.3747 7.00998 14.545 6.93945 14.7225 6.93945C14.9 6.93945 15.0703 7.00998 15.1958 7.13551C15.3214 7.26105 15.3919 7.43131 15.3919 7.60885C15.3919 7.78638 15.3214 7.95665 15.1958 8.08218L10.2492 13.0422C10.1861 13.1048 10.1111 13.1541 10.0287 13.1873C9.94626 13.2205 9.85802 13.2369 9.76917 13.2355Z"
                  fill="black"
                />
              </svg>
            </div>
          </Dropdown>
        </div>

        <div className="withdraw_box">
          <div className="pay_box  box  bg-[#242424]">
            <div className="top">
              {t("60")}{" "}
              <div>
                {t("61")}:
                {NumSplic1(CoinObj[CurrentCoin?.name]?.balance, 4) ?? 0}
              </div>
            </div>
            <div className="mid">
              <input
                type="text"
                placeholder={t("62", {
                  num: AepWithdrawInfo?.withdrawMin,
                  name: CurrentCoin?.name,
                })}
                value={
                  !!InputAmount && Number(InputAmount) > 0 ? InputAmount : ""
                }
                onChange={(e: any) => {
                  let value = e.target.value
                    ?.replace(/[+-]/g, "")
                    ?.replace(/[^0-9.]/g, "");
                  setInputAmount(value);
                }}
              />{" "}
              <div>
                <img src={CurrentCoin?.icon} alt="" /> {CurrentCoin?.name}
              </div>
            </div>
            <div className="bottom">
              <div
                onClick={() => {
                  inputFun(0.25);
                }}
                className={
                  CoinObj[CurrentCoin?.name]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(
                        0.25 * Number(CoinObj[CurrentCoin?.name]?.balance ?? 0),
                        6
                      ),
                      0
                    )
                    ? "item active"
                    : "item"
                }
              >
                25%
              </div>
              <div
                onClick={() => {
                  inputFun(0.5);
                }}
                className={
                  CoinObj[CurrentCoin?.name]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(
                        0.5 * Number(CoinObj[CurrentCoin?.name]?.balance ?? 0),
                        6
                      ),
                      0
                    )
                    ? "item active "
                    : "item"
                }
              >
                50%
              </div>
              <div
                onClick={() => {
                  inputFun(0.75);
                }}
                className={
                  CoinObj[CurrentCoin?.name]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(
                        0.75 * Number(CoinObj[CurrentCoin?.name]?.balance ?? 0),
                        6
                      ),
                      0
                    )
                    ? "item active "
                    : "item"
                }
              >
                75%
              </div>
              <div
                onClick={() => {
                  inputFun(1);
                }}
                className={
                  CoinObj[CurrentCoin?.name]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(
                        1 * Number(CoinObj[CurrentCoin?.name]?.balance ?? 0),
                        6
                      ),
                      0
                    )
                    ? "item active "
                    : "item"
                }
              >
                100%
              </div>
            </div>
          </div>
        </div>

        <div className="receive_box box">
          <div className="top">{t("63")} </div>
          <div className="mid">
            <input
              type="text"
              placeholder={t("64")}
              value={!!ReceiveAddress ? ReceiveAddress : ""}
              onChange={(e: any) => {
                let value: any = e.target.value.trim();
                setReceiveAddress(value);
              }}
            />{" "}
          </div>
        </div>

        <div className="infos">
          <div className="info">
            {t("65")}{" "}
            {String(CurrentCoin?.name) === "AEP" ? (
              <div>
                {AepWithdrawInfo?.withdrawMin} {CurrentCoin?.name} (≈
                {AepWithdrawInfo?.withdrawMinPriceUsdt} USDT)
              </div>
            ) : (
              <div>
                {AepWithdrawInfo?.withdrawMin} {CurrentCoin?.name}
              </div>
            )}
          </div>
          <div className="info">
            {t("66")}{" "}
            <div>{NumSplic1(roundTo(AepWithdrawInfo?.fee * 100, 4), 2)}%</div>
          </div>
          <div className="info">
            {t("67")}{" "}
            <div>
              {NumSplic1(
                roundTo(Number(InputAmount) * (1 - AepWithdrawInfo?.fee), 4),
                4
              )}{" "}
              {CurrentCoin?.name}
            </div>
          </div>
        </div>

        <div
          className={
            Number(CoinObj[CurrentCoin?.name]?.balance ?? 0) >=
              Number(InputAmount) &&
            !!InputAmount &&
            Number(InputAmount) >= AepWithdrawInfo?.withdrawMin
              ? "btn"
              : "btn btn_no_work"
          }
          onClick={() => {
            if (
              Number(CoinObj[CurrentCoin?.name]?.balance ?? 0) >=
                Number(InputAmount) &&
              !!InputAmount &&
              Number(InputAmount) >= AepWithdrawInfo?.withdrawMin
            ) {
              swapFun();
            }
          }}
        >
          {Number(InputAmount) >= AepWithdrawInfo?.withdrawMin
            ? Number(CoinObj[CurrentCoin?.name]?.balance ?? 0) >=
              Number(InputAmount)
              ? t("68")
              : t("Insufficient balance")
            : t("69")}
        </div>
      </div>
    </div>
  );
};

export default App;
