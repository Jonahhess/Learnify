import { jsonFetch } from "./auth.js";

export function getUserById(userId) {
  return jsonFetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, {
    method: "GET",
  });
}
