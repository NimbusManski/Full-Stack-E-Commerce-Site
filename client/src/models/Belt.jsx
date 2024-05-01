import { Card } from "react-bootstrap";



export default function Belt({brand, image1, name, description, price}) {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Img  style={{ objectFit: "cover", height: "100%" }} variant="top" src={image1} alt={name}/>
          <Card.Body className="watch-card-body">
          <Card.Text className="watch-brand" style={{ marginBottom: "10px" }}>{brand}</Card.Text>
            <Card.Title className="watch-name" style={{ marginBottom: "10px" }}>{name}</Card.Title>
            <Card.Text className="watch-description" style={{ marginBottom: "10px" }}>{description}</Card.Text>
            <Card.Text className="watch-price" style={{ marginBottom: "0px" }}>${price}</Card.Text>
          </Card.Body>
        </Card>
      );
};