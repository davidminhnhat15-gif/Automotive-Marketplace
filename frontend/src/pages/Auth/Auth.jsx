import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../services/authService";

function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [message, setMessage] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    const result = await loginUser(loginForm.email, loginForm.password);

    if (!result.success) {
      setMessage(result.message || "Could not sign in.");
      return;
    }

    navigate("/saved-cars");
  }

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");

    const result = await registerUser(
      registerForm.email,
      registerForm.username,
      registerForm.password,
      registerForm.confirmPassword,
    );

    if (!result.success) {
      setMessage(result.message || "Could not create account.");
      return;
    }

    navigate("/saved-cars");
  }

  return (
    <main className="auth-page">
      <section className="auth-box">
        <span className="auth-badge">Veloce account</span>
        <h1>{mode === "signin" ? "Sign in" : "Create your account"}</h1>
        <p>
          Save vehicles, searches, and comparisons with your Veloce account.
        </p>

        <div className="auth-tabs">
          <button
            className={mode === "signin" ? "active" : ""}
            onClick={() => {
              setMode("signin");
              setMessage("");
            }}
          >
            Sign in
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => {
              setMode("register");
              setMessage("");
            }}
          >
            Create account
          </button>
        </div>

        {message && <div className="auth-alert">{message}</div>}

        {mode === "signin" ? (
          <form className="auth-form-page" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm({ ...loginForm, email: event.target.value })
              }
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm({ ...loginForm, password: event.target.value })
              }
              required
            />

            <button type="submit">Sign in</button>
          </form>
        ) : (
          <form className="auth-form-page" onSubmit={handleRegister}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Your name"
              autoComplete="username"
              value={registerForm.username}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  username: event.target.value,
                })
              }
              required
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm({ ...registerForm, email: event.target.value })
              }
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              autoComplete="new-password"
              value={registerForm.password}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  password: event.target.value,
                })
              }
              required
            />

            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
              value={registerForm.confirmPassword}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  confirmPassword: event.target.value,
                })
              }
              required
            />

            <button type="submit">Create account</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default Auth;
