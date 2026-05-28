import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-mark">V</span>
            <div>
              <strong>Veloce</strong>
              <small>Premium auto market</small>
            </div>
          </div>

          <p>
            Discover curated vehicles, save your shortlist, and compare the
            next car that fits your lifestyle.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li>
              <FiMail />
              support@velocecars.com
            </li>
            <li>
              <FiPhone />
              +84 24 555 0188
            </li>
            <li>
              <FiMapPin />
              Ha Noi & Ho Chi Minh City
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Community</h3>
          <div className="footer-socials" aria-label="Social links">
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FiFacebook />
            </a>
            <a
              href="https://x.com/"
              aria-label="Twitter"
              target="_blank"
              rel="noreferrer"
            >
              <FiTwitter />
            </a>
            <a
              href="https://www.youtube.com/"
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
            >
              <FiYoutube />
            </a>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram />
            </a>
          </div>
          <p className="footer-muted">
            Follow Veloce for new listings, market updates, and ownership tips.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 Veloce. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
