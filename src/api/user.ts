import service from "@/axios/service";

/**
 * 登录操作
 * @param data
 * @param data.phone 手机号码
 * @param data.verify 验证码
 */
export function ApiLogin(data) {
  return service.post("/user/login", data);
}

/**
 * 获取验证码
 * @param phone 手机号码
 */
export function ApiGetVerify(phone) {
  return service.get("/user/getVerify", {
    phone
  });
}
