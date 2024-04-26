import { Card } from "react-bootstrap";



export default function DetailedWatch({brand, image1, image2, image3, image4, name, description, price}) {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={image1} alt={name}/>
          <Card.Img variant="top" src={image2} alt={name}/>
          <Card.Img variant="top" src={image3} alt={name}/>
          <Card.Img variant="top" src={image4} alt={name}/>
          <Card.Body>
          <Card.Text>{brand}</Card.Text>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>${price}</Card.Text>
          </Card.Body>
        </Card>
      );
};