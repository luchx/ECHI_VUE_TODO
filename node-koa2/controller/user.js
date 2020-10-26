const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

// 登录
exports.login = async (ctx) => {
  const { email, password, nickname } = ctx.request.body;
  const hasUser = await UserModel.findOne({
    where: {
      email,
      deleted_at: null,
    },
  });

  if (hasUser) {
    ctx.body = {
      code: 500,
      message: "账号已存在",
      data: null
    };
    return;
  }

  const user = new UserModel();
  user.nickname = nickname;
  user.email = email;
  user.password = password;
  user.save();

  ctx.body = {
    code: 0,
    message: "登录成功",
    data: {
      email: user.email,
      nickname: user.nickname,
    }
  };
};

exports.verify = async (ctx) => {
  const { email } = ctx.request.body;
  // 查询用户是否存在
  const user = await UserModel.findOne({
    where: {
      email,
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
