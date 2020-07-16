import service from "@/axios/service";

export function ApiLogin() {
  return service.get("/user/login");
}
