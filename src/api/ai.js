import { jsonFetch } from "./auth.js";

export function generateCourseOutlineFromTitle(title) {
  return jsonFetch(`${import.meta.env.VITE_API_BASE_URL}/ai/outline/`, {
    method: "POST",
    body: title,
  });
}

export function generateCoursewareFromTitle(title) {
  return jsonFetch(`${import.meta.env.VITE_API_BASE_URL}/ai/courseware/`, {
    method: "POST",
    body: title,
  });
}
