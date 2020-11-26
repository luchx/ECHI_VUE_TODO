import service from "/@/axios/service";

type Login = {
  phone: number;
  verify: number;
};

/**
 * 登录操作
 * @param {Object} data
 * @param {Number} data.phone 手机号码
 * @param {Number} data.verify 验证码
 */
export function ApiLogin(data: Login) {
  return service.post("/api/user/login", data);
}

/**
 * 获取验证码
 * @param {Number} data.phone 手机号码
 */
export function ApiGetVerify(phone: number) {
  return service.get("/api/user/verify", {
    phone
  });
}
