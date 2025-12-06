import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import { Col, Row } from "react-bootstrap";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <div>
      {favouritesList.length > 0 ? (
        <>
          <PageHeader text="Properties" subtext="Your Favourite Books" />
          <Row className="gy-4">
            {favouritesList.map((workId) => (
              <Col lg={3} md={6} key={workId}>
                <BookCard workId={workId} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <PageHeader text="Nothing Here" subtext="Add a book" />
        </>
      )}
    </div>
  );
}
