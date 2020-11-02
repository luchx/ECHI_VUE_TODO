const jwt = require("jsonwebtoken");
const { secretKey, whiteList, expired } = require("../config").secret;
// jwt 令牌
exports.secret = secretKey;

// jwt 白名单
exports.whiteList = whiteList;

// jwt 错误处理方法
exports.errorHandle = function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 1001,
        message: "token效验错误",
        data: null,
      };
    } else {
      throw err;
    }
  });
};

// 生成 token
exports.getToken = (payload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: expired,
  });
};

// 校验 token
exports.verifyToken = async (ctx, next) => {
  const { authorization } = ctx.header;
  const auth = jwt.verify(authorization.split(" ")[1], secretKey);
  ctx.currentUser = auth;
  await next()
};
