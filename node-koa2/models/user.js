const moment = require('moment');
const bcrypt = require('bcryptjs')
const {
  sequelize
} = require('../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')

// 定义用户模型
class User extends Model {

}

// 初始用户模型
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '用户名称'
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    allowNull: false,
    comment: '用户邮箱'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    comment: "用户描述签名"
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10);
      // 生成加密密码
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue("password", psw);
    },
    allowNull: false,
    comment: '用户密码'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'user',
  tableName: 'user'
})

module.exports = {
  User
}