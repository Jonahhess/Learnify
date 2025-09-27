import { jsonFetch } from "./auth.js";

const API = import.meta.env.VITE_API_BASE_URL;

export function generateCourseOutline({ title }) {
  return jsonFetch(`${API}/ai/outline`, {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function generateCourseware({ courseId, courseTitle, title }) {
  return jsonFetch(`${API}/ai/courseware`, {
    method: "POST",
    body: JSON.stringify({ courseId, courseTitle, title }),
  });
}
