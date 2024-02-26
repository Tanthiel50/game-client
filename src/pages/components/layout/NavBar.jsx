import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavScrollExample() {
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">GameSpeak</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <NavDropdown title="Lexique" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">MMOG</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Argot internet
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">Jeux vidéos</NavDropdown.Item>
              <NavDropdown.Item href="#action6">Jeux de rôles</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action7">Tout</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action2">Ajouter un mot</Nav.Link>
            <Nav.Link href="#action2">Se connecter</Nav.Link>
            <Nav.Link href="#action2">S'enregistrer</Nav.Link>
            <NavDropdown title="Profil" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action4">Mots favoris</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Paramètres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action7">
                Se déconnecter
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
