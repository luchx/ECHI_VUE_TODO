import service from "@/axios/service";

export function ApiGetTodoList() {
  return service.get("/getTodoList");
}

export function ApiGetTodoDetail(id) {
  return service.get("/getTodoDetail", {
    id
  });
}

export function ApiGetTodoListByDay(day) {
  return service.get("/getTodoListByDay", {
    day
  });
}
