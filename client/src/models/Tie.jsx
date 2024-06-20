import { Card } from "react-bootstrap";



export default function Tie({brand, image1, name, description, price}) {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Img  style={{ objectFit: "cover", height: "100%" }} variant="top" src={image1} alt={name}/>
          <Card.Body className="card-body">
          <Card.Text className="brand" style={{ marginBottom: "10px" }}>{brand}</Card.Text>
            <Card.Title className="name" style={{ marginBottom: "10px" }}>{name}</Card.Title>
            <Card.Text className="description" style={{ marginBottom: "10px" }}>{description}</Card.Text>
            <Card.Text className="price" style={{ marginBottom: "0px" }}>${price}</Card.Text>
          </Card.Body>
        </Card>
      );
};