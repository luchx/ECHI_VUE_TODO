const { Op, fn, where, col } = require("sequelize");
const TodoModel = require("../models/todo");

async function getList(ctx) {
  const { page, pageSize } = ctx.query;

  const currentUser = ctx.currentUser;
  const todo = await TodoModel.findAndCountAll({
    where: {
      status: 1,
      userId: currentUser.userId,
      deletedAt: null,
    },
    order: [["updatedAt", "desc"]],
    limit: Number(page),
    offset: Number(pageSize) * (Number(page) - 1),
    attributes: ["date", "description", "id", "priority", "status", "title"],
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(page),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize),
    },
    list: todo.rows,
  });
}

async function saveList(ctx) {
  const { id, date, description, priority, title } = ctx.request.body;

  const currentUser = ctx.currentUser;

  if (id) {
    const todo = await TodoModel.update(
      {
        date,
        description,
        priority,
        title,
        userId: currentUser.userId,
      },
      {
        where: {
          id,
          deletedAt: null,
        },
        attributes: [
          "date",
          "description",
          "id",
          "priority",
          "status",
          "title",
        ],
      }
    );

    return ctx.success("更新成功", todo[0]);
  }

  const todo = await TodoModel.create(
    {
      date,
      description,
      priority,
      title,
      userId: currentUser.userId,
    },
    {
      attributes: ["date", "description", "id", "priority", "status", "title"],
    }
  );

  return ctx.success("创建成功", todo.id);
}

async function getDetail(ctx) {
  const { id } = ctx.params;

  const currentUser = ctx.currentUser;

  const todo = await TodoModel.findOne({
    where: {
      id,
      userId: currentUser.userId,
      deletedAt: null,
    },
    attributes: ["date", "description", "id", "priority", "status", "title"],
  });
  if (!todo) {
    return ctx.fail("没有找到该记录");
  }

  ctx.success("获取成功", todo);
}
async function getListByDay(ctx) {
  const { day } = ctx.query;

  const currentUser = ctx.currentUser;
  const todo = await TodoModel.findAll({
    where: {
      [Op.and]: [
        // 当天数据
        where(fn('TO_DAYS', col('date')), '=', fn('TO_DAYS', day))
      ],
      userId: currentUser.userId,
      deletedAt: null,
    },
    order: [["updatedAt", "desc"]],
    attributes: ["date", "description", "id", "priority", "status", "title"],
  });
  
  ctx.success("获取成功", todo);
}

async function getReviewList(ctx) {
  const currentUser = ctx.currentUser;
  const weekWhere = {
    [Op.and]: [
      // 周数据
      where(
        fn('YEARWEEK', col('date')),
        '=',
        fn('YEARWEEK', fn('NOW'))
      )
    ],
    userId: currentUser.userId,
    deletedAt: null,
  }
  const total = await TodoModel.count({
    where: weekWhere,
  })
  const todo = await TodoModel.findAndCountAll({
    where: {
      ...weekWhere,
      status: 2,
    },
    order: [["updatedAt", "desc"]],
    attributes: ["date", "description", "id", "priority", "status", "title"],
  });

  ctx.success("获取成功", {
    task: {
      finishCount: todo.count,
      rate: (todo.count / total) * 5,
      total: total,
    },
    list: todo.rows
  });
}

async function getFinishedList(ctx) {
  const { page, pageSize } = ctx.query;

  const currentUser = ctx.currentUser;
  const todo = await TodoModel.findAndCountAll({
    where: {
      status: 2,
      userId: currentUser.userId,
      deletedAt: null,
    },
    order: [["updatedAt", "desc"]],
    limit: Number(page),
    offset: Number(pageSize) * (Number(page) - 1),
    attributes: ["date", "description", "id", "priority", "status", "title"],
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize),
    },
    list: todo.rows,
  });
}

async function getRecycleList(ctx) {
  const { page, pageSize } = ctx.query;

  const currentUser = ctx.currentUser;
  const todo = await TodoModel.findAndCountAll({
    where: {
      userId: currentUser.userId,
      deletedAt: {
        [Op.not]: null,
      },
    },
    order: [["id", "desc"]],
    limit: Number(page),
    offset: Number(pageSize) * (Number(page) - 1),
    attributes: ["date", "description", "id", "priority", "status", "title"],
    paranoid: false,
  });

  ctx.success("获取成功", {
    pagination: {
      page: Number(pageSize),
      pageSize: Number(pageSize),
      total: todo.count,
      totalPage: Math.ceil(todo.count / pageSize),
    },
    list: todo.rows,
  });
}

async function deleteTodo(ctx) {
  const { id } = ctx.params;

  const currentUser = ctx.currentUser;
  const todo = await TodoModel.findByPk(id, {
    where: {
      userId: currentUser.userId,
    },
    paranoid: false,
  });

  // 不存在抛出错误
  if (!todo) {
    ctx.fail("没有找到待办记录");
  }

  // 软删除待办记录
  await todo.destroy({
    force: true,
  });
  ctx.success("删除成功");
}

async function deleteToRecycle(ctx) {
  const { id } = ctx.params;

  const currentUser = ctx.currentUser;
  // 检测是否存在
  const todo = await TodoModel.findOne({
    where: {
      id,
      userId: currentUser.userId,
      deletedAt: null,
    },
  });
  // 不存在抛出错误
  if (!todo) {
    ctx.fail("没有找到待办记录");
  }

  // 软删除待办记录
  await todo.destroy();
  ctx.success("删除成功");
}

async function restoreToRecycle(ctx) {
  const { id } = ctx.params;

  const currentUser = ctx.currentUser;
  const todo = await TodoModel.findByPk(id, {
    where: {
      userId: currentUser.userId,
    },
    paranoid: false,
  });

  if (!todo) {
    ctx.fail("没有找到待办记录");
  }

  await todo.restore();
  ctx.success("数据已恢复");
}

async function finishTodo(ctx) {
  const { id } = ctx.params;
  await TodoModel.update({
    status: 2
  }, {
    where: {
      id
    }
  });

  ctx.success("任务已完成")
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
  restoreToRecycle,
  finishTodo
};
