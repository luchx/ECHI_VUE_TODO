const moment = require("moment");
const {
  Sequelize,
  Model
} = require("sequelize");

// 定义用户模型
class TodoModel extends Model {}

// 初始用户模型
TodoModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键id",
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: Sequelize.UUIDV4,
    comment: "用户 id"
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: "任务标题",
  },
  description: {
    type: Sequelize.TEXT,
    comment: "任务描述",
  },
  priority: {
    type: Sequelize.ENUM,
    values: ["1", "2", "3", "4"],
    allowNull: false,
    defaultValue: 1,
    comment: "任务优先级 【1 - 低 2 - 中 3 - 高 4 - 最高】",
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM,
    values: ["1", "2", "3"],
    allowNull: false,
    defaultValue: 1,
    comment: "任务状态 【1 - 待办 2 - 已完成 3 - 处于回收站】",
  },
  isFinished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否已完成",
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
}, {
  sequelize: require("../helper/db"),
  modelName: "todo",
  tableName: "todo",
});

module.exports = TodoModel;