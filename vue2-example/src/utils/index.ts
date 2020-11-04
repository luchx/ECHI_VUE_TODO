import { local } from "./storage";
import router from "@/router";

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
