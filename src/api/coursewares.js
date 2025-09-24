import { jsonFetch } from "./auth.js"; 

export function submitCourseware(coursewareId) {
  return jsonFetch(
    `${import.meta.env.VITE_API_BASE_URL}/user/coursewares/${coursewareId}/submit`,
    {
      method: "POST",
    }
  );
}

