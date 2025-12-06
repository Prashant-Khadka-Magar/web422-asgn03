import Error from "next/error";
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR from "swr";

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return (
      <Card>
        <Card.Body>
          <Card.Text>Loading book details...</Card.Text>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card>
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null; // Remove the event handler to prevent infinite loop
          event.target.src =
            "https://placehold.co/400x600?text=Cover+Not+Available";
        }}
        className="img-fluid w-100"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.first_publish_date}</Card.Text>
        <Link href={`/works/${workId}`}>
          <Button variant="primary">View Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
