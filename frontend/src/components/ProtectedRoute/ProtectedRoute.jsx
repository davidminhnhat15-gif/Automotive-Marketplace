import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/api";
import "./ProtectedRoute.css";

function ProtectedRoute({ children, title = "Please sign in" }) {
  const navigate = useNavigate();

  if (getToken()) {
    return children;
  }

  return (
    <main className="protected-page">
      <section className="protected-shell">
        <div className="protected-card">
          <span className="protected-badge">Account required</span>
          <h1>{title}</h1>
          <p>
            Sign in to view saved cars, saved searches, and keep your shortlist
            synced with your account.
          </p>

          <div className="protected-actions">
            <button onClick={() => navigate("/auth")}>Sign in</button>
            <button onClick={() => navigate("/cars/all")}>Browse cars</button>
          </div>
        </div>

        <div className="protected-image" aria-hidden="true">
          <img src="/img/auth-showroom.jpg" alt="" />
          <div className="protected-image-caption">
            <span>Veloce member access</span>
            <strong>Keep every shortlist in one premium garage.</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProtectedRoute;
