import service from "@/axios/service";

export function ApiGetTimes() {
  return service.get("/basic/getTimes");
}