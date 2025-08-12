import React, { useEffect, useState } from "react";
import HeaderBox from "../components/HeaderBox";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useDisconnect,
} from "@reown/appkit/react";
import { Contracts } from "../web3";
import Web3 from "web3";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../utils/tool";
import { useDispatch, useSelector } from "react-redux";
import {
  exchangeLuck,
  getAiList,
  getPriceInfo,
  getUserAccountList,
  getUserInfo,
} from "../API";
import {
  contractAddress,
  curentBSCChainId,
  curentETHChainId,
  loginNetworkId,
} from "../config";
import { createLoginSuccessAction } from "../store/actions";
import { useSign } from "../hooks/useSign";
import { useTranslation } from "react-i18next";
import markdownit from "markdown-it";
import PageLoding from "../components/PageLoding";
import TopUpAiModal from "../components/TopUpAiModal";
import useUSDTGroup from "../hooks/useUSDTGroup";
import { useNoGas } from "../hooks/useNoGas";

const Home = () => {
  const { t } = useTranslation();
  const token = useSelector((state: any) => state?.token);
  const Navigate = useNavigate();
  const [QCModalState, setQCModalState] = useState(false);
  const [AiUseSwapModalState, setAiUseSwapModalState] = useState(false);
  const [AiList, setAiList] = useState<any>([]);
  const [UserAccountList, setUserAccountList] = useState<any>([]);
  const [UserInfo, setUserInfo] = useState<any>({});
  const { address: web3ModalAccount, isConnected } = useAppKitAccount();
  const [TopUpAiModalState, setTopUpAiModalState] = useState(false);
  const { caipNetwork, caipNetworkId, chainId, switchNetwork } =
    useAppKitNetwork();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();
  const { signFun } = useSign();
  const md = markdownit({ html: true, breaks: true });
  const {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress?.ORATopUp, contractAddress?.ORA);
  const { isNoGasFun } = useNoGas();

  const getInitDate = () => {
    getUserAccountList().then((res: any) => {
      setUserAccountList(res?.data || []);
    });
    getUserInfo().then((res: any) => {
      setUserInfo(res?.data || {});
    });
  };
  // 兑换AI使用次数
  const swapFun = async (num: any) => {
    if (web3ModalAccount) {
      // debugger;
      await signFun(
        (res: any) => {
          exchangeLuck({
            ...res,
            num: num,
          }).then((res: any) => {
            if (res.code === 200) {
              showLoding(false);
              getInitDate();
              setAiUseSwapModalState(false);
              return addMessage(t("兑换成功"));
            } else {
              showLoding(false);
              addMessage(res.msg);
            }
          });
        },
        `userAddress=${web3ModalAccount as string}`,
        () => {}
      );
    }
  };

  // 充值
  const TopUpFun = async (price: any, data: any) => {
    // return addMessage(t("Coming soon"));

    handleTransaction(
      Number(price ?? 0) + "",
      async (call: any) => {
        let abi_res: any = null;
        try {
          showLoding(true);
          if (!!(await isNoGasFun())) return showLoding(false);

          // let res: any = await aiRecharge({
          //   num: num,
          // });

          abi_res = await Contracts.example?.recharege(
            web3ModalAccount as string,
            data
          );
        } catch (error: any) {
          if (error?.code === 4001) {
            showLoding(false);
            return addMessage(t("failed"));
          }
        }
        if (!!abi_res?.status) {
          await call();
          setTimeout(() => {
            showLoding(false);
            getInitDate();
            // fun();
            setTopUpAiModalState(false);
            return addMessage(t("充值成功"));
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

  useEffect(() => {

  }, [web3ModalAccount]);
  useEffect(() => {
    if (!!token) {
      getInitDate();
    } else {
      setUserAccountList([]);
    }
  }, [token]);

  return (
    <div className="ai all_page_conttainer">
      <HeaderBox></HeaderBox>
      <div className="ai_content"></div>

      <TopUpAiModal
        balance={TOKENBalance ?? 0}
        TopUpFun={TopUpFun}
        ShowTipModal={TopUpAiModalState}
        close={() => {
          setTopUpAiModalState(false);
        }}
      />
    </div>
  );
};

export default Home;
