// utils/encryptUtils.js
import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

class EncryptUtils {
  /**
   * RSA加密（用于加密AES密钥）
   */
  static encryptByRsa(data, publicKey) {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const encrypted = encryptor.encrypt(data);
    return encrypted;
  }

  /**
   * Base64编码
   */
  static encryptByBase64(data) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
  }

  /**
   * AES加密
   */
  static encryptByAes(data, aesKey) {
    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesKey.substring(0, 16)); // 使用密钥前16位作为IV
    
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return encrypted.toString();
  }

  /**
   * AES解密（用于解密响应数据）
   */
  static decryptByAes(encryptedData, aesKey) {
    const key = CryptoJS.enc.Utf8.parse(aesKey);
    const iv = CryptoJS.enc.Utf8.parse(aesKey.substring(0, 16));
    
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Base64解码
   */
  static decryptByBase64(base64Data) {
    return CryptoJS.enc.Base64.parse(base64Data).toString(CryptoJS.enc.Utf8);
  }

  /**
   * 生成随机AES密钥
   */
  static generateAesKey(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}

export default EncryptUtils;