import { useCallback, useMemo } from "react";
import { Contract } from "web3-eth-contract";
import { provider } from "web3-core";
import Web3 from "web3";
import { abiObj, contractAddress, isMain } from "./config";
import BigNumber from "big.js";
import { log } from "console";
import { getFullNum } from "./utils/tool";
declare let window: any;
interface contractType {
  [propName: string]: Contract;
}
export const ChainId = {
  // BSC: "0x61",
  BSC: isMain ? "0x38" : "0x61",
};
//切换链
const SCAN_ADDRESS = {
  [ChainId.BSC]: "https://scan.demonchain.io/",
};
//配置连接链的信息
export const networkConf = {
  [ChainId.BSC]: {
    // chainId: '0x61',
    chainId: isMain ? "0x38" : "0x61",
    chainName: "BSC",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: isMain
      ? ["https://bsc-dataseed.binance.org/"]
      : ["http://192.252.179.83:8546/"],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
};

export class Contracts {
  //单例
  static example: Contracts;
  web3: Web3;
  contract: contractType = {};
  constructor(library: any) {
    // console.log(library, "library");

    this.web3 = new Web3(library);
    //保存实例到静态属性
    Contracts.example = this;
  }
  //判断合约是否实例化
  verification(contractName: string) {
    if (!this.contract[contractName]) {
      this.contract[contractName] = new this.web3.eth.Contract(
        abiObj[contractName],
        contractAddress[contractName]
      );
    }
  }
  //合约的方法

  //查询gas
  getGasPrice(addr: string) {
    return this.web3.eth.getGasPrice();
  }
  //查询BNB余额
  getBalance(addr: string) {
    return this.web3.eth.getBalance(addr);
  }
  //查询余额
  balanceOf(addr: string, tokenAddress: string) {
    let obj = new this.web3.eth.Contract(abiObj["USDT"], tokenAddress);
    // debugger;
    return obj?.methods.balanceOf(addr).call({ from: addr });
  }
  //查询授权
  Tokenapprove(addr: string, toaddr: string, tokenAddress: string) {
    let obj = new this.web3.eth.Contract(abiObj["USDT"], tokenAddress);
    return obj?.methods.allowance(addr, toaddr).call({ from: addr });
  }
  symbol(addr: string, tokenAddress: string) {
    let obj = new this.web3.eth.Contract(abiObj["USDT"], tokenAddress);
    return obj?.methods.symbol().call({ from: addr });
  }
  //授权1
  approve(addr: string, toaddr: string, tokenAddress: string, value: string) {
    let obj = new this.web3.eth.Contract(abiObj["USDT"], tokenAddress);
    var amount = Web3.utils.toWei(String(Number(value) + 1));
    console.log(toaddr, amount, "########", obj, "*******");
    return obj?.methods
      .approve(toaddr, amount)
      .send({ from: addr, gasPrice: "1200000000" });
  }

  //授权所有NFT
  setApprovalForAll(addr: string, toAddr: string, isApprova: boolean) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .setApprovalForAll(toAddr, isApprova)
      .send({ from: addr, gasPrice: "1200000000" });
  }

  //判断NFT授权
  isApprovedForAll(addr: string, toAddr: string) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .isApprovedForAll(addr, toAddr)
      .call({ from: addr });
  }
  //签名数据
  Sign(addr: string, msg: string) {
    console.log(msg, "msg");
    return this.web3.eth.personal.sign(
      this.web3.utils.utf8ToHex(msg) as string,
      addr,
      "123"
    );
  }
  //奖励领取
  withdrawReward(addr: string, data: string, contractAddress: string) {
    // this.verification("Distribute");
    let obj = new this.web3.eth.Contract(abiObj.PrizePool, contractAddress);
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    console.log(data, "data");
    return obj?.methods
      .withdrawReward(data)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  //盲盒奖励领取
  withdrawReward1(addr: string, data: string, contractAddress: string) {
    // this.verification("Distribute");
    let obj = new this.web3.eth.Contract(abiObj.PrizePool, contractAddress);
    const mathRandom = (Math.random() * (0.000139 - 0.00012) + 0.00012).toFixed(
      8
    );
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    console.log(data, "data");
    return obj?.methods
      .withdrawReward(data)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  //奖励ido领取
  withdraw(addr: string, data: string, contractAddress: string) {
    // this.verification("Distribute");
    let obj = new this.web3.eth.Contract(abiObj.PrivateSale, contractAddress);
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    console.log(data, "data");
    return obj?.methods
      .withdraw(data)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  //查询绑定
  userBindInfo(addr: string) {
    this.verification("Referrer");
    return this.contract.Referrer?.methods
      .userBindInfo(addr)
      .call({ from: addr });
  }

  bind(addr: string, inviteAddress: string, amount: any) {
    this.verification("Bind");
    console.log(this.contract.Bind, "this.contract.Bind");
    return this.contract.Bind?.methods
      .bind(inviteAddress)
      .send({ from: addr, gasPrice: "1200000000", value: amount });
  }
  stake(addr: string, type: string, amount: any) {
    this.verification("Pledge");
    var amounted = Web3.utils.toWei(amount + "", "ether");
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    return this.contract.Pledge?.methods
      .stake(amounted, type)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  mint(addr: string, data: any) {
    this.verification("NFT");
    // var amounted = Web3.utils.toWei(amount + "", "ether");
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    return this.contract.NFT?.methods
      .mint(data)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  recharege(addr: string, data: any) {
    this.verification("ORATopUp");
    // var amounted = Web3.utils.toWei(amount + "", "ether");
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    return this.contract.ORATopUp?.methods
      .recharege(data)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  createOrder(
    addr: string,
    tokenId: any,
    price: any,
    tokenAddress: any,
    nftAddr: any
  ) {
    this.verification("NFTTrade");
    var priceed = Web3.utils.toWei(price + "", "ether");
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    return this.contract.NFTTrade?.methods
      .createOrder(tokenId, priceed, tokenAddress, nftAddr)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  cancelOrder(addr: string, orderId: any) {
    this.verification("NFTTrade");
    // var priceed = Web3.utils.toWei(price + "", "ether");
    // debugger;
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    console.log(this.contract.NFTTrade?.methods, orderId, "111");
    return this.contract.NFTTrade?.methods
      .cancelOrder(orderId)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  takeOrder(addr: string, orderId: any) {
    this.verification("NFTTrade");
    // var priceed = Web3.utils.toWei(price + "", "ether");
    // debugger;
    const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    const valued = Web3.utils.toWei(mathRandom + "", "ether");
    return this.contract.NFTTrade?.methods
      .takeOrder(orderId)
      .send({ from: addr, gasPrice: "1200000000", value: valued });
  }
  privateSale(addr: string, data: any, contractAddress: any, amount: any) {
    let obj = new this.web3.eth.Contract(abiObj.PrivateSale, contractAddress);
    console.log(data, contractAddress, "ido");
    // var amounted = Web3.utils.toWei(amount + "", "ether");
    // const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);
    // const valued = Web3.utils.toWei(mathRandom + "", "ether");
    // var amounted = getFullNum(amount);

    return obj?.methods
      .privateSale(data)
      .send({ from: addr, gasPrice: "1200000000", value: amount });
  }
  bindingFee(addr: string) {
    this.verification("Bind");
    return this.contract.Bind?.methods.bindingFee().call({ from: addr });
  }
}
