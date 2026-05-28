import { useState } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  sendResetCode,
  resetPassword,
} from "../../services/authService";
import {
  FiHeart,
  FiLogOut,
  FiSearch,
  FiShuffle,
  FiX,
} from "react-icons/fi";
import "./AccountModal.css";

function AccountModal({ user, onAuthChange, onClose }) {
  const [mode, setMode] = useState("welcome");
  const [message, setMessage] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  const [resetForm, setResetForm] = useState({
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const goToMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
  };

  async function handleLogin(e) {
    e.preventDefault();
    const result = await loginUser(loginForm.email, loginForm.password);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    await onAuthChange?.();
    onClose();
  }

  async function handleRegister(e) {
    e.preventDefault();

    const result = await registerUser(
      registerForm.email,
      registerForm.username,
      registerForm.password,
      registerForm.confirmPassword,
    );

    setMessage(result.message);

    if (result.success) {
      setMode("signin");
    }
  }

  async function handleLogout() {
    logoutUser();
    await onAuthChange?.();
    onClose();
  }

  function handleSendCode(e) {
    e.preventDefault();

    const result = sendResetCode(forgotEmail);
    setMessage(result.message);

    if (result.success) {
      setMode("code");
    }
  }

  function handleResetPassword(e) {
    e.preventDefault();

    const result = resetPassword(
      resetForm.code,
      resetForm.newPassword,
      resetForm.confirmPassword,
    );

    setMessage(result.message);

    if (result.success) {
      setMode("signin");
    }
  }

  return (
    <div className="account-overlay" onClick={onClose}>
      <div className="account-modal" onClick={(e) => e.stopPropagation()}>
        <div className="account-header">
          <h2>
            {user && mode === "welcome" && "Your account"}
            {!user && mode === "welcome" && "Sign in"}
            {mode === "signin" && "Sign in"}
            {mode === "register" && "Create account"}
            {mode === "forgot" && "Reset password"}
            {mode === "code" && "Enter reset code"}
          </h2>

          <button
            className="account-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {message && <p className="auth-message">{message}</p>}

        {mode === "welcome" && user && (
          <>
            <div className="account-profile">
              <span className="account-avatar">
                {(user.username || user.email || "U").charAt(0).toUpperCase()}
              </span>

              <div>
                <strong>{user.username || "Veloce member"}</strong>
                <small>{user.email}</small>
              </div>
            </div>

            <div className="divider-line"></div>

            <ul className="account-menu">
              <li
                className="account-menu-item"
                onClick={() => (window.location.href = "/saved-cars")}
              >
                <span className="account-svg">
                  <FiHeart />
                </span>
                Saved Cars
              </li>

              <li
                className="account-menu-item"
                onClick={() => (window.location.href = "/saved-searches")}
              >
                <span className="account-svg">
                  <FiSearch />
                </span>
                Saved Searches
              </li>
              <li
                className="account-menu-item"
                onClick={() => (window.location.href = "/saved-comparison")}
              >
                <span className="account-svg">
                  <FiShuffle />
                </span>
                Saved Comparison
              </li>
            </ul>

            <button className="btn-logout" type="button" onClick={handleLogout}>
              <FiLogOut />
              Sign out
            </button>
          </>
        )}

        {mode === "welcome" && !user && (
          <>
            <p className="account-desc">
              Save cars and searches, get price drop alerts, add cars to your
              saved list, and more.
            </p>

            <button className="btn-outline" onClick={() => goToMode("signin")}>
              Sign in
            </button>

            <button className="btn-solid" onClick={() => goToMode("register")}>
              Create an account
            </button>

            <div className="divider-line"></div>

            <ul className="account-menu">
              <li
                className="account-menu-item"
                onClick={() => (window.location.href = "/saved-cars")}
              >
                <span className="account-svg">
                  <FiHeart />
                </span>
                Saved Cars
              </li>

              <li
                className="account-menu-item"
                onClick={() => (window.location.href = "/saved-searches")}
              >
                <span className="account-svg">
                  <FiSearch />
                </span>
                Saved Searches
              </li>
              <li
                className="account-menu-item"
                onClick={() => (window.location.href = "/saved-comparison")}
              >
                <span className="account-svg">
                  <FiShuffle />
                </span>
                Saved Comparison
              </li>
            </ul>
          </>
        )}

        {mode === "signin" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <p className="account-desc">Enter your email and password.</p>

            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />

            <button className="btn-solid" type="submit">
              Sign in
            </button>

            <button
              type="button"
              className="text-btn"
              onClick={() => goToMode("forgot")}
            >
              Forgot password?
            </button>

            <button
              type="button"
              className="text-btn"
              onClick={() => goToMode("welcome")}
            >
              Back
            </button>
          </form>
        )}

        {mode === "register" && (
          <form className="auth-form" onSubmit={handleRegister}>
            <p className="account-desc">Create your Veloce account.</p>

            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Username"
              autoComplete="username"
              required
              value={registerForm.username}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, username: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Create password"
              autoComplete="new-password"
              required
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
              required
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button className="btn-solid" type="submit">
              Create account
            </button>

            <button
              type="button"
              className="text-btn"
              onClick={() => goToMode("signin")}
            >
              Already have an account? Sign in
            </button>
          </form>
        )}

        {mode === "forgot" && (
          <form className="auth-form" onSubmit={handleSendCode}>
            <p className="account-desc">
              Enter your email. We will send you a reset code.
            </p>

            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />

            <button className="btn-solid" type="submit">
              Send reset code
            </button>

            <button
              type="button"
              className="text-btn"
              onClick={() => goToMode("signin")}
            >
              Back to sign in
            </button>
          </form>
        )}

        {mode === "code" && (
          <form className="auth-form" onSubmit={handleResetPassword}>
            <p className="account-desc">
              Demo reset code is <strong>123456</strong>.
            </p>

            <input
              type="text"
              placeholder="Reset code"
              inputMode="numeric"
              required
              value={resetForm.code}
              onChange={(e) =>
                setResetForm({ ...resetForm, code: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="New password"
              autoComplete="new-password"
              required
              value={resetForm.newPassword}
              onChange={(e) =>
                setResetForm({ ...resetForm, newPassword: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm new password"
              autoComplete="new-password"
              required
              value={resetForm.confirmPassword}
              onChange={(e) =>
                setResetForm({
                  ...resetForm,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button className="btn-solid" type="submit">
              Reset password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AccountModal;
