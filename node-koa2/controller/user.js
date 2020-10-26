const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

class UserController {
  // 创建用管理员
  static async create(params) {
    const {
      email,
      password,
      nickname
    } = params;

    const hasUser = await UserModel.findOne({
      where: {
        email,
        deleted_at: null
      }
    });

    if (hasUser) {
      throw new global.errs.Existing('管理员已存在');
    }

    const user = new UserModel();
    user.nickname = nickname
    user.email = email
    user.password = password
    user.save();

    return {
      email: user.email,
      nickname: user.nickname
    }
  }

  // 验证密码
  static async verify(email, plainPassword) {

    // 查询用户是否存在
    const user = await UserModel.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }

    // 验证密码是否正确
    const correct = bcrypt.compareSync(plainPassword, user.password);

    if (!correct) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }

    return user
  }

  // 查询管理员信息
  static async detail(id) {
    const scope = 'bh';
    // 查询管理员是否存在
    const user = await UserModel.scope(scope).findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new global.errs.AuthFailed('账号不存在或者密码不正确')
    }

    return user
  }
}

module.exports = UserController