import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { readToken, removeToken } from "@/lib/authenticate";
import { useRouter } from "next/router";

function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Prashant
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          {token && (
            <Nav className="ms-auto">
              <NavDropdown title={token.userName} id="user-nav-dropdown">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!token && (
            <Nav className="ms-auto">
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
