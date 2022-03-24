import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const cookies = new Cookies();
  const token = cookies.get("mycookie");
  const navigate = useNavigate();

  const logout = () => {
    console.log(token);
    cookies.remove("mycookie");
    navigate("/log_reg");
  };

  const HomeScreen = () => {
    if (token && token !== "undefined") {
      navigate("/joblist", { replace: true });
    } else {
      navigate("/log_reg", { replace: true });
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav >
            <Nav.Link onClick={() => HomeScreen()}>
              <Navbar.Brand>Home</Navbar.Brand>
            </Nav.Link>
          </Nav>
          <Nav>
          <NavDropdown title="Cliente" id="basic-nav-dropdown">
          
            <NavDropdown.Item href="/client_list">Lista</NavDropdown.Item>
            
            <LinkContainer to="/client_reg">
            <NavDropdown.Item>
              Adicionar
            </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>

          <NavDropdown title="Trabalho" id="basic-nav-dropdown">
          <LinkContainer to="/joblist">
            <NavDropdown.Item href="#action/3.1">Lista</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/job_reg">
            <NavDropdown.Item>
              Adicionar
            </NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          </Nav>
          <Nav>
          <LinkContainer to="/log_reg">
            <Navbar.Brand onClick={() => cookies.remove("mycookie")}>
              Login
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
