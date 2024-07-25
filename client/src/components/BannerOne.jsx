import { Link } from "react-router-dom";

export default function Authentic() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };

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
        <div className="button-container">
        <Link to={"/about-us"} onClick={scrollToTop}>
          <button>Learn More</button>
        </Link>
      </div>
      </div>
    </div>
  );
}
