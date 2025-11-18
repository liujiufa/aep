// utils/encryptInterceptor.js
import EncryptUtils from "./encryption";

// 配置（这些应该从环境变量或配置文件中获取）
const CONFIG = {
  RSA_PUBLIC_KEY: process.env.REACT_APP_RSA_PUBLIC_KEY || "你的RSA公钥",
  ENCRYPT_ENABLED: process.env.REACT_APP_ENCRYPT_ENABLED === "true" || true,
};

class EncryptInterceptor {
  /**
   * 处理请求加密
   */
  static async encryptRequest(data) {
    if (!CONFIG.ENCRYPT_ENABLED) {
      return { data, headers: {} };
    }

    try {
      // 1. 生成随机AES密钥
      const aesKey = EncryptUtils.generateAesKey();

      // 2. 对AES密钥进行Base64编码
      const base64AesKey = EncryptUtils.encryptByBase64(aesKey);

      // 3. 使用RSA公钥加密Base64编码后的AES密钥
      const encryptedAesKey = EncryptUtils.encryptByRsa(
        base64AesKey,
        CONFIG.RSA_PUBLIC_KEY
      );

      // 4. 使用AES密钥加密请求数据
      const requestData =
        typeof data === "string" ? data : JSON.stringify(data);
      const encryptedData = EncryptUtils.encryptByAes(requestData, aesKey);

      // 返回加密后的数据和请求头
      return {
        data: encryptedData,
        headers: {
          "X-Encrypted-Key": encodeURIComponent(encryptedAesKey),
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      console.error("请求加密失败:", error);
      throw new Error("数据加密失败");
    }
  }

  /**
   * 处理响应解密
   */
  static async decryptResponse(encryptedData, aesKey) {
    if (!CONFIG.ENCRYPT_ENABLED || !encryptedData) {
      return encryptedData;
    }

    try {
      const decryptedData = EncryptUtils.decryptByAes(encryptedData, aesKey);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("响应解密失败:", error);
      throw new Error("数据解密失败");
    }
  }
}

export default EncryptInterceptor;
