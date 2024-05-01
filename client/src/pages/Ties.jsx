import { Container, Row, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Item from "../models/Item";
import { Link } from "react-router-dom";
import Explore from "../components/Explore";
import Footer from "../components/Footer";

export default function Ties() {

  const [watchData, setWatchData] = useState([]);

     useEffect(() => {
        async function fetchTies() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/ties`,
              { method: "GET", credentials: "include" }
            );
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
    
            const watchData = await response.json();
            setWatchData(watchData);
            console.log(watchData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchTies();
      }, [setTieData]);


  return (
    <div className="ties-wrapper">
      <Navigation />
      <div className="ties-page-hero">
        <Container className="header-section">
          <Row className="justify-content-center align-items-center ties-row-custom">
            <Col md={8} className="text-center watch-page-hero-col-custom">
              <div className="lead-wrapper">
                <div className="button-wrapper mt-3"></div>
              </div>
            </Col>
          </Row>
        </Container>

        <section className="items">
          <Container className="text-center">
            <h1 className="ties-page-header">Ties</h1>
            <p>
              Indulge in the epitome of sophistication with our luxury ties
              collection. Crafted with meticulous attention to detail and using
              only the finest materials, each tie exudes timeless elegance and
              unparalleled quality. Elevate your attire effortlessly, whether
              it's for a special occasion or to make a statement in the
              boardroom. With our commitment to exquisite craftsmanship and
              impeccable style, buying from us ensures not just a tie, but a
              symbol of refined taste and distinction that will endure for
              generations.
            </p>
            <Row xs={1} sm={2} md={3} lg={4}>
              {itemsOne.map((item, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Link to={""}>
                    <Item {...item} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
          <Container className="text-center">
            <div className="tie-section">
              <div className="tie-section-overlay">
                <h2>Exquisite Elegance</h2>
                <p> Tied Together with Luxury.</p>
              </div>
            </div>
            <Row xs={1} sm={2} md={3} lg={4}>
              {itemsTwo.map((item, index) => (
                <Col
                  key={index}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Link to={""}>
                    <Item {...item} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        <Explore />
        <Footer />
      </div>
    </div>
  );
}
