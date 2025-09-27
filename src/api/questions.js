import { jsonFetch } from "./auth.js";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export function getQuestionsByCourseware(coursewareId) {
  return jsonFetch(`${API}/questions/courseware/${coursewareId}`, {
    method: "GET",
    cache: "no-store",
  });
}