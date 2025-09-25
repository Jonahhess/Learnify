import { jsonFetch } from "./auth.js";

const API = process.env.VITE_API_BASE_URL || "http://localhost:4000";

export function getQuestionsByCourseware(coursewareId) {
  return jsonFetch(`${API}/questions/courseware/${coursewareId}`);
}
