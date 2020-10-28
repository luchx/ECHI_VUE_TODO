const bcrypt = require("bcryptjs");
const { getToken } = require("../helper/jwt");
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
      userId: user.id,
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
    userId: existUser.id,
    phone: existUser.phone,
  });
  ctx.currentUser = existUser;
  ctx.success("欢迎回来", {
    token,
    user: existUser,
  });
}

async function verify(ctx) {
  const { phone } = ctx.query;
  if (!TestPhone(phone)) {
    return ctx.fail("手机号码不正确", 400);
  }

  ctx.success("获取验证码成功", "1234");
}

async function detail(ctx) {
  const { id } = ctx.params;
  const user = await UserModel.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    throw ctx.fail("账号不存在");
  }

  return ctx.success("获取用户成功", user);
};

module.exports = {
  login,
  verify,
  detail,
};
