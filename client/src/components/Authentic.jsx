import { Link } from "react-router-dom";

export default function Authentic() {
  return (
    <div className="auth-section">
      <div className="auth-section-img">
        <img src="/images/shoes-watch-tie.jpeg"></img>
      </div>
      <div className="auth-section-text">
        <h2>Luxury Accessories</h2>
        <p>
          Join us in ushering in a new era for watch collectors. Discover our
          locations, global community, curated collections - both new and
          collectible pre-owned - and let’s talk luxury.
        </p>
        <button><Link to={"/about-us"}>Learn More</Link> </button>
      </div>
    </div>
  );
}
