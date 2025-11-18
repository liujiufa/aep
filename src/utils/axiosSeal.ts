import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from "axios"; // 引入axios和定义在node_modules/axios/index.ts文件里的类型声明
// import { Decrypt, Encrypt } from "../utils/encryption.js";
import i18n from "i18next";
import store from "../store";
import { json } from "stream/consumers";
import EncryptInterceptor from "./encryptInterceptor";
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
    // instance.interceptors.request.use(
    //   (config: any) => {
    //     // config.headers.lang = 'en'
    //     if (
    //       (config.method === "POST" || config.method === "post") &&
    //       config?.data.Encrypt
    //     ) {
    //       config.data = Encrypt(JSON.stringify(config.data));
    //     }
    //     // config.data=Encrypt(JSON.stringify(config.data))
    //     // 接口请求的所有配置，都在这个config对象中，他的类型是AxiosRequestConfig，你可以看到他有哪些字段
    //     // 如果你要修改接口请求配置，需要修改 axios.defaults 上的字段值
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   }
    // );
    instance.interceptors.response.use(
      async (response: any) => {
        // 如果响应数据是加密的，需要解密
        if (response.config.encrypt !== false && response.data) {
          // 注意：在实际应用中，您需要从某个地方获取AES密钥
          // 这通常通过请求头或其他机制传递
          // 这里简化处理，实际需要根据后端设计调整
          try {
            // const aesKey = getAesKeyFromSomewhere();
            response.data = await EncryptInterceptor.decryptResponse(
              "jDbPK7c7UBpyxSI0U800QHWH+89rGhMnaGHeExZCGK8S8c/6v8AkHvnitQi3WdW45M4MYWKWl4dYsrniKFcLFTuBIhPE4dsdKwxpw1ZAW8nYml9WfwPfUKkZKzlqpPu9BFKtwsxJTI/AtoyfwmoVssBDsF5Xog8F60eQlaeYsnZH52w+gWGJLTgHSeEhvtaWGXSkUuwDH0nJt/huGMo+mt/vaDetxwZ91ccMGeB0rXt7WmWT5GHi7qTwOJkP3S7BjUEjpCJxjloedxV+gPQzsDu0X/9LqeY+0oRoyBVa5Tm7/7gYT1iBBdUJ0rcwyFzujArnKeShvhtqqh3/ol2YVbuSXZXrAxwdGG8IoEc2mWz883TvIganA9KiyIVVxAjEi1BuYvvUL91nErS/HG/7ZetkRJSc7TPQQLFdxLC2XPXWjb2LKZWBEBCVfCs9d0F1",
              "MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAmc3CuPiGL/LcIIm7zryCEIbl1SPzBkr75E2VMtxegyZ1lYRD+7TZGAPkvIsBcaMs6Nsy0L78n2qh+lIZMpLH8wIDAQABAkEAk82Mhz0tlv6IVCyIcw/s3f0E+WLmtPFyR9/WtV3Y5aaejUkU60JpX4m5xNR2VaqOLTZAYjW8Wy0aXr3zYIhhQQIhAMfqR9oFdYw1J9SsNc+CrhugAvKTi0+BF6VoL6psWhvbAiEAxPPNTmrkmrXwdm/pQQu3UOQmc2vCZ5tiKpW10CgJi8kCIFGkL6utxw93Ncj4exE/gPLvKcT+1Emnoox+O9kRXss5AiAMtYLJDaLEzPrAWcZeeSgSIzbL+ecokmFKSDDcRske6QIgSMkHedwND1olF8vlKsJUGK3BcdtM8w4Xq7BpSBwsloE="
            );
            console.log(response, "response");
            debugger;
          } catch (error) {
            console.error("响应解密失败:", error);
          }
        }
        return response;
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
