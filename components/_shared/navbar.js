import Next from "next";
import { Navbar, Button, Nav } from "react-bootstrap";

const NavbarTop = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Clipboard Health</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-5 pr-3">
          <Nav.Link href="#home">Profile</Nav.Link>
          <Nav.Link href="#link">Jobs</Nav.Link>
          <Nav.Link href="#link">Professional Network</Nav.Link>
          <Nav.Link href="#link">Lounge</Nav.Link>
          <Nav.Link href="#link">Salary</Nav.Link>
        </Nav>
        <Button variant="outline-success">Create Job</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarTop;
