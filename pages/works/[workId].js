import { useRouter } from "next/router";
import useSWR from "swr";
import BookDetails from "@/components/BookDetails";
import Error from "next/error";
import PageHeader from "@/components/PageHeader";

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;

  console.log(workId);

  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <PageHeader text={data.title}></PageHeader>
      <BookDetails book={data} workId={workId}/>
    </>
  );
}
