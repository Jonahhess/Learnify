const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',             // important: server sets httpOnly cookie
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export function signup({ name, email, password }) {
  // createUser expects name,email,password and sets cookie token on success
  return jsonFetch(`${API}/user`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function login({ email, password }) {
  // loginUser expects email,password and sets cookie token on success
  return jsonFetch(`${API}/user/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
