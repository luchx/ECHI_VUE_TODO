const bcrypt = require("bcryptjs");
const { getToken, verifyToken } = require("../helper/jwt");
const { TestPhone } = require("../helper/validator");
const UserModel = require("../models/user");

// 登录
async function login(ctx) {
  const { phone, password = "", code = "" } = ctx.request.body;

  if (!TestPhone(phone)) {
    return ctx.fail("手机号码不正确", 400);
  }

  if (password === "" && code !== "1234") {
    return ctx.fail("验证码不正确", 400);
  }

  if (password === "" && code === "") {
    return ctx.fail("请输入密码", 400);
  }

  const existUser = await UserModel.findOne({
    where: {
      phone,
      is_deleted: 0,
    },
  });

  if (!existUser) {
    const user = await UserModel.create({
      phone,
      password,
    });

    const token = getToken({
      uid: user.uid,
      phone: user.phone,
    });
    ctx.currentUser = user;
    return ctx.success("登录成功", {
      token,
      user,
    });
  }

  const correct = bcrypt.compareSync(password, existUser.password);
  if (code === "" && !correct) {
    return ctx.fail("密码不正确");
  }

  const token = getToken({
    uid: existUser.uid,
    phone: existUser.phone,
  });
  ctx.currentUser = existUser;
  ctx.success("欢迎回来", {
    token,
    user: existUser,
  });
}

async function getVerify(ctx) {
  const { phone } = ctx.query;
  if (!TestPhone(phone)) {
    return ctx.fail("手机号码不正确", 400);
  }

  ctx.success("获取验证码成功", "1234");
}

exports.detail = async (ctx) => {
  const { id } = ctx.request.params;
  const scope = "bh";
  // 查询管理员是否存在
  const user = await UserModel.scope(scope).findOne({
    where: {
      id,
    },
  });

  if (!user) {
    throw new global.errs.AuthFailed("账号不存在或者密码不正确");
  }

  return user;
};

module.exports = {
  login,
  getVerify,
};
