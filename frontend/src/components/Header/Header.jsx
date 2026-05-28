import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import AccountModal from "../AccountModal/AccountModal";
import MegaMenu from "../MegaMenu/MegaMenu";
import { getCurrentUser } from "../../services/authService";

function Header() {
  const [menu, setMenu] = useState(null);
  const [openAccount, setOpenAccount] = useState(false);
  const [user, setUser] = useState(null);

  const refreshUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }

    loadUser();

    window.addEventListener("veloce-auth-change", refreshUser);

    return () => {
      window.removeEventListener("veloce-auth-change", refreshUser);
    };
  }, []);

  return (
    <>
      <header className="header" onMouseLeave={() => setMenu(null)}>
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">V</span>
            <span className="brand-copy">
              <strong>Veloce</strong>
              <small>Premium auto market</small>
            </span>
          </Link>

          <nav className="nav">
            <div className="nav-item" onMouseEnter={() => setMenu("buy")}>
              <button onClick={() => setMenu(menu === "buy" ? null : "buy")}>
                Buy
              </button>
            </div>

            <div className="nav-item" onMouseEnter={() => setMenu("sell")}>
              <button onClick={() => setMenu(menu === "sell" ? null : "sell")}>
                Sell
              </button>
            </div>

            <div className="nav-item" onMouseEnter={() => setMenu("research")}>
              <button
                onClick={() => setMenu(menu === "research" ? null : "research")}
              >
                Research
              </button>
            </div>
          </nav>

          <button
            className="account"
            type="button"
            onClick={() => setOpenAccount(true)}
          >
            <span className="account-icon">
              <FiUser />
            </span>
            <span>{user?.username || user?.email || "Account"}</span>
          </button>
        </div>

        <MegaMenu menu={menu} onClose={() => setMenu(null)} />
      </header>

      {openAccount && (
        <AccountModal
          user={user}
          onAuthChange={refreshUser}
          onClose={() => setOpenAccount(false)}
        />
      )}
    </>
  );
}

export default Header;
