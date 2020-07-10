import service from "@/axios/service";

export function ApiGetTodoList() {
  return service.get("/todo/getTodoList");
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

export function ApiGetTodoListByWeek() {
  return service.get("/todo/getTodoListByWeek");
}