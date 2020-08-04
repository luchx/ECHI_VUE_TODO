import { AxiosRequestConfig } from "axios";
import axios from "./config";

export interface RespondData {
  code: number;
  result: any;
  timestamp: Date;
  message: string;
}

// HTTP工具类
export default class Http {
  public static async request(params: AxiosRequestConfig) {
    // const toast = Toast.loading({
    //   duration: 0,
    //   forbidClick: true,
    //   message: "加载中..."
    // });
    const res = await axios(params);
    console.log("打印请求值 ☞", res.data);
    // 关闭 loading
    // toast.clear();
    return res.data as RespondData;
  }

  /**
   * get
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static get(url: string, params?: object, axiosConfig = {}) {
    return this.request({
      method: "GET",
      url,
      params,
      ...axiosConfig
    });
  }

  /**
   * put
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static put(url: string, data?: object, axiosConfig = {}) {
    return this.request({
      method: "PUT",
      url,
      data,
      ...axiosConfig
    });
  }

  /**
   * post
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static post(url: string, data?: object, axiosConfig = {}) {
    return this.request({
      method: "POST",
      url,
      data,
      ...axiosConfig
    });
  }

  /**
   * delete
   * @param [url] 地址
   * @param [params] 数据
   * @returns Promise
   */
  public static delete(url: string, params?: object, ...axiosConfig) {
    return this.request({
      method: "DELETE",
      url,
      params,
      ...axiosConfig
    });
  }
}
