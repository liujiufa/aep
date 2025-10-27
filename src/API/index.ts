import axois from "../utils/axiosExport";
interface LoginData {
  password: string;
  refereeUserAddress: string;
  userAddress: string;
  userPower: number;
}

export function Login(data: any) {
  return axois.request({
    url: "/user/loginByPass",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getUserInfo() {
  return axois.request({
    url: `/user/getUserInfo`,
    method: "get",
  });
}
export function drawStakeReward(data: any) {
  return axois.request({
    url: "/user/draw",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}

export function aepIncomeList(data: any) {
  return axois.request({
    url: "/aepPay/aepIncomeList",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
// 购买AEP记录
export function aepPayList(data: any) {
  return axois.request({
    url: "/aepPay/aepPayList",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepList(data: any) {
  return axois.request({
    url: "/aepPay/aepList",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepPay(data: any) {
  return axois.request({
    url: "/aepPay/aepPay",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepPayInfo(data: any) {
  return axois.request({
    url: "/aepPay/aepPayInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
// 设置收货信息
export function aepSetReceiverInfo(data: any) {
  return axois.request({
    url: "/aepPay/aepSetReceiverInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function userIsBind(data: any) {
  return axois.request({
    url: "/user/userIsBind",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepChange24(data: any) {
  return axois.request({
    url: "/aepSwapInfo/aepChange24",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepKline(data: any) {
  return axois.request({
    url: "/aepSwapInfo/aepKline",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepSwapInfo(data: any) {
  return axois.request({
    url: "/aepSwapInfo/aepSwapInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepSwapInfoSwap(data: any) {
  return axois.request({
    url: "/aepSwapInfo/aepSwapInfoSwap",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepSwap(data: any) {
  return axois.request({
    url: "/aepSwapInfo/aepSwap",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepSwapRecord(data: any) {
  return axois.request({
    url: "/aepSwapInfo/aepSwapRecord",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepIncomeInfo(data: any) {
  return axois.request({
    url: "/aepIncome/aepIncomeInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepIncomeListReferee(data: any) {
  return axois.request({
    url: "/aepIncome/aepIncomeListReferee",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepIncomeListSales(data: any) {
  return axois.request({
    url: "/aepIncome/aepIncomeListSales",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepIncomeListTeam(data: any) {
  return axois.request({
    url: "/aepIncome/aepIncomeListTeam",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepAssetInfo(data: any) {
  return axois.request({
    url: "/aepUser/aepAssetInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepDrawWithdraw(data: any) {
  return axois.request({
    url: "/aepUser/aepDrawWithdraw",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepWithdrawRecord(data: any) {
  return axois.request({
    url: "/aepUser/aepWithdrawRecord",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepRefereeInfo(data: any) {
  return axois.request({
    url: "/aepUser/aepRefereeInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepRefereeList(data: any) {
  return axois.request({
    url: "/aepUser/aepRefereeList",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepIncomeListTop(data: any) {
  return axois.request({
    url: "/aepIncome/aepIncomeListTop",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function aepWithdrawInfo(data: any) {
  return axois.request({
    url: "/aepUser/aepWithdrawInfo",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
