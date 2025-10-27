import React, { useState, useEffect, useRef, useContext } from "react";
import "../assets/style/ReleaseRecord.scss";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "../store/reducer";
import styled, { keyframes } from "styled-components";
import { useViewport } from "../components/viewportContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ContainerBox,
  FlexBox,
  FlexCCBox,
  FlexSASBox,
  FlexSBCBox,
} from "../components/FlexBox";
import return_icon from "../assets/image/return_icon.svg";
import tag from "../assets/image/Invite/tag.svg";
import Web3 from "web3";
import { contractAddress } from "../config";
import { Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
// import { getNftAwardRecord } from "../API";
import { AddrHandle, addMessage, dateFormat } from "../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../components/NoData";
import ThemeContext from "../components/ThemeContext";
import { aepRefereeList } from "../API";
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
        font-family: "Inter";
        font-size: 1.16667rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        display: flex;
        justify-content: center;
        &:first-child {
          /* flex: auto;
          max-width: 3.5rem; */
          justify-content: flex-start;
        }
        &:last-child {
          display: flex;
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
      padding: 0.83rem 0rem;
      .item {
        padding: 0.83333rem 1.16667rem;
        /* margin-bottom: 1rem; */
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        &:first-child {
          border-radius: 1.33333rem;
          background: #cde5fd;
          box-shadow: 0 4px 4px 0 rgba(163, 177, 198, 0.25) inset,
            0 4px 4px 0 rgba(163, 177, 198, 0.25);
          padding: 0.83333rem 1.16667rem;
          border: none;
        }
        &:last-child {
          margin-bottom: 0px;
        }

        div {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            justify-content: flex-start;
          }
          &:last-child {
            justify-content: flex-end;
          }
        }
        .item_top {
          margin-bottom: 0.5rem;
          .address {
            color: #000;
            font-family: "Inter";
            font-size: 1.16667rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            img {
              margin-left: 0.83rem;
            }
            span {
              margin-left: 0.5rem;
              font-family: "Inter";
              font-size: 1.16667rem;
              font-style: italic;
              font-weight: 700;
              line-height: 120%; /* 1.4rem */
              background: linear-gradient(
                180deg,
                #00d558 0%,
                #05fce9 50%,
                #0140e7 100%
              );
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
          .time {
            color: #000;
            font-family: "Inter";
            font-size: 1.16667rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
        }
        .item_bottom {
          .market,
          .person {
            > div {
              width: fit-content;

              color: #73777b;
              font-family: "Inter";
              font-size: 1.16667rem;
              font-style: normal;
              font-weight: 400;
              line-height: normal;

              display: flex;
              align-items: center;
              justify-content: flex-start;
              span {
                color: #000;
                font-family: "Inter";
                font-size: 1.16667rem;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
              }
            }
          }
          .person {
            > div {
              justify-content: flex-end;
            }
          }
        }
      }
      .item_nowork {
        .item_top {
          .address,
          .time {
            color: #73777b;
          }
        }
        .item_bottom {
          .market,
          .person {
            > div span {
              color: #73777b;
            }
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
    font-family: "Inter";
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
    font-family: "Inter";
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
        font-family: "Inter";
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 1.33333rem; /* 133.333% */
        &::placeholder {
          color: #000;
          font-family: "Inter";
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
  .svgs {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > svg {
      &:first-child {
        margin-right: 0.33rem;
      }
    }
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
        font-family: "Inter";
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
      background: rgba(21, 21, 21, 1);
      a,
      span {
        font-family: "PingFang SC";
        font-size: 12px;
        font-weight: normal;
        line-height: 16px;
        text-align: center;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #fff;
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
      font-family: "Inter";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .ant-pagination-options-quick-jumper {
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      font-family: "Inter";
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
    font-family: "Inter";
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
  const [IsSearchState, setIsSearchState] = useState(false);
  const [InputAddress, setInputAddress] = useState<any>(null);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [OrderType, setOrderType] = useState(2);
  const [RecordList3, setRecordList3] = useState<any>({});
  const { theme, setTheme } = useContext(ThemeContext);

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
    aepRefereeList({
      orderType: OrderType,
      userAddress: InputAddress,
      pageNum: PageNum,
      pageSize: 10,
    }).then((res: any) => {
      setRecordList3(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [web3ModalAccount, token, InputAddress, PageNum, OrderType]);

  return (
    <HomeContainer>
      {!IsSearchState ? (
        <ReturnBox>
          <img
            src={return_icon}
            alt=""
            onClick={() => {
              Navigate(-1);
            }}
          />

          <div> {t("11")}</div>

          <span className="svgs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => {
                setOrderType(OrderType === 2 ? 0 : 2);
              }}
            >
              <path
                d="M21.302 17.8814H12.3773C11.8606 17.8814 11.4392 18.3473 11.4392 18.9186C11.4392 19.4897 11.8606 19.9557 12.3773 19.9557H21.302C21.8186 19.9557 22.24 19.4897 22.24 18.9186C22.24 18.3473 21.8186 17.8814 21.302 17.8814ZM21.302 10.3953H15.3521C14.8355 10.3953 14.4142 10.8571 14.4142 11.4323C14.4142 12.0035 14.8355 12.4693 15.3521 12.4693H21.302C21.8186 12.4693 22.24 12.0035 22.24 11.4323C22.24 10.8571 21.8186 10.3953 21.302 10.3953ZM12.0841 5.20988H21.302C21.8186 5.20988 22.24 4.74806 22.24 4.17293C22.24 3.59757 21.8186 3.13574 21.302 3.13574H12.0841C11.5675 3.13574 11.1461 3.59757 11.1461 4.17293C11.1461 4.74806 11.5675 5.20988 12.0841 5.20988ZM12.7361 10.1604C13.1062 9.75506 13.1062 9.09473 12.7435 8.68567L8.07221 3.468C7.88919 3.26144 7.64359 3.15599 7.40175 3.15599C7.16354 3.15599 6.92172 3.25734 6.73858 3.45572L6.73481 3.45981C6.73481 3.45981 6.73118 3.45981 6.73118 3.46391L2.03435 8.637C1.66796 9.04627 1.66796 9.70662 2.03798 10.1158H2.03809C2.40437 10.5248 3.01636 10.5248 3.38639 10.1198L6.44927 6.74931V19.1576C6.44927 19.7328 6.86686 20.1987 7.38715 20.1987C7.90722 20.1987 8.32504 19.7328 8.32493 19.1576V6.69253L11.4099 10.1522C11.7762 10.5612 12.3699 10.5653 12.7361 10.1604Z"
                fill="#73777B"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={() => {
                setIsSearchState(true);
              }}
            >
              <path
                d="M20.783 19.7444L17.4792 16.4497C17.9701 15.8434 18.3686 15.1749 18.6722 14.4489C19.0967 13.4329 19.2651 12.3522 19.2651 11.2404C19.2651 10.1286 19.073 9.04792 18.6484 8.03195C18.2381 7.04952 17.6737 6.16773 16.9242 5.41294C16.1748 4.65575 15.302 4.0615 14.332 3.64696C13.3264 3.21805 12.2567 3 11.1563 3C10.0558 3 8.98616 3.21805 7.98056 3.64696C7.00817 4.0615 6.13538 4.65575 5.3883 5.41294C4.63884 6.17013 4.05066 7.05192 3.64036 8.03195C3.21582 9.04792 3 10.1286 3 11.2404C3 12.3522 3.21582 13.4329 3.64036 14.4489C4.05066 15.4313 4.63884 16.3131 5.3883 17.0679C6.13775 17.8251 7.01054 18.4193 7.98056 18.8339C8.98616 19.2628 10.0558 19.4329 11.1563 19.4329C12.2567 19.4329 13.3264 19.2628 14.332 18.8339C15.1099 18.5008 15.8261 18.0527 16.4641 17.4992L19.7631 20.7891C19.9054 20.9305 20.0904 21 20.2731 21C20.4604 21 20.6478 20.9281 20.7901 20.7819C21.0723 20.4944 21.07 20.0296 20.783 19.7444ZM11.1563 17.9665C9.36563 17.9665 7.68173 17.3099 6.41524 16.0304C5.14876 14.7508 4.45148 13.0495 4.45148 11.2404C4.45148 9.43131 5.14876 7.73003 6.41524 6.45048C7.68173 5.17093 9.36563 4.46645 11.1563 4.46645C12.9469 4.46645 14.6308 5.17093 15.8973 6.45048C17.1638 7.73003 17.8136 9.43131 17.8136 11.2404C17.8136 13.0495 17.1638 14.7508 15.8973 16.0304C14.6308 17.3099 12.9469 17.9665 11.1563 17.9665Z"
                fill="#73777B"
              />
            </svg>
          </span>
        </ReturnBox>
      ) : (
        <ReturnBox>
          <img
            src={return_icon}
            alt=""
            onClick={() => {
              setInputAddress(null);
              setIsSearchState(false);
            }}
          />
          <div className="search_box">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M18.0354 17.9646C18.1128 17.8872 18.1743 17.7954 18.2162 17.6942C18.2581 17.5931 18.2796 17.4847 18.2796 17.3752C18.2796 17.2658 18.2581 17.1574 18.2162 17.0563C18.1743 16.9551 18.1128 16.8633 18.0354 16.7859L15.0896 13.84C14.9333 13.6837 14.7214 13.5958 14.5003 13.5957C14.2792 13.5956 14.0672 13.6834 13.9108 13.8396C13.7545 13.9959 13.6666 14.2079 13.6665 14.4289C13.6664 14.65 13.7542 14.862 13.9104 15.0184L16.8571 17.9642C17.0134 18.1204 17.2253 18.2082 17.4463 18.2082C17.6672 18.2082 17.8791 18.1204 18.0354 17.9642V17.9646Z"
                  fill={theme === "light" ? "black" : "white"}
                />
                <path
                  d="M9.5 15.3333C6.27833 15.3333 3.66667 12.7217 3.66667 9.5C3.66667 6.27833 6.27833 3.66667 9.5 3.66667C12.7217 3.66667 15.3333 6.27833 15.3333 9.5C15.3333 12.7217 12.7217 15.3333 9.5 15.3333ZM9.5 17C13.6421 17 17 13.6421 17 9.5C17 5.35792 13.6421 2 9.5 2C5.35792 2 2 5.35792 2 9.5C2 13.6421 5.35792 17 9.5 17Z"
                  fill={theme === "light" ? "black" : "white"}
                />
              </svg>
              <input
                type="text"
                placeholder={t("12")}
                value={InputAddress}
                onChange={(e: any) => {
                  setInputAddress(e.target.value);
                }}
              />
            </div>
            <span
              onClick={async () => {
                let tag = await web3.utils.isAddress(InputAddress);
                // if (tag) {
                aepRefereeList({
                  orderType: OrderType,
                  address: InputAddress,
                  pageNum: PageNum,
                  pageSize: 10,
                }).then((res: any) => {
                  setRecordList3(res?.data || {});
                });
                // } else {
                //   return addMessage(t("13"));
                // }
              }}
            >
              {t("14")}
            </span>
          </div>
        </ReturnBox>
      )}

      <HomeContainer_Content>
        {RecordList3?.total > 0 ? (
          <div className="record">
            <div className="title">
              <div>{t("16")}</div>

              <div>{t("15")}</div>
            </div>
            <div className="devider"></div>
            <div className="friend_list_content">
              {RecordList3?.list?.map((item: any, index: any) => (
                <div
                  key={index}
                  className={!!item?.isRelease ? "item" : "item item_nowork"}
                >
                  <div className="item_top">
                    <div className="address">
                      {AddrHandle(item?.userAddress)}{" "}
                      {!!item?.isReleaseSpeed && <img src={tag} alt="" />}{" "}
                      {item?.level > 0 && <span>C{item?.level}</span>}
                    </div>

                    <div className="time">
                      {dateFormat("mm/dd HH:MM", new Date(item?.createTime))}
                    </div>
                  </div>
                  <div className="item_bottom">
                    <div className="market">
                      <div>
                        {" "}
                        {t("17")}：<span>{item?.achieveTeam}</span>
                      </div>
                    </div>
                    <div className="person">
                      <div>
                        {" "}
                        {t("18")}：<span>{item?.achievePerson}</span>
                      </div>
                    </div>
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
    </HomeContainer>
  );
}
