import service from "@/axios/service";

type TodoData = {
  id: number;
  title: string;
  description: string;
  date: Date;
  priority: number;
}

/**
 * 新增/编辑待办
 * @param {Object} data
 * @param {Number} data.id
 * @param {Number} data.title
 * @param {String} data.description
 * @param {timestamp} data.date
 * @param {Number} data.priority
 */
export function ApiSaveTodoList(data: TodoData) {
  return service.post("/api/todo/saveList", data);
}

/**
 * 获取待办列表
 * @param {Object} data
 * @param {Number} data.page
 * @param {Number} data.pageSize
 */
export function ApiGetTodoList(data) {
  return service.get("/api/todo/getList", data);
}

/**
 * 获取待办详情
 * @param {String} id
 */
export function ApiGetTodoDetail(id) {
  return service.get(`/api/todo/getDetail/${id}`);
}

/**
 * 根据日期获取待办数据
 * @param {timestamp} day
 */
export function ApiGetTodoListByDay(day) {
  return service.get("/api/todo/getListByDay", {
    day
  });
}

/**
 * 获取本周事件回顾
 */
export function ApiGetReviewTodoList() {
  return service.get("/api/todo/getReviewList");
}

/**
 * 获取已完成待办列表
 * @param {Object} data
 * @param {Number} data.page
 * @param {Number} data.pageSize
 */
export function ApiGetFinishedTodoList(data) {
  return service.get("/api/todo/getFinishedList", data);
}

/**
 * 获取回收站待办列表
 * @param {Object} data
 * @param {Number} data.page
 * @param {Number} data.pageSize
 */
export function ApiGetRecycleTodoList(data) {
  return service.get("/api/todo/getRecycleList", data);
}

/**
 * 删除待办
 * @param {String} id
 */
export function ApiDeleteTodo(id) {
  return service.delete(`/api/todo/deleteTodo/${id}`);
}

/**
 * 删除待办-回收站
 * @param {String} id
 */
export function ApiDeleteTodoToRecycle(id) {
  return service.delete(`/api/todo/deleteToRecycle/${id}`);
}

/**
 * 还原待办-回收站
 * @param {String} id
 */
export function ApiRestoreTodoFromRecycle(id) {
  return service.put(`/api/todo/rebackToRecycle/${id}`);
}
