import service from "@/axios/service";

/**
 * 登录操作
 * @param data
 * @param data.email
 * @param data.password
 */
export function ApiLogin(data) {
  return service.post("/user/login", data);
}
