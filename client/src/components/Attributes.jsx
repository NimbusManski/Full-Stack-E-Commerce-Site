
import { Link } from "react-router-dom";
export default function Attributes() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };

    return (
      <div className="attr-container">
        <div className="attr-section">
          <div className="attribute-1">
            <h2>GLOBAL INVENTORY</h2>
            <p>
              We're not a marketplace, we're the market leader. This means we own
              every watch we sell, allowing us to set superior standards across the
              globe. With offices in the United States, Hong Kong, Singapore, and
              beyond, our selection is ever-changing with thousands of luxury
              watches available at any given time.
            </p>
          </div>
          <div className="attribute-2">
            <h2>EXPERT SERVICE</h2>
            <p>
              Our in-house team of Swiss-trained watchmakers and refinishers are
              among the best in the industry. From routine maintenance to heavy
              water damage, our team of experts provide full support with
              factory-sourced parts for first-class service to the secondary
              marketplace.
            </p>
          </div>
          <div className="attribute-3">
            <h2>INSIDER INSIGHTS</h2>
            <p>
              Behind the scenes, there's a team of over 160 watch-lovers ready to
              share their passion with you. Ask them anything, from watch history to
              the pulse of the market. We've got a team ready around the world to
              help you find your dream watch - and they're just a chat, email, or
              phone call away.
            </p>
          </div>
        </div>
        <div className="button-container">
        <Link to={"/about-us"} onClick={scrollToTop}>
          <button>Learn More</button>
        </Link>
      </div>
      </div>
    );
  }
