const API = process.env.VITE_API_BASE_URL;

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export function signup({ name, email, password }) {
  return jsonFetch(`${API}/users`, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  return jsonFetch(`${API}/users/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export { jsonFetch };
