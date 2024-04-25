import { Card } from "react-bootstrap";



export default function Watch({maker, imageUrl, name, description, price}) {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={imageUrl} alt={name}/>
          <Card.Body>
          <Card.Text>{maker}</Card.Text>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>${price}</Card.Text>
          </Card.Body>
        </Card>
      );
};