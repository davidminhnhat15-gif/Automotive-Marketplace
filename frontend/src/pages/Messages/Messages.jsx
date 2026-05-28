import "./Messages.css";
import { useNavigate } from "react-router-dom";
function Messages() {
  const navigate = useNavigate();
  return (
    <main className="messages-page">
      <section className="messages-hero">
        <div className="messages-content">
          <span className="messages-tag"></span>

          <h1>
            All your car <br />
            conversations <br />
            in one place
          </h1>

          <p>
            Connect with sellers, ask questions, negotiate offers, and manage
            your car-buying conversations easily.
          </p>

          <div className="cta">
            <button onClick={() => navigate("/account")}>
              Create an account
            </button>

            <span>
              Already have an account?{" "}
              <b onClick={() => navigate("/account")}>Sign in</b>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Messages;
