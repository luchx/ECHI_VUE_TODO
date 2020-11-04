const jwt = require("jsonwebtoken");
const { secretKey } = require("@config").jwt;
const UserModel = require("@models/user");

// jwt 错误处理方法
async function authVerify(ctx, next) {
  if (!ctx.header || !ctx.header.authorization) {
    return ctx.fail("token效验错误1");
  }
  const parts = ctx.header.authorization.split(" ");
  if (parts.length === 2) {
    // Bearer 字段
    const schema = parts[0];
    // token 字段
    const token = parts[1];
    if (/^Bearer$/i.test(schema)) {
      let decode;
      try {
        decode = jwt.verify(token, secretKey);
      } catch (err) {
        return ctx.fail("token效验错误2", 1001);
      }

      const user = await UserModel.findByPk(decode.userId);
      console.log({
        user,
      });
      if (!user) {
        return ctx.fail("该用户不存在");
      }

      // 把 user 挂在 ctx 上
      ctx.currentUser = {
        ...user,
        userId: user.id,
      };

      return next();
    }
  }

  ctx.fail("token效验错误3", 1001);
}

module.exports = {
  authVerify,
};
