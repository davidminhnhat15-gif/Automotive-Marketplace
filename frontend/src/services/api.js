export const API_URL = "http://localhost:5000/api";

export function getToken() {
  return localStorage.getItem("token");
}

export function authHeaders() {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export async function requestJson(path, options = {}) {
  let res;

  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    return {
      success: false,
      message: "Cannot connect to the API server.",
    };
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Request failed.",
      ...data,
    };
  }

  return {
    success: true,
    ...data,
  };
}
