const bcrypt = require("bcryptjs");
const {
  getToken,
  verifyToken
} = require("../helper/jwt");
const UserModel = require("../models/user");

// 登录
exports.login = async (ctx) => {
  const {
    phone,
    password,
    nickname
  } = ctx.request.body;
  const existUser = await UserModel.findOne({
    where: {
      phone,
      is_deleted: 0,
    },
  });

  if (existUser) {
    const token = getToken({
      phone: existUser.phone,
      nickname: existUser.nickname,
    })
    ctx.body = {
      code: 500,
      message: "账号已存在",
      data: token,
      jj: verifyToken(token)
    };

    return;
  }

  const user = new UserModel();
  user.nickname = nickname;
  user.phone = phone;
  user.password = password;
  user.save();

  ctx.body = {
    code: 0,
    message: "登录成功",
    data: getToken({
      phone: user.phone,
      nickname: user.nickname,
    })
  };
};

exports.verify = async (ctx) => {
  const {
    phone
  } = ctx.request.body;
  // 查询用户是否存在
  const user = await UserModel.findOne({
    where: {
      phone,
    },
  });

  if (!user) {
    throw new global.errs.AuthFailed("账号不存在或者密码不正确");
  }

  // 验证密码是否正确
  const correct = bcrypt.compareSync(plainPassword, user.password);

  if (!correct) {
    throw new global.errs.AuthFailed("账号不存在或者密码不正确");
  }

  return user;
};

exports.detail = async (ctx) => {
  const {
    id
  } = ctx.request.params;
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