import { local } from './storage';

export function setToken(token: String): void {
  const expired = 60 * 60 * 3;
  local.set("token", `Bearer ${token}`, expired)
}

export function getToken(): String {
  return local.get("token")
}