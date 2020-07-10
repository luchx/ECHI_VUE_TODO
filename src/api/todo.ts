import service from "@/axios/service";

export function ApiGetTodoList(data) {
  return service.get("/todo/getTodoList", data);
}

export function ApiGetTodoDetail(id) {
  return service.get("/todo/getTodoDetail", {
    id
  });
}

export function ApiGetTodoListByDay(day) {
  return service.get("/todo/getTodoListByDay", {
    day
  });
}

export function ApiGetReviewTodoList() {
  return service.get("/todo/getReviewTodoList");
}

export function ApiGetFinishedTodoList(data) {
  return service.get("/todo/getFinishedTodoList", data);
}

export function ApiGetRecycleTodoList(data) {
  return service.get("/todo/getRecycleTodoList", data);
}
