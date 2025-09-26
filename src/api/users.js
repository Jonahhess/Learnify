import { jsonFetch } from "./auth.js";

export function getUserById(userId) {
  return jsonFetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, {
    method: "GET",
  });
}

export function startCourse(userId, courseId) {
  return jsonFetch(
    `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/courses/`,
    {
      method: "POST",
      body: JSON.stringify({ id: courseId }),
    }
  );
}
