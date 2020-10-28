const moment = require("moment");
const bcrypt = require("bcryptjs");
const { Sequelize, Model } = require("sequelize");

// 定义用户模型
class UserModel extends Model {}

// 初始用户模型
UserModel.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键id",
    },
    uid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      comment: "用户 uuid"
    },
    nickname: {
      type: Sequelize.STRING(50),
      comment: "用户昵称",
    },
    userName: {
      type: Sequelize.STRING(50),
      comment: "用户名称",
    },
    email: {
      type: Sequelize.STRING(128),
      unique: true,
      comment: "用户邮箱",
    },
    phone: {
      type: Sequelize.STRING(11),
      unique: true,
      allowNull: false,
      comment: "用户手机号",
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
      comment: "用户密码",
    },
    avatar: {
      type: Sequelize.TEXT,
      comment: "用户头像",
    },
    description: {
      type: Sequelize.STRING(100),
      comment: "用户描述签名",
    },
    gender: {
      type: Sequelize.ENUM,
      values: ["1", "2"],
      defaultValue: "1",
      comment: "用户性别 【1 - 男 2 - 女】",
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD hh:dd:ss");
      },
    },
  },
  {
    sequelize: require("../helper/db"),
    modelName: "user",
    tableName: "user",
  }
);

module.exports = UserModel;
