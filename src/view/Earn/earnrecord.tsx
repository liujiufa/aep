import React, { useState, useEffect, useRef, useContext } from "react";
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
import Web3 from "web3";
import { contractAddress } from "../../config";
import { Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
// import { getNftAwardRecord } from "../../API";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  roundTo,
} from "../../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../../components/NoData";
import ThemeContext from "../../components/ThemeContext";
import OrderDetailModal from "../../components/OrderDetailModal";
import {
  aepIncomeListReferee,
  aepIncomeListSales,
  aepIncomeListTeam,
} from "../../API";
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
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.58rem 1.33rem;

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
          /* flex: auto;
          max-width: 6.25rem; */
          justify-content: flex-start;
        }
        &:last-child {
          /* flex: auto;
          max-width: 1.25rem; */
          justify-content: flex-end;
        }
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
            /* flex: auto;
            max-width: 6.25rem; */
            justify-content: flex-start;
          }
          &:last-child {
            /* flex: auto;
            max-width: 1.25rem; */
            justify-content: flex-end;
          }
        }
        .item_left {
          color: #000;
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
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
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
  position: absolute;
  bottom: 3.42rem;
  left: 50%;
  transform: translateX(-50%);
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
  const [OrderDetailModalState, setOrderDetailModalState] = useState(false);
  const [InputAddress, setInputAddress] = useState<any>(null);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    state: { type },
  } = useLocation();

  const typeObj: any = {
    1: "31",
    2: "32",
    3: "33",
  };

  console.log(type, "type");
  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setPageNum(page);
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
    if (Number(type) === 1) {
      aepIncomeListReferee({
        pageNum: PageNum,
        pageSize: 10,
      }).then((res: any) => {
        setRecordList3(res?.data || {});
      });
    } else if (Number(type) === 2) {
      aepIncomeListSales({
        pageNum: PageNum,
        pageSize: 10,
      }).then((res: any) => {
        setRecordList3(res?.data || {});
      });
    } else if (Number(type) === 3) {
      aepIncomeListTeam({
        pageNum: PageNum,
        pageSize: 10,
      }).then((res: any) => {
        setRecordList3(res?.data || {});
      });
    }
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [web3ModalAccount, token, PageNum, type]);

  return (
    <HomeContainer>
      <ReturnBox>
        <img
          src={return_icon}
          alt=""
          onClick={() => {
            Navigate(-1);
          }}
        />

        <div> {t("46")}</div>

        <div className="null"></div>
      </ReturnBox>

      <HomeContainer_Content>
        {RecordList3?.total > 0 ? (
          <div className="record">
            <div className="title">
              <div>{t("27")}</div>
              <div>{type === 2 ? t("47") : t("48")}</div>
              <div>{t(typeObj[type])}</div>
            </div>
            <div className="devider"></div>
            <div className="friend_list_content">
              {/* RecordList3?.records */}
              {RecordList3?.list?.map((item: any, index: any) => (
                <div key={index} className="item">
                  <div className="item_left">
                    {dateFormat("mm/dd", new Date(item?.createTime))}
                  </div>
                  <div className="item_left">
                    {Number(type) === 1
                      ? NumSplic1(
                          roundTo(item?.sourceIncomeRatio * 100, 4),
                          0
                        ) + "%"
                      : Number(type) === 2
                      ? "c" + item?.level
                      : NumSplic1(roundTo(item?.incomeRatio * 100, 4), 0) + "%"}
                  </div>
                  <div className="item_left">
                    {Number(type) === 1
                      ? item?.incomeSaep
                      : Number(type) === 2
                      ? item?.incomeSales
                      : item?.incomeTeam}{" "}
                    SAEP
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NoData></NoData>
        )}

        <PaginationContainer>
          <Pagination
            current={PageNum}
            pageSize={10}
            onChange={onChange}
            total={RecordList3?.total}
            showQuickJumper
            defaultCurrent={1}
            itemRender={itemRender}
          />
        </PaginationContainer>
      </HomeContainer_Content>

      <OrderDetailModal
        // data={getInitDate}
        ShowTipModal={false}
        close={() => {
          setOrderDetailModalState(false);
        }}
      />
    </HomeContainer>
  );
}
