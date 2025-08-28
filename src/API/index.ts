import axois from "../utils/axiosExport";
interface LoginData {
  password: string;
  refereeUserAddress: string;
  userAddress: string;
  userPower: number;
}

export function Login(data: any) {
  return axois.request({
    url: "/user/login",
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
export function getNodeData() {
  return axois.request({
    url: `/user/getNodeData`,
    method: "get",
  });
}
export function getUserNodeData() {
  return axois.request({
    url: `/user/getUserNodeData`,
    method: "get",
  });
}
export function getMineData() {
  return axois.request({
    url: `/home/getMineData`,
    method: "get",
  });
}
export function getEarnData() {
  return axois.request({
    url: `/home/getEarnData`,
    method: "get",
  });
}
export function getNodeUserList(address: any) {
  return axois.request({
    url: `/home/getNodeUserList/${address}`,
    method: "get",
  });
}
export function getPledgeData() {
  return axois.request({
    url: `/pledge/getPledgeData`,
    method: "get",
  });
}
export function getUserPledgeData() {
  return axois.request({
    url: `/user/getUserPledgeData`,
    method: "get",
  });
}
export function getBoxList() {
  return axois.request({
    url: `/box/getBoxList`,
    method: "get",
  });
}
export function getBoxUserInfo() {
  return axois.request({
    url: `/box/getBoxUserInfo`,
    method: "get",
  });
}
export function updateNickName(data: any) {
  return axois.request({
    url: "/user/updateNickName",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getPledgeOrder(data: any) {
  return axois.request({
    url: "/pledge/getPledgeOrder",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function mountNode(data: any) {
  return axois.request({
    url: "/home/mountNode",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function cancelMountNode(data: any) {
  return axois.request({
    url: "/home/cancelMountNode",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getMountRecord(data: any) {
  return axois.request({
    url: "/home/getMountRecord",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getMountUserList(data: any) {
  return axois.request({
    url: "/home/getMountUserList",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getFriends(data: any) {
  return axois.request({
    url: "/user/getFriends",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
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
export function getDrawRecord(data: any) {
  return axois.request({
    url: "/user/getDrawRecord",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getNodeRecord(data: any) {
  return axois.request({
    url: "/user/getNodeRecord",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getNodeMountUserOrder(data: any) {
  return axois.request({
    url: "/user/getNodeMountUserOrder",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getUserNodeRecord(data: any) {
  return axois.request({
    url: "/user/getUserNodeRecord",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getBoxOrderList(data: any) {
  return axois.request({
    url: "/box/getBoxOrderList",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getBoxUserDetail(data: any) {
  return axois.request({
    url: "/box/getBoxUserDetail",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
export function getBoxUserDrawDetail(data: any) {
  return axois.request({
    url: "/box/getBoxUserDrawDetail",
    method: "post",
    data: {
      ...data,
      // Encrypt: true,
    },
  });
}
