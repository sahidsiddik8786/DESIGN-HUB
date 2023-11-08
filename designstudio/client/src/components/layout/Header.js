import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { Link, useLocation } from "react-router-dom";
import "./HeaderFooter.css"; // Import your custom CSS file
import SearchInput from "../Form/Searchinput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  };

  const isShopPage = location.pathname === "/Shop";

  return (
    <Navbar bg="black" expand="lg" variant="lg" className="navbar-custom">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Navbar.Collapse id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <img
              src="assets/img/logo/company logo.png"
              alt=""
              style={{ width: "140px", height: "auto" }}
            />
          </Link>
          <Nav className="ms-auto mb-2 mb-lg-0">
          <div className="search-bar-wrapper"> {/* Add this wrapper */}
              {isShopPage && <SearchInput />}
            </div>
            <Nav.Link as={Link} to="/" className="nav-link custom-font">
              Home
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/register" className="nav-link custom-font">
                  Sign Up
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="nav-link custom-font">
                  Sign In
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
            <Nav.Link as={Link} to="/Shop" className="nav-link custom-font">
              Shop
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="nav-link custom-font">
              Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
