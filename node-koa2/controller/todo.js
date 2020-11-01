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
    offset: Number(pageSize) * (Number(page) - 1),
    attributes: ["date", "description", "id", "priority", "status", "title"]
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows
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
      },
      attributes: ["date", "description", "id", "priority", "status", "title"]
    })

    return ctx.success("更新成功", todo[0])
  }

  const todo = await TodoModel.create({
    date,
    description,
    priority,
    title,
    userId: userData.userId
  }, {
    attributes: ["date", "description", "id", "priority", "status", "title"]
  })

  return ctx.success("创建成功", todo.id)
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
    },
    attributes: ["date", "description", "id", "priority", "status", "title"]
  })
  if (!todo) {
    return ctx.fail("没有找到该记录")
  }

  ctx.success("获取成功", todo)
}
async function getListByDay(ctx) {
  const {
    day
  } = ctx.query;

  const todo = await TodoModel.findAll({
    [Op.and]: [{
      status: 1,
    }],
    where: {
      date: day,
      deletedAt: null
    },
    order: [
      ['id', 'desc']
    ],
    attributes: ["date", "description", "id", "priority", "status", "title"]
  });

  ctx.success("获取成功", todo.rows)
}

async function getReviewList(ctx) {
  const todo = await TodoModel.findAll({
    [Op.and]: [{
      status: 1,
    }],
    where: {
      deletedAt: null
    },
    order: [
      ['id', 'desc']
    ],
    attributes: ["date", "description", "id", "priority", "status", "title"]
  });

  ctx.success("获取成功", todo.rows)
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
    offset: Number(pageSize) * (Number(page) - 1),
    attributes: ["date", "description", "id", "priority", "status", "title"]
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows
  })
}

async function getRecycleList(ctx) {
  const {
    page,
    pageSize
  } = ctx.query;

  const todo = await TodoModel.findAndCountAll({
    where: {
      deletedAt: {
        [Op.not]: null,
      }
    },
    order: [
      ['id', 'desc']
    ],
    limit: Number(pageSize),
    offset: Number(pageSize) * (Number(page) - 1),
    attributes: ["date", "description", "id", "priority", "status", "title"],
    paranoid: false
  }); 

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize)
    },
    list: todo.rows
  })
}

async function deleteTodo(ctx) {
  const {
    id
  } = ctx.params;
  
  const todo = await TodoModel.findByPk(id, {
    paranoid: false
  });

  // 不存在抛出错误
  if (!todo) {
    ctx.fail("没有找到待办记录")
  }

  // 软删除待办记录
  await todo.destroy({
    force: true
  });
  ctx.success("删除成功");
}

async function deleteToRecycle(ctx) {
  const {
    id
  } = ctx.params;
  // 检测是否存在
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

async function rebackToRecycle(ctx) {
  const {
    id
  } = ctx.params;

  const todo = await TodoModel.findByPk(id, {
    paranoid: false
  });

  if (!todo) {
    ctx.fail("没有找到待办记录")
  }

  await todo.restore();
  ctx.success("数据已恢复")
}


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