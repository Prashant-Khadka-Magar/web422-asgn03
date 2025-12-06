import { Card } from "react-bootstrap";

export default function PageHeader(prop) {
  return (
    <>
      <Card className="bg-light text-center">
        <Card.Title>{prop.text}</Card.Title>
        {prop.subtext && <Card.Text>{prop.subtext}</Card.Text>}
      </Card>
      <br />
    </>
  );
}
