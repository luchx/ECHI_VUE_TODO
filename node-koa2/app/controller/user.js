const bcrypt = require("bcryptjs");
const { getToken } = require("@core/jwt");
const { TestPhone } = require("@core/validator");
const UserModel = require("@models/user");

const verifyCode = "1234";

// 登录
async function login(ctx) {
  const { phone, password, code } = ctx.request.body;

  if (!TestPhone(phone)) {
    return ctx.fail("手机号码不正确", 400);
  }

  if (!password && code !== verifyCode) {
    return ctx.fail("验证码不正确", 400);
  }

  if (!password && !code) {
    return ctx.fail("请输入密码", 400);
  }

  const [existUser, created] = await UserModel.findOrCreate({
    where: {
      phone,
      deletedAt: null
    },
    defaults: {
      phone,
      password,
    }
  });

  // 返回格式化数据
  const userData = {
    id: existUser.id,
    nickname: existUser.nickname,
    userName: existUser.userName,
    email: existUser.email,
    phone: existUser.phone,
    avatar: existUser.avatar,
    description: existUser.description,
    gender: existUser.gender,
  }

  const token = getToken({
    userId: userData.id,
    phone: userData.phone,
  });

  // 将用户信息存到全局对象中
  ctx.currentUser = existUser;

  // 初次登录，创建用户
  if (created) {
    return ctx.success("登录成功", {
      token,
      user: userData,
    });
  }

  // 对比已存在的密码，code 方式登录不校验
  const correct = bcrypt.compareSync(password, existUser.password);
  if (!code && !correct) {
    return ctx.fail("密码不正确", 400);
  }
  
  ctx.success("欢迎回来", {
    token,
    user: userData,
  });
}

async function verify(ctx) {
  const { phone } = ctx.query;
  if (!TestPhone(phone)) {
    return ctx.fail("手机号码不正确", 400);
  }

  ctx.success("获取验证码成功", verifyCode);
}

async function detail(ctx) {
  const { id } = ctx.params;
  const user = await UserModel.findOne({
    where: {
      id,
      deletedAt: null
    },
    attributes: ["id", "nickname", "userName", "email", "phone", "avatar", "description", "gender"]
  });

  if (!user) {
    return ctx.fail("账号不存在");
  }

  return ctx.success("获取用户成功", user);
};

module.exports = {
  login,
  verify,
  detail,
};
