const {
  Op
} = require("sequelize");
const {
  verifyToken
} = require("../helper/jwt");
const TodoModel = require("../models/todo");

async function getList(ctx) {
  const {
    page,
    pageSize
  } = ctx.query;

  const todoData = await TodoModel.findAndCountAll({
    [Op.and]: [{
      status: 1
    }],
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1)
  });

  ctx.success("获取成功", {
    pagination: {
      page,
      pageSize,
      total: todoData.count,
      totalPage: Math.ceil(todoData.count / pageSize)
    },
    list: todoData.rows
  })
}

async function saveList(ctx) {
  const {
    id,
    date,
    description,
    priority,
    title
  } = ctx.request.body;
  const {
    authorization
  } = ctx.header;
  const userData = verifyToken(authorization);

  if (id) {
    const todoData = await TodoModel.update({
      date,
      description,
      priority,
      title,
      userId: userData.userId
    }, {
      where: {
        id
      }
    })

    return ctx.success("更新成功", todoData)
  }

  const todoData = await TodoModel.create({
    date,
    description,
    priority,
    title,
    userId: userData.userId
  })

  return ctx.success("创建成功", todoData)
}

async function getDetail(ctx) {
  const {
    id
  } = ctx.params;
  const {
    authorization
  } = ctx.header;
  const userData = verifyToken(authorization);
  
  const todoData = await TodoModel.findOne({
    where: {
      id,
      userId: userData.userId,
      isDeleted: 0
    }
  })
  if (!todoData) {
    return ctx.fail("没有找到该记录")
  }

  ctx.success("获取成功", todoData)
}
async function getListByDay(ctx) {}
async function getReviewList(ctx) {}
async function getFinishedList(ctx) {}
async function getRecycleList(ctx) {}
async function deleteTodo(ctx) {}

async function deleteToRecycle(ctx) {}

async function rebackToRecycle(ctx) {}


module.exports = {
  getList,
  saveList,
  getDetail,
  getListByDay,
  getReviewList,
  getFinishedList,
  getRecycleList,
  deleteTodo,
  deleteToRecycle,
  rebackToRecycle
};