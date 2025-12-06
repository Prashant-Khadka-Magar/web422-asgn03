/*********************************************************************************
 * WEB422 – Assignment 1
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Prashant Khadka Magar Student ID: 137740239 Date: 2025/10/08
 *
 ********************************************************************************/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const queryString = new URLSearchParams(router.query).toString();

  const { data, error } = useSWR(
    `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  let previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  let next = () => {
    setPage((page) => page + 1);
  };

  let subtext = "";

  subtext = Object.keys(router.query)
    .map((key) => `${key}: ${router.query[key]}`)
    .join(", ");

  return (
    <>
      <PageHeader text={`Search Results`} subtext={subtext}></PageHeader>
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(book.key)}
              style={{ cursor: "pointer" }}
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Table>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
