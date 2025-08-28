import React, { useState, useEffect, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../store/reducer";
import styled, { keyframes } from "styled-components";
import { useViewport } from "../components/viewportContext";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexCCBox } from "../components/FlexBox";
import Web3 from "web3";
import { Dropdown, Flex, Menu, Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
import { getPledgeOrder } from "../API";
import { AddrHandle, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../components/NoData";
import return_img from "../assets/image/return.svg";
import filter from "../assets/image/filter.svg";
import record_dropdown from "../assets/image/record_dropdown.svg";
import "../assets/style/StakingRecord.scss";
import StakingDetail from "./Home/components/StakingDetail";

export default function Rank() {
  const web3 = new Web3();

  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { token } = useSelector<stateType, stateType>((state) => state);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [StakeType, setStakeType] = useState(-1);
  const [StakeDetailState, setStakeDetailState] = useState(false);
  const [RecordList3, setRecordList3] = useState<any>({});
  const [CurrentItem, setCurrentItem] = useState<any>({});
  const [OpenList, setOpenList] = useState<any>([]);

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
  const openFun = (type: any) => {
    let Arr: any = OpenList;
    if (Arr?.some((item: any) => Number(item) === Number(type))) {
      Arr = Arr?.filter((item: any) => Number(item) !== Number(type));
    } else {
      Arr = [...Arr, type];
    }
    setOpenList(Arr);
  };

  const getInitData = () => {
    getPledgeOrder({
      pageNum: PageNum,
      pageSize: 10,
      status: StakeType,
    }).then((res: any) => {
      setRecordList3(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [token, PageNum, StakeType]);

  return (
    <div className="staking_record">
      <div className="record_title">
        <img
          src={return_img}
          onClick={() => {
            Navigate(-1);
          }}
        />
        <div> {t("Staking Records")}</div>
        <Dropdown
          overlay={
            <Menu
              items={[
                { value: "全部", key: -1 },
                { value: "待赎回", key: 1 },
                { value: "Staking", key: 0 },
                { value: "已结束", key: 2 },
              ].map((item: any) => {
                return {
                  label: (
                    <span
                      onClick={() => {
                        setStakeType(item?.key);
                      }}
                      className={
                        StakeType === item?.key ? "TypeItem active" : "TypeItem"
                      }
                    >
                      {t(item.value)}
                    </span>
                  ),
                  key: item?.key,
                };
              })}
            />
          }
          placement="bottom"
          overlayClassName="StakeTypeDropDown"
          trigger={["click"]}
          arrow={false}
          getPopupContainer={(triggerNode: any) => triggerNode}
        >
          <div className="null">
            <img src={filter} alt="" />
          </div>
        </Dropdown>
      </div>

      <div className="record_content">
        <div>
          <div className="title items">
            <div className="item">{t("User Address")}</div>
            <div className="item">{t("Amount")}</div>
            <div className="item">{t("Duration (Days)")}</div>
          </div>
          <div className="line"></div>
          <div>
            {/* RecordList3?.records */}
            {RecordList3?.records?.length > 0 ? (
              RecordList3?.records?.map((item: any, index: any) => (
                <div className="content">
                  <div key={index} className="items">
                    <div className="item">
                      {AddrHandle(item?.userAddress, 4, 4)}
                    </div>
                    <div className="item">{item?.pledgeAmount}</div>
                    <div className="item">
                      {item?.pledgeDay}{" "}
                      <img
                        src={record_dropdown}
                        alt=""
                        className={
                          OpenList?.some(
                            (item1: any) => Number(item1) === Number(item?.id)
                          )
                            ? "rotetaOpen"
                            : "rotetaClose"
                        }
                        onClick={() => {
                          openFun(item?.id);
                        }}
                      />
                    </div>
                  </div>
                  {OpenList?.some(
                    (item1: any) => Number(item1) === Number(item?.id)
                  ) && (
                    <div className="data_items">
                      <div className="data_item">
                        {t("Time")} :{" "}
                        <div>
                          {dateFormat("YYYY.mm.dd", new Date(item?.pledgeTime))}
                        </div>
                      </div>
                      <div className="data_item">
                        {t("End Time")} :{" "}
                        <div>
                          {dateFormat("YYYY.mm.dd", new Date(item?.endTime))}
                        </div>
                      </div>
                      <div className="data_item">
                        {t("Status")} :{" "}
                        {item?.status === 0 ? (
                          <div
                            className="active"
                            onClick={() => {
                              setCurrentItem(item);
                              setStakeDetailState(true);
                            }}
                          >
                            {t("Staking")}{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.95 12.3001C5.8 12.1501 5.75 11.9501 5.75 11.7501L5.8 4.2501C5.8 4.0501 5.85 3.8501 6 3.7001C6.3 3.4001 6.75 3.4001 7.05 3.7001L10.8 7.4501C10.85 7.5001 10.9 7.6001 10.95 7.6501L11 7.7001C11.1 7.9501 11.05 8.3001 10.85 8.5001L7.05 12.2501C6.7 12.6001 6.25 12.5501 5.95 12.3001Z"
                                fill="#6B72FF"
                              />
                            </svg>
                          </div>
                        ) : item?.status === 1 ? (
                          <div
                            className="active"
                            onClick={() => {
                              setCurrentItem(item);
                              setStakeDetailState(true);
                            }}
                          >
                            {t("待赎回")}{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.95 12.3001C5.8 12.1501 5.75 11.9501 5.75 11.7501L5.8 4.2501C5.8 4.0501 5.85 3.8501 6 3.7001C6.3 3.4001 6.75 3.4001 7.05 3.7001L10.8 7.4501C10.85 7.5001 10.9 7.6001 10.95 7.6501L11 7.7001C11.1 7.9501 11.05 8.3001 10.85 8.5001L7.05 12.2501C6.7 12.6001 6.25 12.5501 5.95 12.3001Z"
                                fill="#6B72FF"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div>{t("已结束")}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <NoData />
            )}
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
        fun={getInitData}
        CurrentItem={CurrentItem}
        ShowModalState={StakeDetailState}
        close={() => {
          setStakeDetailState(false);
        }}
      />
    </div>
  );
}
