// 校验手机
export function TestPhone(phone) {
  const reg = /^((13[0-9])|(15[^4])|(166)|(17[0-8])|(18[0-9])|(19[8-9])|(14[5|7]))\d{8}$/;
  return reg.test(phone);
}
