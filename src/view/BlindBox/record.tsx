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
import Web3 from "web3";
import { Flex, Pagination } from "antd";
import { Modal, PaginationProps } from "antd";
import { getBoxOrderList, getMountRecord } from "../../API";
import { AddrHandle, addMessage, dateFormat } from "../../utils/tool";
import { useAppKitAccount } from "@reown/appkit/react";
import NoData from "../../components/NoData";
import return_img from "../../assets/image/return.svg";
import "../../assets/style/MountRecord.scss";
import copy from "copy-to-clipboard";

export default function Rank() {
  const web3 = new Web3();

  const { width } = useViewport();
  const { t, i18n } = useTranslation();
  const Navigate = useNavigate();
  const { token } = useSelector<stateType, stateType>((state) => state);
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [PageNum, setPageNum] = useState(1);
  const [ActiveTab, setActiveTab] = useState(1);
  const [UnMountNodeState, setUnMountNodeState] = useState<any>(false);
  const [RecordList3, setRecordList3] = useState<any>({});
  const [CurrentItem, setCurrentItem] = useState<any>({});

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
    getBoxOrderList({
      pageNum: PageNum,
      pageSize: 20,
    }).then((res: any) => {
      setRecordList3(res?.data || {});
    });
  };

  useEffect(() => {
    if (!!token) {
      getInitData();
    } else {
    }
  }, [token, PageNum]);

  return (
    <div className="mount_record">
      <div className="record_title">
        <img
          src={return_img}
          onClick={() => {
            Navigate(-1);
          }}
        />
        <div> {t("认购记录")}</div>
        <div className="null"></div>
      </div>

      <div className="record_content">
        <div>
          <div className="title items">
            <div className="item">{t("Time")}</div>
            <div className="item">{t("金额USDT")}</div>
            <div className="item">{t("待释放")}</div>
            <div className="item"></div>
          </div>
          <div className="line"></div>
          <div>
            {/* RecordList3?.records */}
            {RecordList3?.records?.length > 0 ? (
              RecordList3?.records?.map((item: any, index: any) => (
                <div key={index} className="content items">
                  <div className="item">
                    {dateFormat("mm/dd", new Date(item?.createTime))}
                  </div>
                  <div
                    className="item"
                    // style={{ textDecoration: "underline" }}
                    // onClick={() => {
                    //   copy(item?.nodeAddress);
                    //   addMessage(t("Copied successfully"));
                    // }}
                  >
                    {item?.awardQuota}
                  </div>
                  <div className="item">{item?.treatQuota}</div>

                  <div className="item">
                    {item?.status === 0 ? (
                      <div
                        className="cancel_mount"
                        onClick={() => {
                          Navigate("/View/pending_get");
                        }}
                      >
                        {t("去领取")}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10.8539 7.36678L6.21481 4.16336C6.08426 4.07322 5.92846 4.01791 5.76499 4.00367C5.60153 3.98943 5.43692 4.01683 5.28976 4.08278C5.1426 4.14873 5.01876 4.2506 4.93222 4.37688C4.84569 4.50316 4.7999 4.64882 4.80005 4.79741L4.80005 11.2033C4.80004 11.3518 4.84592 11.4974 4.93251 11.6235C5.0191 11.7497 5.14296 11.8515 5.29009 11.9174C5.43722 11.9832 5.60177 12.0106 5.76517 11.9963C5.92857 11.9821 6.08431 11.9267 6.21481 11.8366L10.8539 8.63322C10.9615 8.55886 11.0487 8.46304 11.1088 8.35322C11.1688 8.2434 11.2 8.12252 11.2 8C11.2 7.87748 11.1688 7.7566 11.1088 7.64678C11.0487 7.53696 10.9615 7.44114 10.8539 7.36678Z"
                            fill="#6B72FF"
                          />
                        </svg>
                      </div>
                    ) : (
                      t("已结束")
                    )}
                  </div>
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
            pageSize={20}
            onChange={onChange}
            total={RecordList3?.total}
            showQuickJumper={false}
            defaultCurrent={1}
            itemRender={itemRender}
          />
        </div>
      </div>
    </div>
  );
}
