import { jsonFetch } from "./auth";

const API = process.env.VITE_API_BASE_URL || "http://localhost:4000";

export function getCourses() {
  return jsonFetch(`${API}/courses`, {
    method: "GET",
  });
}

export function getCoursewares() {
  return jsonFetch(`${API}/coursewares`, {
    method: "GET",
  });
}

export function getCourseById(courseId) {
  return jsonFetch(`${API}/courses/${courseId}`, {
    method: "GET",
  });
}

export function getCoursewareById(coursewareId) {
  return jsonFetch(`${API}/coursewares/${coursewareId}`, {
    method: "GET",
  });
}
