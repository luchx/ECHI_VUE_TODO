import service from "@/axios/service";

export function ApiGetTodoList() {
  return service.get("/getTodoList");
}
