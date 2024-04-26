import { Card } from "react-bootstrap";

export default function Item({ maker, imageUrl, name, description, price }) {
  return (
    <Card className="item" style={{ width: "100%", border: "none" }}>
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{ objectFit: "cover", height: "100%" }}
        />
      </div>
      <Card.Body>
        <Card.Text style={{ marginBottom: "10px" }}>{maker}</Card.Text>
        <Card.Title style={{ marginBottom: "10px" }}>{name}</Card.Title>
        <Card.Text style={{ marginBottom: "10px" }}>{description}</Card.Text>
        <Card.Text style={{ marginBottom: "0" }}>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
}