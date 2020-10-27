const jwt = require("jsonwebtoken");
const secret = "toto_jwt";
// jwt 令牌
exports.secret = secret;

// jwt 白名单
exports.whiteList = [/^\/api\/user\/login/];

// jwt 错误处理方法
exports.errorHandle = function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "token效验 错误",
        data: null,
      };
    } else {
      throw err;
    }
  });
};

// 生成 token
exports.getToken = (payload) => {
  return jwt.sign(payload, secret, {
    expiresIn: "2h",
  });
};

// 校验 token
exports.verifyToken = (payload) => {
  return jwt.verify(payload, secret);
};
