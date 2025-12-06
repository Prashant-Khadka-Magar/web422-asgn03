import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setWarning("");

    try {
      await authenticateUser(user, password);

      await updateAtom();

      router.push("/");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>

      {warning && (
        <>
          <br />
          <Alert variant="danger">{warning}</Alert>
        </>
      )}

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>

        <br />

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
