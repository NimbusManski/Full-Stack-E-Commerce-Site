import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Explore() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <Container fluid style={{ backgroundColor: "black", paddingTop: "50px", paddingBottom: "50px" }}>
      <h3 className="explore-header">Explore</h3>
      <Row style={{ textAlign: "center", gap: 40 }}>
        <div className="explore-link-wrapper">
          <Link to={"/about-us"} className="explore-link mx-2" onClick={scrollToTop}>About Us</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/watches"} className="explore-link mx-2" onClick={scrollToTop}>Watches</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/shoes"} className="explore-link mx-2" onClick={scrollToTop}>Shoes</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/belts"} className="explore-link mx-2" onClick={scrollToTop}>Belts</Link>
        </div>
        <div className="explore-link-wrapper">
          <Link to={"/ties"} className="explore-link mx-2" onClick={scrollToTop}>Ties</Link>
        </div>
      </Row>
    </Container>
  );
}
