import { Link } from "react-router-dom";

export default function AuthenticSecond() {
  return (
    <div className="auth-section">
      <div className="auth-section-text">
        <h2>Authentic Quality</h2>
        <p>
          Mens Luxury is home to the greatest collection of pre-owned luxury
          watches, shoes, ties and belts, all certified as authentic and Collector Quality.
        </p>
        <button><Link to={"/about-us"}>Learn More</Link> </button>
      </div>
      <div className="auth-section-img">
        <img src="/images/Authentic-attr.avif"></img>
      </div>
    </div>
  );
}
