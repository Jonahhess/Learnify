import { jsonFetch } from "./auth.js";

export function generateCourseOutlineFromTitle(title) {
  console.log(title);
  return jsonFetch(`${import.meta.env.VITE_API_BASE_URL}/ai/outline/`, {
    method: "POST",
    body: title,
  });
}

export function generateCoursewareFromTitle(courseTitle, courseId, title) {
  return jsonFetch(`${import.meta.env.VITE_API_BASE_URL}/ai/courseware/`, {
    method: "POST",
    body: JSON.stringify({ courseTitle, courseId, title }),
  });
}
