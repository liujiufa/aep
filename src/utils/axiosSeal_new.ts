import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from "axios"; // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
// import { Decrypt, Encrypt } from "../utils/encryption.js";
import i18n from "i18next";
import store from "../store";
import { decrypt, encrypt } from "./encryption_new";
import {
  decryptBase64,
  decryptWithAes,
  encryptBase64,
  encryptWithAes,
  generateAesKey,
} from "./crypto";
class HttpRequest {
  // 定义一个接口请求类，用于创建一个axios请求实例
  constructor(public baseUrl: string) {
    // 这个类接收一个字符串参数，是接口请求的基本路径
    this.baseUrl = baseUrl;
  }
  public request(options: AxiosRequestConfig): AxiosPromise {
    // 我们实际调用接口的时候调用实例的这个方法，他返回一个AxiosPromise
    const instance: AxiosInstance = axios.create(); // 这里使用axios.create方法创建一个axios实例，他是一个函数，同时这个函数包含多个属性
    options = this.mergeConfig(options); // 合并基础路径和每个接口单独传入的配置，比如url、参数等
    this.interceptors(instance, options.url); // 调用interceptors方法使拦截器生效
    return instance(options); // 最后返回AxiosPromise
  }
  private interceptors(instance: AxiosInstance, url?: string) {
    // 定义这个函数用于添加全局请求和响应拦截逻辑
    // 在这里添加请求和响应拦截
    instance.interceptors.request.use(
      (config: any) => {
        // config.headers.lang = 'en'
        if (
          (config.method === "POST" || config.method === "post") &&
          config?.data.Encrypt
        ) {
          // config.data = Encrypt(JSON.stringify(config.data));
          // 生成一个 AES 密钥
          const aesKey = generateAesKey();
          config.headers["encrypt-key"] = encrypt(encryptBase64(aesKey));
          config.data =
            typeof config.data === "object"
              ? encryptWithAes(JSON.stringify(config.data), aesKey)
              : encryptWithAes(config.data, aesKey);
        }
        // config.data=Encrypt(JSON.stringify(config.data))
        // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
        // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      async (res: any) => {
        // 如果响应数据是加密的，需要解密
        const keyStr = res.headers["encrypt-key"];
        // 加密
        if (typeof res.data === "string" && keyStr != null && keyStr != "") {
          const data = res.data;
          // 请求体 AES 解密
          const base64Str = decrypt(keyStr);
          // base64 解码 得到请求头的 AES 秘钥
          const aesKey = decryptBase64(base64Str.toString());
          // aesKey 解码 data
          const decryptData = decryptWithAes(data, aesKey);
          // 将结果 (得到的是 JSON 字符串) 转为 JSON
          return JSON.parse(decryptData);
        } else {
          return res.data;
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    // 这个方法用于合并基础路径配置和接口单独配置
    let state = store.getState();
    return Object.assign(
      {
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: state.token,
          lang: i18n.language,
        },
      },
      options
    );
  }
}
export default HttpRequest;
