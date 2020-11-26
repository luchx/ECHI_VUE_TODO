import { local } from "./storage";
import router from "/@/router";

// 返回空对象
export const noop = () => {};

/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
export function isType(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}

export function setToken(token: string): void {
  const three_Hours = 60 * 60 * 3;
  local.set("token", `Bearer ${token}`, three_Hours);
}

export function getToken(): string {
  return local.get("token");
}

export function clearAuth() {
  // 需要重新获取token
  local.remove("token");
  local.remove("userInfo");
  router.push("/login");
}