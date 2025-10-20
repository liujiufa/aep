import React, { useState, useEffect, useRef, useContext } from "react";
import "../assets/style/ReleaseRecord.scss";
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
import return_icon from "../assets/image/return_icon.svg";
import Web3 from "web3";
import { contractAddress } from "../config";
import { Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
// import { getNftAwardRecord } from "../API";
import { AddrHandle, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../components/NoData";
import ThemeContext from "../components/ThemeContext";
import { aepIncomeList } from "../API";
import copy from "copy-to-clipboard";
const HomeContainer = styled(FlexBox)`
  position: relative;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-bottom: 3.67rem;
`;
const HomeContainer_Content = styled.div`
  width: 100%;
  padding: 0.58rem 1.5rem;
  /* margin-top: 1.33rem; */
  .record {
    border-radius: 1.33333rem;
    border: 0.3px solid rgba(255, 255, 255, 0.2);
    background: #e7eef5;
    box-shadow: -9px -9px 16px 0 rgba(255, 255, 255, 0.6),
      9px 9px 16px 0 rgba(163, 177, 198, 0.6);
    .record_title {
      padding: 1.33rem 1.17rem 0px;
      background: linear-gradient(90deg, #00ff38 0%, #05fce9 50%, #191aff 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      width: fit-content;
      font-family: Inter;
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.33rem 1.17rem;

      div {
        flex: 1;
        color: rgba(0, 0, 0, 0.5);
        font-family: Inter;
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        display: flex;
        justify-content: center;
        &:first-child {
          flex: auto;
          max-width: 3.5rem;
          justify-content: flex-start;
        }
        /* &:last-child {
          display: flex;
          justify-content: flex-end;
        } */
      }
    }
    .devider {
      width: 100%;
      height: 0.08333rem;
      background: linear-gradient(
        90deg,
        rgba(0, 213, 88, 0) 0%,
        #05fce9 50%,
        rgba(1, 64, 231, 0) 100%
      );
    }
    .friend_list_content {
      /* height: 100%; */
      /* min-height: calc(100vh - 300px); */
      padding: 1.17rem 1.17rem 1.33rem;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 1rem;
        &:last-child {
          margin-bottom: 0px;
        }

        div {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          &:first-child {
            flex: auto;
            max-width: 3.5rem;
            justify-content: flex-start;
          }
          /* &:last-child {
            display: flex;
            justify-content: flex-end;
          } */
        }
        .item_left {
          color: #000;
          text-align: center;
          font-family: Inter;
          font-size: 1.16667rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;

          img {
            width: 2.66667rem;
            height: 2.66667rem;
            flex-shrink: 0;
            margin-right: 0.83rem;
          }
        }
      }
    }
  }
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
    font-family: "Alibaba PuHuiTi 3.0";
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
    font-family: "Alibaba PuHuiTi 3.0";
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
        font-family: "Alibaba PuHuiTi 3.0";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.33333rem; /* 133.333% */
        &::placeholder {
          color: #000;
          font-family: "Alibaba PuHuiTi 3.0";
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

export const PaginationContainer = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
  /* position: absolute;
  bottom: 3.42rem;
  left: 50%;
  transform: translateX(-50%); */
  .ant-pagination {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    .ant-pagination-prev,
    .ant-pagination-next {
      display: flex;
      align-items: center;
      min-width: 1.32842rem;
      height: 1.32842rem;
      margin-right: 0.33rem;
      a {
        color: #fff;
        font-family: "PingFang SC";
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal; /* 100% */
      }
    }
    .ant-pagination-disabled {
      a {
        opacity: 0.5;
      }
    }
    .ant-pagination-item {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      /* border: none; */
      border-radius: 0.12458rem;
      border: 0.498px solid #151515;
      background: #fff;
      min-width: 1.32842rem;
      height: 1.32842rem;
      margin-right: 0.33rem;
      a {
        color: #151515;
        text-align: center;
        /* font-family: "Source Han Sans SC"; */
        font-size: 0.66667rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
    .ant-pagination-item-active {
      border-radius: 2px;
      opacity: 1;
      background: rgba(128, 117, 80, 1);
      a,
      span {
        font-family: "PingFang SC";
        font-size: 12px;
        font-weight: normal;
        line-height: 16px;
        text-align: center;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #000000;
      }
    }
    .ant-pagination-jump-next
      .ant-pagination-item-container
      .ant-pagination-item-ellipsis,
    .ant-pagination-jump-prev
      .ant-pagination-item-container
      .ant-pagination-item-ellipsis {
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-family: "PingFang SC";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .ant-pagination-options-quick-jumper {
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-family: "PingFang SC";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      input {
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background: #1b1b1b;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  .ant-select {
    display: none;
  }
  .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis,
  .ant-pagination
    .ant-pagination-jump-prev
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis,
  .ant-pagination
    .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis,
  .ant-pagination
    .ant-pagination-jump-prev
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: #807550;
    text-align: center;
    font-family: "PingFang SC";
    font-size: 0.66667rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    .ant-pagination-item-link-icon,
    span {
      height: 1.32842rem;
      svg {
        fill: #807550 !important;
        color: #807550 !important;
        background: #807550 !important;
      }
    }
  }
`;

export default function Rank() {
  const web3 = new Web3();
  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { token } = useSelector<stateType, stateType>((state) => state);
  const [Tip, setTip] = useState("");
  const [IsSearchState, setIsSearchState] = useState(true);
  const [InputAddress, setInputAddress] = useState<any>(null);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  // 安全地获取 id
  const id = location.state?.item?.id;
  const item = location.state?.item;
  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setPageNum(page);
  };

  const typeObj: any = {
    1: "30",
    2: "31",
    3: "32",
    4: "33",
  };

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
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            style={{ width: "0.66425rem", height: "0.66425rem" }}
          >
            <path
              d="M5.73776 2.74884L6.19569 3.20678L4.43198 4.97048L6.19569 6.73419L5.73776 7.19212L3.51611 4.97048L5.73776 2.74884Z"
              fill="#151515"
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
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            style={{ width: "0.66425rem", height: "0.66425rem" }}
          >
            <path
              d="M3.7642 7.19214L3.30626 6.7342L5.06997 4.9705L3.30626 3.20679L3.7642 2.74885L5.98584 4.9705L3.7642 7.19214Z"
              fill="#151515"
            />
          </svg>
        </FlexCCBox>
      );
    }
    return originalElement;
  };
  const getInitData = () => {
    if (!id) return;
    aepIncomeList({
      id: id,
      pageNum: PageNum,
      pageSize: 8,
    }).then((res: any) => {
      setRecordList3(res?.data || {});
    });
  };

  const CopyCodeFun = (str: any) => {
    if (!web3ModalAccount) {
      return addMessage(t("Please Connect wallet"));
    } else {
      copy(str);
      addMessage(t("Copied successfully"));
    }
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [token, id, PageNum]);

  return (
    <HomeContainer className="produce_detail">
      <ReturnBox>
        <img
          src={return_icon}
          alt=""
          onClick={() => {
            Navigate(-1);
          }}
        />

        <div> {t("19")}</div>

        <div className="null"></div>
      </ReturnBox>

      <HomeContainer_Content>
        {true ? (
          <>
            <div className="produce">
              <div className="title">{t("20")}</div>
              <div className="devider"></div>
              <div className="items">
                <div className="item">
                  {t("21")}
                  <span>
                    {item?.orderNum}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      onClick={() => {
                        CopyCodeFun(item?.orderNum);
                      }}
                    >
                      <path
                        d="M9.83301 14.833H2.83301C2.52359 14.833 2.22684 14.7101 2.00805 14.4913C1.78926 14.2725 1.66634 13.9758 1.66634 13.6663V6.66634C1.66634 6.35692 1.78926 6.06017 2.00805 5.84138C2.22684 5.62259 2.52359 5.49967 2.83301 5.49967H9.83301C10.1424 5.49967 10.4392 5.62259 10.658 5.84138C10.8768 6.06017 10.9997 6.35692 10.9997 6.66634V13.6663C10.9997 13.9758 10.8768 14.2725 10.658 14.4913C10.4392 14.7101 10.1424 14.833 9.83301 14.833ZM9.83301 13.833C9.87721 13.833 9.9196 13.8154 9.95086 13.7842C9.98211 13.7529 9.99967 13.7105 9.99967 13.6663V6.66634C9.99967 6.64445 9.99536 6.62278 9.98699 6.60256C9.97861 6.58234 9.96633 6.56397 9.95086 6.54849C9.93538 6.53301 9.91701 6.52074 9.89679 6.51236C9.87657 6.50398 9.85489 6.49967 9.83301 6.49967H2.83301C2.7888 6.49967 2.74641 6.51723 2.71516 6.54849C2.6839 6.57975 2.66634 6.62214 2.66634 6.66634V13.6663C2.66634 13.7105 2.6839 13.7529 2.71516 13.7842C2.74641 13.8154 2.7888 13.833 2.83301 13.833H9.83301ZM5.99967 4.49967C5.99967 4.63228 5.947 4.75946 5.85323 4.85323C5.75946 4.947 5.63228 4.99967 5.49967 4.99967C5.36707 4.99967 5.23989 4.947 5.14612 4.85323C5.05235 4.75946 4.99967 4.63228 4.99967 4.49967V3.33301C4.99967 3.02359 5.12259 2.72684 5.34138 2.50805C5.56017 2.28926 5.85692 2.16634 6.16634 2.16634H13.1663C13.4758 2.16634 13.7725 2.28926 13.9913 2.50805C14.2101 2.72684 14.333 3.02359 14.333 3.33301V10.333C14.333 10.6424 14.2101 10.9392 13.9913 11.158C13.7725 11.3768 13.4758 11.4997 13.1663 11.4997H11.9997C11.8671 11.4997 11.7399 11.447 11.6461 11.3532C11.5524 11.2595 11.4997 11.1323 11.4997 10.9997C11.4997 10.8671 11.5524 10.7399 11.6461 10.6461C11.7399 10.5524 11.8671 10.4997 11.9997 10.4997H13.1663C13.2105 10.4997 13.2529 10.4821 13.2842 10.4509C13.3154 10.4196 13.333 10.3772 13.333 10.333V3.33301C13.333 3.2888 13.3154 3.24641 13.2842 3.21516C13.2529 3.1839 13.2105 3.16634 13.1663 3.16634H6.16634C6.12214 3.16634 6.07975 3.1839 6.04849 3.21516C6.01723 3.24641 5.99967 3.2888 5.99967 3.33301V4.49967Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
                <div className="item">
                  {t("22")}
                  <span>{item?.outAmount} SAEP</span>
                </div>
                <div className="item">
                  {t("23")}
                  <span>
                    {dateFormat("YYYY/mm/dd HH:MM", new Date(item?.payTime))}
                  </span>
                </div>
                <div className="item">
                  {t("24")}
                  {item?.logisticsStatus === 2 ? (
                    <span>
                      {item?.logisticsNumber}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        onClick={() => {
                          CopyCodeFun(item?.logisticsNumber);
                        }}
                      >
                        <path
                          d="M9.83301 14.833H2.83301C2.52359 14.833 2.22684 14.7101 2.00805 14.4913C1.78926 14.2725 1.66634 13.9758 1.66634 13.6663V6.66634C1.66634 6.35692 1.78926 6.06017 2.00805 5.84138C2.22684 5.62259 2.52359 5.49967 2.83301 5.49967H9.83301C10.1424 5.49967 10.4392 5.62259 10.658 5.84138C10.8768 6.06017 10.9997 6.35692 10.9997 6.66634V13.6663C10.9997 13.9758 10.8768 14.2725 10.658 14.4913C10.4392 14.7101 10.1424 14.833 9.83301 14.833ZM9.83301 13.833C9.87721 13.833 9.9196 13.8154 9.95086 13.7842C9.98211 13.7529 9.99967 13.7105 9.99967 13.6663V6.66634C9.99967 6.64445 9.99536 6.62278 9.98699 6.60256C9.97861 6.58234 9.96633 6.56397 9.95086 6.54849C9.93538 6.53301 9.91701 6.52074 9.89679 6.51236C9.87657 6.50398 9.85489 6.49967 9.83301 6.49967H2.83301C2.7888 6.49967 2.74641 6.51723 2.71516 6.54849C2.6839 6.57975 2.66634 6.62214 2.66634 6.66634V13.6663C2.66634 13.7105 2.6839 13.7529 2.71516 13.7842C2.74641 13.8154 2.7888 13.833 2.83301 13.833H9.83301ZM5.99967 4.49967C5.99967 4.63228 5.947 4.75946 5.85323 4.85323C5.75946 4.947 5.63228 4.99967 5.49967 4.99967C5.36707 4.99967 5.23989 4.947 5.14612 4.85323C5.05235 4.75946 4.99967 4.63228 4.99967 4.49967V3.33301C4.99967 3.02359 5.12259 2.72684 5.34138 2.50805C5.56017 2.28926 5.85692 2.16634 6.16634 2.16634H13.1663C13.4758 2.16634 13.7725 2.28926 13.9913 2.50805C14.2101 2.72684 14.333 3.02359 14.333 3.33301V10.333C14.333 10.6424 14.2101 10.9392 13.9913 11.158C13.7725 11.3768 13.4758 11.4997 13.1663 11.4997H11.9997C11.8671 11.4997 11.7399 11.447 11.6461 11.3532C11.5524 11.2595 11.4997 11.1323 11.4997 10.9997C11.4997 10.8671 11.5524 10.7399 11.6461 10.6461C11.7399 10.5524 11.8671 10.4997 11.9997 10.4997H13.1663C13.2105 10.4997 13.2529 10.4821 13.2842 10.4509C13.3154 10.4196 13.333 10.3772 13.333 10.333V3.33301C13.333 3.2888 13.3154 3.24641 13.2842 3.21516C13.2529 3.1839 13.2105 3.16634 13.1663 3.16634H6.16634C6.12214 3.16634 6.07975 3.1839 6.04849 3.21516C6.01723 3.24641 5.99967 3.2888 5.99967 3.33301V4.49967Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span style={{ color: "#E34956" }}>{t("135")}</span>
                  )}
                </div>
                <div className="item last_item">
                  {t("25")}
                  <div className="info">
                    {item?.receiver} {item?.phone}
                  </div>
                  <div className="address">{item?.address}</div>
                </div>
              </div>
            </div>
            <div className="record">
              <div className="record_title">{t("26")}</div>
              <div className="title">
                <div>{t("27")}</div>
                <div>{t("28")}</div>
                <div>USDT{t("29")}</div>
                <div>AEP{t("29")}</div>
              </div>
              <div className="devider"></div>
              <div className="friend_list_content">
                {/* RecordList3?.records */}
                {RecordList3?.list?.length > 0 ? (
                  RecordList3?.records?.map((item: any, index: any) => (
                    <div key={index} className="item">
                      <div className="item_left">
                        {dateFormat("mm/dd", new Date(item?.createTime))}
                      </div>
                      <div className="item_left">{t(typeObj[item?.type])}</div>
                      <div className="item_left">{item?.releaseUsdt}</div>

                      <div className="item_left">{item?.releaseAep}</div>
                    </div>
                  ))
                ) : (
                  <NoData></NoData>
                )}
              </div>
            </div>
          </>
        ) : (
          <NoData></NoData>
        )}

        <PaginationContainer>
          <Pagination
            current={PageNum}
            pageSize={8}
            onChange={onChange}
            total={RecordList3?.total}
            showQuickJumper
            defaultCurrent={1}
            itemRender={itemRender}
          />
        </PaginationContainer>
      </HomeContainer_Content>
    </HomeContainer>
  );
}
