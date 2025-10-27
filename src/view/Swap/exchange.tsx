import React, { useEffect, useState } from "react";
import "./exchange.scss";
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
import { aepSwap, aepSwapInfoSwap } from "../../API";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { contractAddress } from "../../config";
const App: React.FC = () => {
  const token = useSelector((state: any) => state?.token);
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [InputAmount, setInputAmount] = useState(0);
  const [SwapInfo, setSwapInfo] = useState<any>({});
  const [receiveAmount, setReceiveAmount] = useState("");
  const [FromCoin, setFromCoin] = useState("AEP");
  const [ToCoin, setToCoin] = useState("USDT");
  const {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress?.Market, contractAddress[FromCoin]);

  let CoinObj: any = {
    AEP: {
      icon: AEP,
      balance: SwapInfo?.amountReceiveAEP,
      price: SwapInfo?.price,
    },
    USDT: {
      icon: USDT,
      balance: SwapInfo?.amountReceiveUSDT,
      price: 1 / SwapInfo?.price,
    },
  };

  const inputFun = (num: any) => {
    setInputAmount(
      NumSplic1(roundTo(num * Number(CoinObj[FromCoin]?.balance ?? 0), 6), 0)
    );
    if (!!SwapInfo?.price) {
      setReceiveAmount(
        NumSplic1(
          roundTo(
            Number(num * Number(CoinObj[FromCoin]?.balance ?? 0)) *
              Number(CoinObj[FromCoin]?.price),
            6
          ),
          6
        )
      );
    } else {
      setReceiveAmount("");
    }
  };
  const getInitData = () => {
    aepSwapInfoSwap({ swapCoinName: FromCoin }).then((res: any) => {
      setSwapInfo(res?.data || {});
    });
  };
  const swapFun = async () => {
    if (!InputAmount || Number(InputAmount) <= 0) return addMessage(t("129"));
    // if (!!InputAmount && Number(InputAmount) < 100)
    //   return addMessage(t("119", { num: 100 }));
    let res: any;
    showLoding(true);

    try {
      res = await aepSwap({
        swapCoinName: FromCoin,
        swapNum: InputAmount,
      });
    } catch (error: any) {
      showLoding(false);
      return addMessage(t("131"));
    }
    if (res?.code === 200) {
      setTimeout(async () => {
        showLoding(false);
        getInitData();
        setInputAmount(0);
        setReceiveAmount("");
        return addMessage(t("130"));
      }, 2000);
    } else {
      return addMessage(res?.msg);
    }
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    }
  }, [token, FromCoin]);
  return (
    <div className="exchange">
      <div className="return_box">
        <img
          src={return_icon}
          alt=""
          onClick={() => {
            Navigate(-1);
          }}
        />

        <div> {t("116")}</div>

        <span className="svgs">
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

      <div className="exchange_content">
        <div className="exchange_box">
          <div className="pay_box  box  bg-[#242424]">
            <div className="top">
              {t("117")}{" "}
              <div>
                {t("118")}:{NumSplic1(CoinObj[FromCoin]?.balance, 4) ?? 0}
              </div>
            </div>
            <div className="mid">
              <input
                type="text"
                placeholder={t("119", { num: SwapInfo?.swapMinNum ?? 0 })}
                value={
                  !!InputAmount && Number(InputAmount) > 0 ? InputAmount : ""
                }
                onChange={(e: any) => {
                  let value = e.target.value
                    ?.replace(/[+-]/g, "")
                    ?.replace(/[^0-9]/g, "");
                  setInputAmount(value);
                  if (!!SwapInfo?.price) {
                    setReceiveAmount(
                      NumSplic1(
                        roundTo(
                          Number(value) * Number(CoinObj[FromCoin]?.price),
                          6
                        ),
                        6
                      )
                    );
                  } else {
                    setReceiveAmount("");
                  }
                }}
              />{" "}
              <div>
                <img src={CoinObj[FromCoin]?.icon} alt="" /> {FromCoin}
              </div>
            </div>
            <div className="bottom">
              <div
                onClick={() => {
                  inputFun(0.25);
                }}
                className={
                  CoinObj[FromCoin]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(
                        0.25 * Number(CoinObj[FromCoin]?.balance ?? 0),
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
                  CoinObj[FromCoin]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(0.5 * Number(CoinObj[FromCoin]?.balance ?? 0), 6),
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
                  CoinObj[FromCoin]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(
                        0.75 * Number(CoinObj[FromCoin]?.balance ?? 0),
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
                  CoinObj[FromCoin]?.balance > 0 &&
                  InputAmount ===
                    NumSplic1(
                      roundTo(1 * Number(CoinObj[FromCoin]?.balance ?? 0), 6),
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

        <div className="transfer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            onClick={() => {
              setFromCoin(ToCoin);
              setToCoin(FromCoin);
            }}
          >
            <path
              d="M2.00003 16C2.00003 23.732 8.26802 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2C8.26802 2 2 8.26806 2 16L2.00003 16ZM12.2135 23.573C11.7474 23.573 11.5144 23.2235 11.5144 23.2235C11.5144 23.2235 8.60178 18.9127 8.48523 18.7962C8.48523 18.7962 8.36873 18.6796 8.36873 18.4467C8.48523 18.2137 8.60172 18.2137 8.60172 18.2137L10.9319 18.2137L10.9319 14.1359C10.9319 10.6407 14.7766 10.6407 14.7766 10.6407C13.6115 10.6407 13.1455 14.0194 13.1455 14.0194L13.1455 18.2137L15.4756 18.2137C15.4756 18.2137 15.7087 18.2137 15.7087 18.4467C15.8252 18.6796 15.7087 18.9127 15.7087 18.9127L12.796 23.34C12.796 23.34 12.563 23.573 12.2135 23.573L12.2135 23.573ZM20.4855 8.77647C20.4855 8.77647 23.3982 12.9708 23.5147 13.0873C23.5147 13.0873 23.6312 13.2038 23.6312 13.4369C23.5147 13.7864 23.3982 13.7864 23.3982 13.7864L20.835 13.7864L20.835 17.9807C20.835 21.4759 16.9902 21.4759 16.9902 21.4759C18.2719 21.4759 18.7379 18.0972 18.7379 18.0972L18.7379 13.7864L16.4078 13.7864C16.4078 13.7864 16.2913 13.7864 16.2913 13.5533C16.1748 13.3203 16.2913 13.0873 16.2913 13.0873L19.2039 8.66003C19.2039 8.66003 19.437 8.42699 19.7865 8.42699C20.2525 8.42699 20.4855 8.7765 20.4855 8.7765L20.4855 8.77647Z"
              fill="url(#paint0_linear_132_1038)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_132_1038"
                x1="16"
                y1="2"
                x2="16"
                y2="30"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#00D558" />
                <stop offset="0.5" stop-color="#05FCE9" />
                <stop offset="1" stop-color="#0140E7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="receive_box box">
          <div className="top">
            {t("120")}{" "}
            <div>
              {t("121")}:
              {NumSplic1(Number(CoinObj[ToCoin]?.balance ?? 0), 4) ?? 0}
            </div>
          </div>
          <div className="mid">
            <input
              type="text"
              placeholder={t("122")}
              readOnly={true}
              value={
                !!receiveAmount && Number(receiveAmount) > 0
                  ? receiveAmount
                  : ""
              }
            />{" "}
            <div>
              <img src={CoinObj[ToCoin]?.icon} alt="" /> {ToCoin}
            </div>
          </div>
        </div>

        <div className="infos">
          <div className="info">
            {t("123")}{" "}
            <div>
              1 {FromCoin} ≈{" "}
              {formatDecimal(getFullNum(CoinObj[FromCoin]?.price) ?? 0)}{" "}
              {ToCoin}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M3.60352 7.73233H12.3881C12.7217 7.73233 12.9916 7.46195 12.9916 7.12776C12.9916 6.79357 12.7217 6.5232 12.3881 6.5232H5.06873L6.05784 5.53238C6.29422 5.29559 6.29422 4.9127 6.05784 4.67759C5.82146 4.4408 5.43923 4.4408 5.20453 4.67759L3.23973 6.64411C3.09388 6.75495 3 6.9296 3 7.12776C3 7.46195 3.26991 7.73233 3.60352 7.73233ZM12.824 9.44526C12.6815 9.30252 12.4837 9.24542 12.2976 9.27733H3.60352C3.26991 9.27733 3 9.5477 3 9.88189C3 10.2161 3.26991 10.4865 3.60352 10.4865H10.9313L9.95054 11.4689C9.71417 11.7057 9.71417 12.0886 9.95054 12.3237C10.0679 12.4412 10.2221 12.5 10.378 12.5C10.5339 12.5 10.6865 12.4412 10.8055 12.3237L12.824 10.3017C13.0587 10.0649 13.0587 9.68205 12.824 9.44526Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="info">
            {t("124")}{" "}
            <div>
              {SwapInfo?.swapMinNum ?? 0} {FromCoin}
            </div>
          </div>
          <div className="info">
            {t("125")} <div>{SwapInfo?.feeRatio ?? 0}%</div>
          </div>
        </div>

        <div
          className={
            !!InputAmount &&
            Number(InputAmount) >= Number(SwapInfo?.swapMinNum ?? 0) &&
            Number(CoinObj[FromCoin]?.balance ?? 0) >= Number(InputAmount)
              ? "btn"
              : "btn btn_no_work"
          }
          onClick={() => {
            if (
              !!InputAmount &&
              Number(InputAmount) >= Number(SwapInfo?.swapMinNum ?? 0) &&
              Number(CoinObj[FromCoin]?.balance ?? 0) >= Number(InputAmount)
            ) {
              swapFun();
            }
          }}
        >
          {Number(InputAmount ?? 0) >= Number(SwapInfo?.swapMinNum ?? 0)
            ? Number(CoinObj[FromCoin]?.balance ?? 0) >= Number(InputAmount)
              ? t("126")
              : t("Insufficient balance")
            : t("127")}
        </div>
      </div>
    </div>
  );
};

export default App;
