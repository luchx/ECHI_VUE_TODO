const jwt = require("jsonwebtoken");
const { secretKey, whiteList, expired } = require("../config").secret;

// jwt 错误处理方法
function errorHandle(ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
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
function getToken(payload) {
  return jwt.sign(payload, secretKey, {
    expiresIn: expired,
  });
};

// 校验 token
async function verifyToken(ctx, next) {
  const { authorization } = ctx.header;
  const auth = jwt.verify(authorization.split(" ")[1], secretKey);
  ctx.currentUser = auth;
  
  await next();
};

module.exports = {
  secret: secretKey, // jwt 令牌
  whiteList, // jwt 白名单
  getToken,
  verifyToken,
  errorHandle
};