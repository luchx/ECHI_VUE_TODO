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
    allowNull: false,
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
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "任务优先级 【1 - 低 2 - 中 3 - 高 4 - 最高】",
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "任务状态 【1 - 待办 2 - 已完成】",
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue("createdAt")).format("YYYY-MM-DD HH:mm:ss");
    },
  },
}, {
  sequelize: require("@core/db"),
  modelName: "todo",
  tableName: "todo",
});

module.exports = TodoModel;