import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import "./HeaderFooter.css"; // Import your custom CSS file

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  };

  return (
    <Navbar bg="black" expand="lg" variant="lg" className="navbar-custom">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Navbar.Collapse id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <span className="design-studio custom-font">Design Studio</span>
          </Link>
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" className="nav-link custom-font">
              Home
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/register" className="nav-link custom-font">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link custom-font">
                  Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={auth?.user?.name}
                id="basic-nav-dropdown"
                className="nav-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to={`/Dashboard/${
                    auth?.user?.role === "1" ? "AdminDashboard" : "UserDashboard"
                  }`}
                  className="dropdown-item custom-font"
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleLogout}
                  as={Link}
                  to="/login"
                  className="dropdown-item custom-font"
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link as={Link} to="/Dashboard" className="nav-link custom-font">
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
