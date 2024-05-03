import { Card } from "react-bootstrap";

export default function Item({ brand, image, name, description, price }) {
  return (
    <Card style={{ width: '100%' }}>
          <Card.Img  style={{ objectFit: "cover", height: "100%" }} variant="top" src={image} alt={name}/>
          <Card.Body className="item-card-body">
          <Card.Text className="item-brand" style={{ marginBottom: "10px" }}>{brand}</Card.Text>
            <Card.Title className="item-name" style={{ marginBottom: "10px" }}>{name}</Card.Title>
            <Card.Text className="item-description" style={{ marginBottom: "10px" }}>{description && description}</Card.Text>
            <Card.Text className="item-price" style={{ marginBottom: "0px" }}>${price}</Card.Text>
          </Card.Body>
        </Card>
  );
}