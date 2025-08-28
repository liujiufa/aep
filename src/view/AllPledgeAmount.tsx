import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../store/reducer";
import styled, { keyframes } from "styled-components";
import { useViewport } from "../components/viewportContext";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ContainerBox,
  FlexBox,
  FlexCCBox,
  FlexSASBox,
  FlexSBCBox,
} from "../components/FlexBox";
import Web3 from "web3";
import { Flex, Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
import { getPledgeOrder, getUserPledgeData } from "../API";
import { AddrHandle, NumSplic1, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../components/NoData";
import return_img from "../assets/image/return.svg";
import go_to from "../assets/image/Home/go_to.svg";
import "../assets/style/AllPledgeAmount.scss";
import { divide } from "lodash";
import StakingDetail from "./Home/components/StakingDetail";
import coin_logo from "../assets/image/coin_logo.png";

export default function Rank() {
  const web3 = new Web3();

  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { token } = useSelector<stateType, stateType>((state) => state);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [RecordList3, setRecordList3] = useState<any>({});
  const [UserPledgeData, setUserPledgeData] = useState<any>({});
  const [CurrentItem, setCurrentItem] = useState<any>({});

  const [StakeDetailState, setStakeDetailState] = useState<any>(false);
  const { state: stateObj } = useLocation();

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

  const getInitData = () => {
    getUserPledgeData().then((res: any) => {
      setUserPledgeData(res?.data || {});
    });
  };
  const getRecordData = () => {
    getPledgeOrder({
      pageNum: PageNum,
      pageSize: 10,
      status: -1,
    }).then((res: any) => {
      setRecordList3(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [token]);

  useEffect(() => {
    if (!!token) {
      getRecordData();
    } else {
    }
  }, [token, PageNum]);

  return (
    <div className="all_pledge_record">
      <div className="record_title">
        <img
          src={return_img}
          onClick={() => {
            Navigate(-1);
          }}
        />
        <div> {t("质押总量")}</div>
        <div className="null"></div>
      </div>

      <div className="record_content">
        <div>
          <div className="data_box">
            <div className="data_item">
              {t("质押总量")}{" "}
              <span>
                <img src={coin_logo} alt="" />{" "}
                {NumSplic1(UserPledgeData?.pledgeNum, 4) ?? 0}
              </span>
            </div>
            <div className="data_line"></div>
            <div className="data_item">
              {t("可赎回")}{" "}
              <span>
                <img src={coin_logo} alt="" />{" "}
                {NumSplic1(UserPledgeData?.redemptionNum, 4) ?? 0}
              </span>
            </div>
          </div>
          <div className="table_title">{t("质押明细")}</div>
          <div className="table_box">
            <div className="title items">
              <div className="item">{t("时间")}</div>
              <div className="item">{t("质押数量")}</div>
              <div className="item">{t("状态")}</div>
            </div>
            <div className="line"></div>
            <div>
              {/* RecordList3?.records */}
              {RecordList3?.records?.length > 0 ? (
                RecordList3?.records?.map((item: any, index: any) => (
                  <div key={index} className="content items">
                    <div className="item">
                      {dateFormat("YYYY.mm.dd", new Date(item?.pledgeTime))}
                    </div>
                    <div className="item">{item?.pledgeAmount}</div>

                    <div className="item">
                      {item?.status === 0 ? (
                        t("质押中")
                      ) : item?.status === 1 ? (
                        <div
                          onClick={() => {
                            setCurrentItem(item);
                            setStakeDetailState(true);
                          }}
                        >
                          {t("待赎回")}
                          <img src={go_to} alt="" />
                        </div>
                      ) : (
                        t("已结束")
                      )}{" "}
                    </div>
                  </div>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
        </div>

        <div className="pagination_box">
          <Pagination
            current={PageNum}
            pageSize={10}
            onChange={onChange}
            total={RecordList3?.total}
            showQuickJumper={false}
            defaultCurrent={1}
            itemRender={itemRender}
          />
        </div>
      </div>
      <StakingDetail
        fun={getRecordData}
        CurrentItem={CurrentItem}
        ShowModalState={StakeDetailState}
        close={() => {
          setStakeDetailState(false);
        }}
      />
    </div>
  );
}
