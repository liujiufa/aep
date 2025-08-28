import React, { useEffect, useState } from "react";
import HeaderBox from "../../components/HeaderBox";
import { Carousel, Tooltip } from "antd";
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
import {
  getBoxUserInfo,
  getNodeData,
  getUserInfo,
  getUserPledgeData,
} from "../../API";
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
import set from "../../assets/image/Person/set.svg";
import copy1 from "../../assets/image/Person/copy.svg";
import info from "../../assets/image/Person/info.svg";
import in_img from "../../assets/image/Person/in.png";
import out_img from "../../assets/image/Person/out.png";
import release from "../../assets/image/Person/release.png";
import get from "../../assets/image/Person/get.png";
import mount_num from "../../assets/image/Person/mount_num.png";
import pledge_all from "../../assets/image/Person/pledge_all.png";
import network from "../../assets/image/Person/network.png";
import online from "../../assets/image/Person/online.png";
import quality from "../../assets/image/Person/quality.png";
import dividend from "../../assets/image/Person/dividend.png";
import coin_logo from "../../assets/image/coin_logo.png";
import go_to from "../../assets/image/go_to.svg";
import MountNode from "./components/MountNode";
import NodeDetail from "./components/NodeDetail";
import SetUsername from "../Home/components/SetUsername";
import copy from "copy-to-clipboard";

const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [NodeDetailState, setNodeDetailState] = useState(false);
  const [UserAccountList, setUserAccountList] = useState<any>([]);
  const [UserInfo, setUserInfo] = useState<any>({});
  const [NodeData, setNodeData] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [UserPledgeData, setUserPledgeData] = useState<any>({});
  const [BoxUserInfo, setBoxUserInfo] = useState<any>({});
  const [UsernameState, setUsernameState] = useState(false);

  const getInitDate = () => {
    getUserInfo().then((res: any) => {
      setUserInfo(res?.data || {});
    });
    getNodeData().then((res: any) => {
      setNodeData(res?.data || {});
    });
    getUserPledgeData().then((res: any) => {
      setUserPledgeData(res?.data || {});
    });
    getBoxUserInfo().then((res: any) => {
      setBoxUserInfo(res?.data || {});
    });
  };

  useEffect(() => {}, [web3ModalAccount]);
  useEffect(() => {
    if (!!token) {
      getInitDate();
    } else {
      setUserAccountList([]);
    }
  }, [token]);

  useEffect(() => {
    setUserInfo({});
    setUserPledgeData({});
    setBoxUserInfo({});
    setNodeData({});
  }, [isConnected]);

  return (
    <div className="person all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="person_content">
        <div className="person_detail_box">
          <div className="set_name">
            {UserInfo?.nickName ?? t("Set Username")}
            <img
              src={set}
              alt=""
              onClick={() => {
                if (!!token) {
                  setUsernameState(true);
                }
              }}
            />
          </div>
          <div className="person_detail_item">
            {t("用户地址")}：
            <div className="value">
              {AddrHandle(UserInfo?.address ?? "-", 5, 4)}{" "}
              <img
                src={copy1}
                alt=""
                onClick={() => {
                  if (!!UserInfo?.address) {
                    copy(UserInfo?.address);
                    addMessage(t("Copied successfully"));
                  }
                }}
              />
            </div>
          </div>
          <div className="person_detail_item">
            {t("我的身份")}：
            <div className="value">
              {!!UserInfo?.isNode ? t("节点用户") : t("普通用户")}{" "}
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
                  <img src={info} alt="" />
                </div>
              </Tooltip>
            </div>
          </div>
          {!!UserInfo?.mountNodeAddress && (
            <div className="person_detail_item">
              {t("挂载地址")}：
              <div className="value">
                {!!UserInfo?.mountNodeAddress
                  ? AddrHandle(UserInfo?.mountNodeAddress, 6, 6)
                  : "-"}{" "}
                <img
                  src={go_to}
                  alt=""
                  onClick={() => {
                    setNodeDetailState(true);
                  }}
                />
              </div>
            </div>
          )}
          <div className="invite_box">
            <div className="invite_title">
              {t("邀請链接")}{" "}
              <div
                onClick={() => {
                  Navigate("/View/myfriends");
                }}
              >
                {t("我的好友")} <img src={go_to} alt="" />
              </div>
            </div>
            <div className="invite_link">
              {window.location.origin +
                `/${AddrHandle(web3ModalAccount as string, 5, 4)}`}{" "}
              <img
                src={copy1}
                alt=""
                onClick={() => {
                  if (!!token) {
                    copy(window.location.origin + `/${web3ModalAccount}`);
                    addMessage(t("Copied successfully"));
                  }
                }}
              />
            </div>
          </div>
        </div>
        {!!UserInfo?.isNode ? (
          <div className="data_box">
            <div className="data_title">{t("节点数据")}</div>
            <div className="data_items">
              <div
                className="data_item"
                onClick={() => {
                  Navigate("/View/data_detail");
                }}
              >
                <div className="data_item_left">
                  <img src={mount_num} alt="" />
                </div>
                <div className="data_item_right">
                  {t("挂载人数")}
                  <div className="value">
                    <span>{NodeData?.mountUserSize ?? 0}</span>{" "}
                    <img src={go_to} alt="" />
                  </div>
                </div>
              </div>
              <div
                className="data_item"
                onClick={() => {
                  Navigate("/View/data_detail");
                }}
              >
                <div className="data_item_left">
                  <img src={pledge_all} alt="" />
                </div>
                <div className="data_item_right">
                  {t("质押总量")}
                  <div className="value">
                    <img src={coin_logo} alt="" />
                    <span>
                      {NumSplic1(NodeData?.pledgeAmount, 4) ?? 0}
                    </span>{" "}
                    <img src={go_to} alt="" />
                  </div>
                </div>
              </div>
              <div className="data_item">
                <div className="data_item_left">
                  <img src={network} alt="" />
                </div>
                <div className="data_item_right">
                  {t("Network")}
                  <div className="value">
                    <span>{formatBytes(NodeData?.network)}</span>
                  </div>
                </div>
              </div>
              <div className="data_item">
                <div className="data_item_left">
                  <img src={online} alt="" />
                </div>
                <div className="data_item_right">
                  {t("Online")}
                  <div className="value">
                    <span>{NodeData?.onLine ?? 0}</span>
                  </div>
                </div>
              </div>
              <div className="data_item">
                <div className="data_item_left">
                  <img src={quality} alt="" />
                </div>
                <div className="data_item_right">
                  {t("Quality")}
                  <div className="value">
                    <span>{NodeData?.quality ?? 0}%</span>
                  </div>
                </div>
              </div>
              <div
                className="data_item"
                onClick={() => {
                  Navigate("/View/node_devide");
                }}
              >
                <div className="data_item_left">
                  <img src={dividend} alt="" />
                </div>
                <div className="data_item_right">
                  {t("节点奖励")}
                  <div className="value">
                    <img src={coin_logo} alt="" />{" "}
                    <span>{NumSplic1(NodeData?.nodeAward, 4) ?? 0}</span>{" "}
                    <img src={go_to} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="data_box">
              <div className="data_title">{t("质押数据")}</div>
              <div className="data_items">
                <div
                  className="data_item"
                  onClick={() => {
                    Navigate("/View/all_pledge_amount");
                  }}
                >
                  <div className="data_item_left">
                    <img src={in_img} alt="" />
                  </div>
                  <div className="data_item_right">
                    {t("质押总量")}
                    <div className="value">
                      <img src={coin_logo} alt="" />{" "}
                      <span>
                        {NumSplic1(UserPledgeData?.pledgeNum, 4) ?? 0}
                      </span>{" "}
                      <img src={go_to} alt="" />
                    </div>
                  </div>
                </div>
                <div
                  className="data_item"
                  onClick={() => {
                    Navigate("/View/pledge_out");
                  }}
                >
                  <div className="data_item_left">
                    <img src={out_img} alt="" />
                  </div>
                  <div className="data_item_right">
                    {t("质押产出")}
                    <div className="value">
                      <img src={coin_logo} alt="" />
                      <span>
                        {NumSplic1(UserPledgeData?.pledgeOutputNum, 4) ?? 0}
                      </span>{" "}
                      <img src={go_to} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="data_box">
              <div className="data_title">{t("奖励数据")}</div>
              <div className="data_items">
                <div
                  className="data_item"
                  onClick={() => {
                    // return addMessage(t("敬请期待"));
                    Navigate("/View/blind_release");
                  }}
                >
                  <div className="data_item_left">
                    <img src={release} alt="" />
                  </div>
                  <div className="data_item_right">
                    {t("待释放")}
                    <div className="value">
                      <img src={coin_logo} alt="" />{" "}
                      <span>{BoxUserInfo?.totalTreatQuota ?? 0}</span>{" "}
                      <img src={go_to} alt="" />
                    </div>
                  </div>
                </div>
                <div
                  className="data_item"
                  onClick={() => {
                    // return addMessage(t("敬请期待"));
                    Navigate("/View/pending_get");
                  }}
                >
                  <div className="data_item_left">
                    <img src={get} alt="" />
                  </div>
                  <div className="data_item_right">
                    {t("待领取")}
                    <div className="value">
                      <img src={coin_logo} alt="" />
                      <span>{BoxUserInfo?.amount ?? 0}</span>{" "}
                      <img src={go_to} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {false && (
          <div className="data_box">
            <div className="data_title">质押数据</div>
            <div className="mount_address">
              挂载地址：{" "}
              <div>
                0Xfu75...7656t <img src={go_to} alt="" />
              </div>
            </div>
            <div className="pledge_data_items">
              <div className="pledge_data_item">
                <div className="title">质押总量</div>
                <div className="value">
                  <img src={coin_logo} alt="" />
                  <div>920765</div>
                  <img src={go_to} alt="" />
                </div>
              </div>
              <div className="line"></div>
              <div className="pledge_data_item">
                <div className="title">质押产出</div>
                <div className="value">
                  <img src={coin_logo} alt="" />
                  <div>920765</div>
                  <img src={go_to} alt="" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterBox></FooterBox>

      <SetUsername
        name={UserInfo?.nickName ?? ""}
        fun={getInitDate}
        ShowTipModal={UsernameState}
        close={() => {
          setUsernameState(false);
        }}
      />
      <NodeDetail
        ShowTipModal={NodeDetailState}
        close={() => {
          setNodeDetailState(false);
        }}
      />
    </div>
  );
};

export default Home;
