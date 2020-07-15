import service from "@/axios/service";

/**
 * 新增/编辑待办
 * @param {Object} data
 * @param {Number} data.id
 * @param {Number} data.title
 * @param {String} data.description
 * @param {timestamp} data.date
 * @param {Number} data.priority
 */
export function ApiSaveTodoList(data) {
  return service.post("/todo/saveTodoList", data);
}

/**
 * 获取待办列表
 * @param {Object} data
 * @param {Number} data.page
 * @param {Number} data.pageSize
 */
export function ApiGetTodoList(data) {
  return service.get("/todo/getTodoList", data);
}

/**
 * 获取待办详情
 * @param {String} id
 */
export function ApiGetTodoDetail(id) {
  return service.get("/todo/getTodoDetail", {
    id
  });
}

/**
 * 根据日期获取待办数据
 * @param {timestamp} day
 */
export function ApiGetTodoListByDay(day) {
  return service.get("/todo/getTodoListByDay", {
    day
  });
}

/**
 * 获取本周事件回顾
 */
export function ApiGetReviewTodoList() {
  return service.get("/todo/getReviewTodoList");
}

/**
 * 获取已完成待办列表
 * @param {Object} data
 * @param {Number} data.page
 * @param {Number} data.pageSize
 */
export function ApiGetFinishedTodoList(data) {
  return service.get("/todo/getFinishedTodoList", data);
}

/**
 * 获取回收站待办列表
 * @param {Object} data
 * @param {Number} data.page
 * @param {Number} data.pageSize
 */
export function ApiGetRecycleTodoList(data) {
  return service.get("/todo/getRecycleTodoList", data);
}
