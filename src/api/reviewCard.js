import { jsonFetch } from "./auth.js";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export function getReviewCards() {
  return jsonFetch(`${API}/review-cards`, { method: "GET" });
}

export function getReviewCardById(id) {
  return jsonFetch(`${API}/review-cards/${id}`, { method: "GET" });
}

export function updateReviewCard(id, body) {
  return jsonFetch(`${API}/review-cards/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export function deleteReviewCard(id) {
  return jsonFetch(`${API}/review-cards/${id}`, { method: "DELETE" });
}
