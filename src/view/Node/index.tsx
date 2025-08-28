import React, { useEffect, useState } from "react";
import HeaderBox from "../../components/HeaderBox";
import { Carousel, Pagination, PaginationProps } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
} from "@reown/appkit/react";
import { Contracts } from "../../web3";
import Web3 from "web3";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  formatBytes,
  showLoding,
} from "../../utils/tool";
import { useDispatch, useSelector } from "react-redux";
import { getNodeUserList, getUserInfo } from "../../API";
import {
  contractAddress,
  curentBSCChainId,
  curentETHChainId,
  loginNetworkId,
} from "../../config";
import { createLoginSuccessAction } from "../../store/actions";
import { useSign } from "../../hooks/useSign";
import { useTranslation } from "react-i18next";

import PageLoding from "../../components/PageLoding";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { useNoGas } from "../../hooks/useNoGas";
import FooterBox from "../../components/FooterBox";
import "./index.scss";
import search_logo from "../../assets/image/Node/search_logo.svg";
import mount_go_to from "../../assets/image/Node/mount_go_to.svg";
import go_to from "../../assets/image/go_to.svg";
import MountNode from "./components/MountNode";
import copy from "copy-to-clipboard";
import NoData from "../../components/NoData";
import { FlexCCBox } from "../../components/FlexBox";

const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [MountNodeState, setMountNodeState] = useState(false);
  const [NodeUserList, setNodeUserList] = useState<any>([]);
  const [CurrentItem, setCurrentItem] = useState<any>({});
  const [UserInfo, setUserInfo] = useState<any>({});
  const [PageNum, setPageNum] = useState(1);

  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [TopUpAiModalState, setTopUpAiModalState] = useState(false);
  const [ShowRecord, setShowRecord] = useState(true);
  const [SearchInput, setSearchInput] = useState("");
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const { signFun } = useSign();
  const {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress?.ORATopUp, contractAddress?.ORA);
  const { isNoGasFun } = useNoGas();
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <FlexCCBox style={{ width: "100%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M8.83962 2.06621V1.03094C8.83962 0.941211 8.7365 0.891658 8.66685 0.946568L2.62935 5.66219C2.57805 5.70209 2.53655 5.75317 2.50799 5.81154C2.47944 5.86992 2.4646 5.93404 2.4646 5.99902C2.4646 6.06401 2.47944 6.12813 2.50799 6.18651C2.53655 6.24488 2.57805 6.29596 2.62935 6.33585L8.66685 11.0515C8.73783 11.1064 8.83962 11.0568 8.83962 10.9671V9.93184C8.83962 9.86621 8.80882 9.80327 8.75792 9.76309L3.93649 5.99969L8.75792 2.23496C8.80882 2.19478 8.83962 2.13184 8.83962 2.06621Z"
              fill={"white"}
            />
          </svg>
        </FlexCCBox>
      );
    }
    if (type === "next") {
      return (
        <FlexCCBox style={{ width: "100%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3.16038 2.06621V1.03094C3.16038 0.941211 3.2635 0.891658 3.33315 0.946568L9.37065 5.66219C9.42195 5.70209 9.46345 5.75317 9.49201 5.81154C9.52056 5.86992 9.5354 5.93404 9.5354 5.99902C9.5354 6.06401 9.52056 6.12813 9.49201 6.18651C9.46345 6.24488 9.42195 6.29596 9.37065 6.33585L3.33315 11.0515C3.26217 11.1064 3.16038 11.0568 3.16038 10.9671V9.93184C3.16038 9.86621 3.19118 9.80327 3.24208 9.76309L8.06351 5.99969L3.24208 2.23496C3.19118 2.19478 3.16038 2.13184 3.16038 2.06621Z"
              fill={"white"}
            />
          </svg>
        </FlexCCBox>
      );
    }
    return originalElement;
  };
  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setPageNum(page);
  };

  const getInitDate = () => {
    getNodeUserList(!!SearchInput ? SearchInput : null).then((res: any) => {
      setNodeUserList(res?.data || []);
    });
  };
  const getTokenInitDate = () => {
    getUserInfo().then((res: any) => {
      setUserInfo(res?.data || {});
    });
  };
  // 兑换AI使用次数
  // const swapFun = async (num: any) => {
  //   if (web3ModalAccount) {
  //     // debugger;
  //     await signFun(
  //       (res: any) => {
  //         exchangeLuck({
  //           ...res,
  //           num: num,
  //         }).then((res: any) => {
  //           if (res.code === 200) {
  //             showLoding(false);
  //             getInitDate();
  //             setMountNodeState(false);
  //             return addMessage(t("兑换成功"));
  //           } else {
  //             showLoding(false);
  //             addMessage(res.msg);
  //           }
  //         });
  //       },
  //       `userAddress=${web3ModalAccount as string}`,
  //       () => {}
  //     );
  //   }
  // };
  // 分页函数
  function paginate(array: [], pageNum: number, pageSize: number) {
    const startIndex = (pageNum - 1) * pageSize; // 起始索引
    const endIndex = startIndex + pageSize; // 结束索引
    return array.slice(startIndex, endIndex); // 截取数组
  }
  useEffect(() => {
    getInitDate();
  }, [SearchInput]);
  useEffect(() => {
    if (!token) return;
    getTokenInitDate();
  }, [token]);

  return (
    <div className="node all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="node_content">
        <div className="node_title">{t("Node Pool")}</div>
        <div className="search_box">
          <div className="input_box">
            <input
              type="text"
              value={SearchInput}
              placeholder={t("Search Nodes")}
              onChange={(e: any) => {
                let value = e.target.value.trim();
                setSearchInput(value);
              }}
              onFocus={() => {
                setShowRecord(false);
              }}
              onBlur={() => {
                setShowRecord(true);
              }}
            />
            <img src={search_logo} alt="" />
          </div>

          {!!ShowRecord && (
            <div
              className="record_box"
              onClick={() => {
                Navigate("/View/mountrecord");
              }}
            >
              {t("Mount Records")} <img src={go_to} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className="node_list_box">
        <div className="node_list">
          <div
            className={`title_items items ${
              NodeUserList?.length <= 0 && "no_items"
            }`}
          >
            <div className="item">{t("User")}</div>
            <div className="item">{t("Amount")}</div>
            <div className="item">{t("Network")}</div>
            <div className="item">{t("Online")}</div>
            <div className="item">{t("Quality")}</div>
            <div className="item"></div>
          </div>
          <div className="content_box">
            {paginate(NodeUserList ?? [], PageNum, 10)?.length > 0 ? (
              paginate(NodeUserList ?? [], PageNum, 10)?.map(
                (item: any, index: any) => (
                  <div className={`content_items items `} key={index}>
                    <div
                      className="item"
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        copy(item?.userAddress);
                        addMessage(t("Copied successfully"));
                      }}
                    >
                      {AddrHandle(item?.userAddress, 5, 4)}
                      {/* {!!item?.nickName
                        ? item?.nickName
                        : AddrHandle(item?.userAddress, 5, 4)} */}
                    </div>
                    <div className="item">{item?.pledgeAmount}</div>
                    <div className="item">{formatBytes(item?.network)}</div>
                    <div className="item">{item?.onLine} H</div>
                    <div className="item">{item?.quality}%</div>
                    <div className="item">
                      <div
                        className="mount_item"
                        onClick={() => {
                          if (!!UserInfo?.isNode)
                            return addMessage(t("节点无法挂载"));
                          if (!UserInfo?.mountNodeAddress) {
                            setCurrentItem(item);
                            setMountNodeState(true);
                          } else {
                            return addMessage(t("重复挂载"));
                          }
                        }}
                      >
                        {t("Mount")} <img src={mount_go_to} alt="" />
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <NoData></NoData>
            )}
          </div>
          <div className="pagination_box">
            <Pagination
              current={PageNum}
              pageSize={10}
              onChange={onChange}
              total={NodeUserList?.length}
              showQuickJumper={false}
              defaultCurrent={1}
              itemRender={itemRender}
            />
          </div>
        </div>
      </div>
      <div className="node_content">
        <div className="node_rules_box">
          <div className="node_rules_title">{t("挂载规则")}</div>
          <div className="node_rules_item">
            1.{t("普通用户可将质押挂载至任意节点。")}
          </div>
          <div className="node_rules_item">
            2.{t("挂载成功后，将享有全网节点分红奖励。")}
          </div>
          <div className="node_rules_item">
            3.{t("质押期间不可更换或取消挂载，质押结束后可重新选择挂载节点。")}
          </div>
        </div>
      </div>

      <FooterBox></FooterBox>

      <MountNode
        type={1}
        CurrentItem={CurrentItem}
        fun={() => {
          getInitDate();
          getTokenInitDate();
        }}
        ShowTipModal={MountNodeState}
        close={() => {
          setMountNodeState(false);
        }}
      />
    </div>
  );
};

export default Home;
