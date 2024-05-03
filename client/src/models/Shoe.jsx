import { Card } from "react-bootstrap";



export default function Shoe({brand, image1, name, description, price}) {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Img  style={{ objectFit: "cover", height: "100%" }} variant="top" src={image1} alt={name}/>
          <Card.Body className="shoe-card-body">
          <Card.Text className="shoe-brand" style={{ marginBottom: "10px" }}>{brand}</Card.Text>
            <Card.Title className="shoe-name" style={{ marginBottom: "10px" }}>{name}</Card.Title>
            <Card.Text className="shoe-description" style={{ marginBottom: "10px" }}>{description}</Card.Text>
            <Card.Text className="shoe-price" style={{ marginBottom: "0px" }}>${price}</Card.Text>
          </Card.Body>
        </Card>
      );
};