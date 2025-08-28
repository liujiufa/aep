import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../../store/reducer";
import styled, { keyframes } from "styled-components";
import { useViewport } from "../../components/viewportContext";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { Dropdown, Flex, Menu, Pagination, Tooltip } from "antd";
import { Modal, PaginationProps } from "antd";
import { getPledgeData, getUserInfo } from "../../API";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  formatDecimal,
  getFullNum,
  roundTo,
  showLoding,
} from "../../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../../components/NoData";
import return_img from "../../assets/image/return.svg";
import dropdown_logo from "../../assets/image/dropdown_logo.svg";
import info_logo from "../../assets/image/info_logo.svg";
import go_to from "../../assets/image/go_to.svg";
import coin_logo from "../../assets/image/coin_logo.png";
import "./index.scss";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { contractAddress } from "../../config";
import { useNoGas } from "../../hooks/useNoGas";
import { Contracts } from "../../web3";
import { useGetReward } from "../../hooks/useGetReward";

let intervalStakeReward: any = null;
export default function Rank() {
  const web3 = new Web3();

  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { token } = useSelector<stateType, stateType>((state) => state);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [UserInfo, setUserInfo] = useState<any>({});
  const [PledgeData, setPledgeData] = useState<any>({});
  const [StakeTime, setStakeTime] = useState(45);
  const [InputAmout, setInputAmout] = useState("");
  // const { state: stateObj } = useLocation();
  const {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress?.Stake, contractAddress?.T_SToken);
  const { getReward } = useGetReward();
  const { isNoGasFun } = useNoGas();

  const getInitData = () => {
    getUserInfo().then((res: any) => {
      setUserInfo(res?.data || {});
    });
  };

  const getIntervalData = () => {
    clearInterval(intervalStakeReward);
    intervalStakeReward = setInterval(() => {
      getPledgeData().then((res: any) => {
        setPledgeData(res?.data || {});
      });
    }, 3000);
  };

  const StakeFun = async (price: any) => {
    // return addMessage(t("Coming soon"));
    handleTransaction(
      Number(price ?? 0) + "",
      async (call: any) => {
        let abi_res: any = null;
        try {
          showLoding(true);
          if (!!(await isNoGasFun())) return showLoding(false);
          abi_res = await Contracts.example?.stake(
            web3ModalAccount as string,
            InputAmout,
            StakeTime
          );
        } catch (error: any) {
          // if (error?.code === 4001) {
          showLoding(false);
          return addMessage(t("failed"));
          // }
        }
        if (!!abi_res?.status) {
          await call();
          setTimeout(() => {
            showLoding(false);
            getInitData();
            setInputAmout("");
            return addMessage(t("质押成功"));
          }, 5000);
        } else if (abi_res?.status === false) {
          showLoding(false);
          return addMessage(t("failed"));
        }
      },
      () => {
        showLoding(true);
      },
      () => {
        showLoding(false);
      }
    );
  };

  const withdrawFun = async () => {
    if (web3ModalAccount) {
      getReward(
        () => {
          setTimeout(() => {
            showLoding(false);
            return addMessage(t("领取成功"));
          }, 3100);
        },
        contractAddress?.RewardDistribute,
        { type: 1 },
        () => {
          showLoding(true);
        },
        () => {
          showLoding(false);
        }
      );
    }
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [token]);
  useEffect(() => {
    if (!!token) {
      getPledgeData().then((res: any) => {
        setPledgeData(res?.data || {});
      });
      getIntervalData();
    } else {
    }
  }, [token]);

  useEffect(() => {
    return () => {
      clearInterval(intervalStakeReward);
    };
  }, []);

  return (
    <div className="stake_page">
      <div className="stake_title">
        <img
          src={return_img}
          onClick={() => {
            Navigate(-1);
          }}
        />
        <div> {t("Stake")}</div>
        <div className="null"></div>
      </div>
      <div className="stake_content">
        <div className="stake_box">
          <div className="stake_box_title">{t("Stake")}</div>
          <div className="stake_box_item">
            {t("User Address")} :
            <div className="value">
              {!!UserInfo?.address ? AddrHandle(UserInfo?.address, 5, 4) : "-"}
            </div>
          </div>
          <div className="stake_box_item">
            {t("User Identity")} :
            <div className="value">
              {!!UserInfo?.isNode ? t("节点用户") : t("普通用户")}
            </div>
          </div>
          <div className="stake_box_item">
            {t("Staking Time")} :
            <Dropdown
              overlay={
                <Menu
                  items={[
                    ...[
                      { value: 45, key: 45 },
                      { value: 90, key: 90 },
                      { value: 180, key: 180 },
                    ].map((item: any) => {
                      return {
                        label: (
                          <span
                            className={
                              StakeTime === item?.value ? "item active" : "item"
                            }
                            onClick={() => {
                              setStakeTime(item?.value);
                            }}
                          >
                            {item?.value}
                          </span>
                        ),
                        key: item?.key,
                      };
                    }),
                  ]}
                />
              }
              placement="bottom"
              overlayClassName="StakeTimeDropDown"
              trigger={["click"]}
              arrow={false}
              getPopupContainer={(triggerNode: any) => triggerNode}
            >
              <div className="dropdown">
                <div className="value">{StakeTime}</div>{" "}
                <img src={dropdown_logo} alt="" />
              </div>
            </Dropdown>
          </div>
          <div className="stake_box_amount">
            {t("Staked Amount")}：
            <input
              type="text"
              placeholder={
                t("Please Enter Amount") + ` ( ${t("最小1")} ` + "Token )"
              }
              value={!!InputAmout ? InputAmout : ""}
              onChange={(e: any) => {
                let value: any = e.target.value
                  ?.replace(/[+-]/g, "")
                  .replace(/[^0-9.]/g, "");
                setInputAmout(value);
              }}
            />
            <div className="balance">
              {t("Available Token Amount")}：{TOKENBalance ?? 0} Token
            </div>
          </div>
          {!UserInfo?.mountNodeAddress && (
            <div className="tip" style={{ opacity: 1 }}>
              *{t("Please finish mounting before staking.")}
            </div>
          )}
          <div
            className="stake_btn"
            onClick={() => {
              if (!!UserInfo?.mountNodeAddress && InputAmout) {
                if (Number(InputAmout) >= 1) {
                  StakeFun(InputAmout);
                } else {
                  return addMessage(t("质押最小 1 Token"));
                }
              }
            }}
            style={{ opacity: !!UserInfo?.mountNodeAddress ? 1 : 0.5 }}
          >
            {t("Stake")}
          </div>
        </div>
        <div className="reword_box">
          <div className="reword_box_title">{t("Staked Data")} (Token)</div>
          <div className="reword_box_content">
            <div className="reword_box_item">
              <div className="reword_box_item_left">
                {t("Total staked Amount")}
                <Tooltip
                  title={
                    <div className="tip">
                      {t("Total amount of Token staked in all statuses")}
                    </div>
                  }
                  trigger={["click", "hover"]}
                  showArrow={false}
                  getPopupContainer={(triggerNode) => triggerNode}
                >
                  <div style={{ cursor: "pointer" }}>
                    <img src={info_logo} alt="" />
                  </div>
                </Tooltip>
              </div>
              <div className="reword_box_item_right">
                <img src={coin_logo} alt="" />
                {/* {NumSplic1(PledgeData?.pledgeNum, 4) ?? 0} */}

                <div>
                  {" "}
                  {formatDecimal(
                    getFullNum(PledgeData?.pledgeNum) ?? 0
                  ).indexOf(".") > 0 ? (
                    <>
                      {
                        formatDecimal(
                          getFullNum(PledgeData?.pledgeNum) ?? 0
                        ).split(".")[0]
                      }
                      .
                      <span>
                        {
                          formatDecimal(
                            getFullNum(PledgeData?.pledgeNum) ?? 0
                          ).split(".")[1]
                        }
                      </span>
                    </>
                  ) : (
                    PledgeData?.pledgeNum ?? 0
                  )}
                </div>
              </div>
            </div>
            <div className="reword_box_item">
              <div className="reword_box_item_left">{t("总挖矿奖励")}</div>
              <div className="reword_box_item_right">
                <img src={coin_logo} alt="" />
                {/* {NumSplic1(PledgeData?.totalMineData, 4) ?? 0} */}

                <div>
                  {" "}
                  {formatDecimal(
                    getFullNum(PledgeData?.totalMineData) ?? 0
                  ).indexOf(".") > 0 ? (
                    <>
                      {
                        formatDecimal(
                          getFullNum(PledgeData?.totalMineData) ?? 0
                        ).split(".")[0]
                      }
                      .
                      <span>
                        {
                          formatDecimal(
                            getFullNum(PledgeData?.totalMineData) ?? 0
                          ).split(".")[1]
                        }
                      </span>
                    </>
                  ) : (
                    PledgeData?.totalMineData ?? 0
                  )}
                </div>
              </div>
            </div>
            <div className="reword_box_item">
              <div className="reword_box_item_left">{t("总节点奖励")}</div>
              <div className="reword_box_item_right">
                <img src={coin_logo} alt="" />

                <div>
                  {" "}
                  {formatDecimal(
                    getFullNum(PledgeData?.totalNodeData) ?? 0
                  ).indexOf(".") > 0 ? (
                    <>
                      {
                        formatDecimal(
                          getFullNum(PledgeData?.totalNodeData) ?? 0
                        ).split(".")[0]
                      }
                      .
                      <span>
                        {
                          formatDecimal(
                            getFullNum(PledgeData?.totalNodeData) ?? 0
                          ).split(".")[1]
                        }
                      </span>
                    </>
                  ) : (
                    PledgeData?.totalNodeData ?? 0
                  )}
                </div>
              </div>
            </div>
            <div className="line"></div>
            <div className="reword_box_item">
              <div className="reword_box_item_left">
                {t("Withdrawal Amount")}{" "}
                <Tooltip
                  title={
                    <div className="tip">
                      {t("Amount of Token from 'ended' or 'canceled' staking")}
                    </div>
                  }
                  trigger={["click", "hover"]}
                  showArrow={false}
                  getPopupContainer={(triggerNode) => triggerNode}
                >
                  <div style={{ cursor: "pointer" }}>
                    <img src={info_logo} alt="" />
                  </div>
                </Tooltip>
              </div>
              <div className="reword_box_item_right">
                <img src={coin_logo} alt="" />
                <div>
                  {" "}
                  {
                    // NumSplic1(
                    //   roundTo(
                    //     PledgeData?.totalMineData + PledgeData?.totalNodeData,
                    //     4
                    //   ),
                    //   4
                    // )

                    formatDecimal(
                      getFullNum(
                        PledgeData?.totalMineData + PledgeData?.totalNodeData
                      ) ?? 0
                    ).indexOf(".") > 0 ? (
                      <>
                        {
                          formatDecimal(
                            getFullNum(
                              PledgeData?.totalMineData +
                                PledgeData?.totalNodeData
                            ) ?? 0
                          ).split(".")[0]
                        }
                        .
                        <span>
                          {
                            formatDecimal(
                              getFullNum(
                                PledgeData?.totalMineData +
                                  PledgeData?.totalNodeData
                              ) ?? 0
                            ).split(".")[1]
                          }
                        </span>
                      </>
                    ) : (
                      (PledgeData?.totalMineData ?? 0) +
                      (PledgeData?.totalNodeData ?? 0)
                    )
                  }
                </div>
                {/* <img src={go_to} alt="" /> */}
              </div>
            </div>
            <div className="withdraw_box">
              <div
                className="withdraw_btn"
                onClick={() => {
                  if (
                    Number(
                      roundTo(
                        PledgeData?.totalMineData + PledgeData?.totalNodeData,
                        4
                      )
                    ) > 0
                  ) {
                    withdrawFun();
                  }
                }}
              >
                {t("Withdraw")}
              </div>
              <div
                className="record"
                onClick={() => {
                  Navigate("/View/withdrawrecord");
                }}
              >
                {t("Withdrawal History")} <img src={go_to} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
