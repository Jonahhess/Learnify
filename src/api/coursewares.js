import { jsonFetch } from "./auth.js";

export function submitCourseware(userId, coursewareId) {
  return jsonFetch(
    `${process.env.VITE_API_BASE_URL}/users/${userId}/coursewares/${coursewareId}`,
    {
      method: "PUT",
    }
  );
}
