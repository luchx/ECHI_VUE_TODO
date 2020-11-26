import service from "/@/axios/service";

/**
 * 登录操作
 * @param {Object} data
 * @param {Number} data.phone 手机号码
 * @param {Number} data.verify 验证码
 */
export function ApiLogin(data) {
  return service.post("/api/user/login", data);
}

/**
 * 获取验证码
 * @param {Number} data.phone 手机号码
 */
export function ApiGetVerify(phone) {
  return service.get("/api/user/verify", {
    phone
  });
}
