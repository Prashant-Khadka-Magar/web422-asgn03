import Link from "next/link";
import { Card } from "react-bootstrap";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  const res = await fetch("https://openlibrary.org/works/OL453657W.json"); // You can change this Work ID
  const data = await res.json();

  return {
    props: { book: data },
  };
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer: Prashant Khadka Magar" />

      <Card>
        <Card.Body>
          <p>
            Hi! I'm Prashant Khadka Magar, a web development student at Seneca
            College. I'm learning React, Next.js, and building cool web
            applications.
          </p>
          <p>One of my favorite books is {book.title}.</p>
        </Card.Body>
      </Card>
      <br />

      <BookDetails book={book} workId={'OL453936W'} showFavouriteBtn={false} />
    </>
  );
}
