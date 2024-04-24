import { Card } from "react-bootstrap";

export default function Item({ maker, imageUrl, name, description, price }) {
  return (
    <Card className="item" style={{ width: "100%", height: "100%", border:"none" }}>
      <Card.Text style={{margin: "10px"}}>{maker}</Card.Text>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
