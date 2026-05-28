import { authHeaders, requestJson } from "./api";

const CURRENT_USER_KEY = "veloce_current_user";
const RESET_CODE_KEY = "veloce_reset_code";

function notifyAuthChanged() {
  window.dispatchEvent(new Event("veloce-auth-change"));
}

export async function registerUser(email, username, password, confirmPassword) {
  if (!email || !username || !password || !confirmPassword) {
    return { success: false, message: "Please fill in all fields." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  const data = await requestJson("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, username, password }),
  });

  if (data.success && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
    notifyAuthChanged();
  }

  return data;
}

export async function loginUser(email, password) {
  const data = await requestJson("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.success && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
    notifyAuthChanged();
  }

  return data;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem(CURRENT_USER_KEY);
  notifyAuthChanged();
}

export async function getCurrentUser() {
  const cachedUser = localStorage.getItem(CURRENT_USER_KEY);

  if (!localStorage.getItem("token")) {
    return null;
  }

  const data = await requestJson("/auth/me", {
    headers: authHeaders(),
  });

  if (data.success) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
    return data.user;
  }

  return cachedUser ? JSON.parse(cachedUser) : null;
}

export function sendResetCode(email) {
  if (!email) {
    return { success: false, message: "Please enter your email." };
  }

  localStorage.setItem(RESET_CODE_KEY, JSON.stringify({ email, code: "123456" }));

  return {
    success: true,
    message: "Reset code sent. Demo code: 123456",
  };
}

export function resetPassword(code, newPassword, confirmPassword) {
  const resetData = JSON.parse(localStorage.getItem(RESET_CODE_KEY));

  if (!resetData) {
    return { success: false, message: "No reset request found." };
  }

  if (code !== resetData.code) {
    return { success: false, message: "Invalid reset code." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  localStorage.removeItem(RESET_CODE_KEY);

  return {
    success: true,
    message: "Password reset is demo-only. Please sign in with your current password.",
  };
}
