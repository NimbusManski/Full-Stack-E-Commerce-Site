import { Link } from "react-router-dom";

export default function AuthenticSecond() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };
  
  return (
    <div className="auth-section">
      <div className="auth-section-text">
        <h2>Authentic Quality</h2>
        <p>
          Mens Luxury is home to the greatest collection of pre-owned luxury
          watches, shoes, ties and belts, all certified as authentic and Collector Quality.
        </p>
        <div className="button-container">
        <Link to={"/about-us"} onClick={scrollToTop}>
          <button>Learn More</button>
        </Link>
      </div>
      </div>
      <div className="auth-section-img">
        <img src="/images/Authentic-attr.avif"></img>
      </div>
    </div>
  );
}
