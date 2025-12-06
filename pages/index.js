/*********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Prashant Khadka Magar Student ID: 137740239 Date: 05/12/2025
*
*  Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      author: "",
      title: "",
      subject: "",
      language: "",
      first_publish_year: "",
    },
  });

  const router = useRouter();

  function submitForm(data) {
    const query = new URLSearchParams(data).toString();
    router.push(`/books?${query}`);
  }

  useEffect(() => {}, []);

  return (
    <div>
      <p>Search</p>

      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                className={`w-100 py-3 fs-5 ${errors.author && "is-invalid"}`}
                type="text"
                placeholder="Enter author"
                {...register("author", { required: true })}
              />
              {errors.author?.type === "required" && (
                <span>
                  <br />
                  Author is required
                </span>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className={`w-100 py-3 fs-5 ${errors.title && "is-invalid"}`}
                type="text"
                placeholder="Enter title"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <span>
                  <br />
                  Title is required
                </span>
              )}
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                className={`w-100 py-3 fs-5 ${errors.subject && "is-invalid"}`}
                type="text"
                placeholder="Enter subject keyword"
                {...register("subject", { required: true })}
              />
              {errors.subject?.type === "required" && (
                <span>
                  <br />
                  Subject is required
                </span>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="formLanguage" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                className={`w-100 py-3 fs-5 ${errors.language && "is-invalid"}`}
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength="3"
                {...register("language", { required: true })}
              />
              {errors.language?.type === "required" && (
                <span>
                  <br />
                  Language is required
                </span>
              )}
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="formPublishYear" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                className={`w-100 py-3 fs-5 ${
                  errors.first_publish_year && "is-invalid"
                }`}
                type="number"
                placeholder="Enter published year"
                {...register("first_publish_year", { required: true })}
              />
              {errors.first_publish_year?.type === "required" && (
                <span>
                  <br />
                  Published Year is required
                </span>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12}>
            <Button
              variant="primary"
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
