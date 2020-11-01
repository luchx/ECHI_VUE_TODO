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

  const todo = await TodoModel.findAndCountAll({
    [Op.and]: [{
      status: 1,
    }],
    where: {
      deletedAt: null
    },
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1)
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows.map(item => ({
      date: item.date,
      description: item.description,
      id: item.id,
      priority: item.priority,
      status: Number(item.status),
      title: item.title,
      userId: item.userId,
    }))
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
    const todo = await TodoModel.update({
      date,
      description,
      priority,
      title,
      userId: userData.userId
    }, {
      where: {
        id,
        deletedAt: null
      }
    })

    return ctx.success("更新成功", {
      date: todo.date,
      description: todo.description,
      id: todo.id,
      priority: todo.priority,
      status: Number(todo.status),
      title: todo.title,
      userId: todo.userId,
    })
  }

  const todo = await TodoModel.create({
    date,
    description,
    priority,
    title,
    userId: userData.userId
  })

  return ctx.success("创建成功", {
    date: todo.date,
    description: todo.description,
    id: todo.id,
    priority: todo.priority,
    status: Number(todo.status),
    title: todo.title,
    userId: todo.userId,
  })
}

async function getDetail(ctx) {
  const {
    id
  } = ctx.params;
  const {
    authorization
  } = ctx.header;
  const userData = verifyToken(authorization);

  const todo = await TodoModel.findOne({
    where: {
      id,
      userId: userData.userId,
      deletedAt: null
    }
  })
  if (!todo) {
    return ctx.fail("没有找到该记录")
  }

  ctx.success("获取成功", {
    date: todo.date,
    description: todo.description,
    id: todo.id,
    priority: todo.priority,
    status: Number(todo.status),
    title: todo.title,
    userId: todo.userId,
  })
}
async function getListByDay(ctx) {
  const {
    page,
    pageSize
  } = ctx.query;

  const todo = await TodoModel.findAndCountAll({
    [Op.and]: [{
      status: 1,
    }],
    where: {
      deletedAt: null
    },
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1)
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows.map(item => ({
      date: item.date,
      description: item.description,
      id: item.id,
      priority: item.priority,
      status: Number(item.status),
      title: item.title,
      userId: item.userId,
    }))
  })
}

async function getReviewList(ctx) {
  const {
    page,
    pageSize
  } = ctx.query;

  const todo = await TodoModel.findAndCountAll({
    [Op.and]: [{
      status: 1,
    }],
    where: {
      deletedAt: null
    },
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1)
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows.map(item => ({
      date: item.date,
      description: item.description,
      id: item.id,
      priority: item.priority,
      status: Number(item.status),
      title: item.title,
      userId: item.userId,
    }))
  })
}

async function getFinishedList(ctx) {
  const {
    page,
    pageSize
  } = ctx.query;

  const todo = await TodoModel.findAndCountAll({
    [Op.and]: [{
      status: 2,
    }],
    where: {
      deletedAt: null
    },
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1)
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows.map(item => ({
      date: item.date,
      description: item.description,
      id: item.id,
      priority: item.priority,
      status: Number(item.status),
      title: item.title,
      userId: item.userId,
    }))
  })
}

async function getRecycleList(ctx) {
  const {
    page,
    pageSize
  } = ctx.query;

  const todo = await TodoModel.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1),
    paranoid: false
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows.map(item => ({
      date: item.date,
      description: item.description,
      id: item.id,
      priority: item.priority,
      status: Number(item.status),
      title: item.title,
      userId: item.userId,
    }))
  })
}

async function deleteTodo(ctx) {}

async function deleteToRecycle(ctx) {
  const {
    id
  } = ctx.query;
  // 检测是否
  const todo = await TodoModel.findOne({
    where: {
      id,
      deletedAt: null
    }
  });
  // 不存在抛出错误
  if (!todo) {
    ctx.fail("没有找到待办记录")
  }

  // 软删除待办记录
  await todo.destroy();
  ctx.success("删除成功");
}

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