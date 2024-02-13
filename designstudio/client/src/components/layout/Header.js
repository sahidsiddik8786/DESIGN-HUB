import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { Link, useLocation } from "react-router-dom";
import "./HeaderFooter.css"; // Import your custom CSS file
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  };
  const isShopPage = location.pathname === "/Shop";

  const fontSize = "24px"; // Adjust the font size as needed
  const marginRight = "15px"; // Adjust the space between each Nav.Link as needed

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect sticky="top">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Link to="/" style={{ color: "white", fontSize, textTransform: 'none' }} className="navbar-brand">
          DESIGN STUDIO
        </Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <Navbar.Collapse
            id="navbarTogglerDemo01"
            className="justify-content-left"
          >
            <Nav className="mb-2 mb-lg-0">
              {auth.user?.role !== "1" && (
                <Nav.Link as={Link} to="/" style={{ color: "white", fontSize, marginRight, textTransform: 'none' }} className="nav-link custom-font">
                  Interior
                </Nav.Link>
              )}

              {auth.user?.role !== "1" && (
                <Nav.Link
                  as={Link}
                  to="/Shop"
                  style={{ color: "white", fontSize, marginRight, textTransform: 'none' }}
                  className="nav-link custom-font"
                >
                  Products
                </Nav.Link>
              )}
              
              {auth.user?.role !== "1"  && (
                <div className="nav-item">
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    style={{ color: "white", fontSize, marginRight, textTransform: 'none' }}
                    className="nav-link custom-font"
                  >
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </div>
              )}

              {!auth.user ? (
                <Nav.Link as={Link} to="/login" style={{ color: "white", fontSize, marginRight, textTransform: 'none' }} className="nav-link custom-font">
                  <i className='fas fa-user'></i> SignIn
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={<span style={{ color: "white", fontSize, marginRight, textTransform: 'none' }}>{auth?.user?.firstname} {auth?.user?.lastname}</span>}
                  id="basic-nav-dropdown"
                  className="nav-dropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to={`/Dashboard/${
                      auth?.user?.role === "1" ? "AdminDashboard" : "UserDashboard"
                    }`}
                    style={{ color: "black", fontSize, marginRight, textTransform: 'none' }}
                    className="dropdown-item custom-font"
                  >
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={handleLogout}
                    as={Link}
                    to="/login"
                    style={{ color: "black", fontSize, marginRight, textTransform: 'none' }}
                    className="dropdown-item custom-font"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </ul>
        <ul>
          <div className="search-bar-wrapper">
            {isShopPage && <SearchInput />}
          </div>
        </ul>
      </div>
    </Navbar>
  );
};
export default Header;
