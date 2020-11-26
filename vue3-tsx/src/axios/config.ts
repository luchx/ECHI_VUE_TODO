import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { clearAuth } from "/@/utils";

// 超时重新请求配置
const VUE_APP_URL = "http://localhost:3000";

const axiosConfig: AxiosRequestConfig = {
  baseURL: VUE_APP_URL,
  // 超时设置20s
  timeout: 20000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "If-Modified-Since": 0 // 防止get请求在IE下被缓存
  }
};

// 修改axios配置信息
const service = axios.create(axiosConfig);

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  response => {
    const data = response.data;
    // 1001: token失效
    if (data.code === 1001) {
      // 需要重新获取token
      clearAuth();
    }
    return response;
  },
  (error: AxiosError) => {
    if (error && error.response) {
      const RESPONSE_CODE = {
        400: "请求参数错误",
        403: "拒绝访问",
        404: "请求超时",
        500: "服务器内部错误",
        501: "服务未实现",
        502: "网关错误",
        503: "服务不可用",
        504: "网关超时",
        505: "HTTP版本不受支持"
      };
      error.message =
        RESPONSE_CODE[error.response.status] || "服务器开小差！！";
    }
    return Promise.reject(error);
  }
);
export default service;
