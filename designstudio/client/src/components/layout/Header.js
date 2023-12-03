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
  return (
<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect sticky="top">

    {/* <Navbar className="navbar navbar-expand-lg navbar-custom ">
      // <Navbar bg="black" expand="lg" variant="lg" className="navbar-custom">*/}
    <div className="container-fluid">
      <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
      <Link to="/" style={{ color: "white" }} className="navbar-brand">
        Design Studio
      </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <Navbar.Collapse
          id="navbarTogglerDemo01"
          className="justify-content-left"
        >
          <Nav className="mb-2 mb-lg-0">
            {/* ... other Nav.Link components ... */}
            <Nav.Link as={Link} to="/" style={{ color: "white" }} className="nav-link custom-font">
              Home
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "white" }} className="nav-link custom-font">
                <i className='fas fa-user'></i>Sign In
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
              title={<span style={{ color: "white" }}>{auth?.user?.name}</span>}
              id="basic-nav-dropdown"
              className="nav-dropdown"
            >
                <NavDropdown.Item
                  as={Link}
                  to={`/Dashboard/${
                    auth?.user?.role === "1" ? "AdminDashboard" : "UserDashboard"
                  }`}
                  style={{ color: "black" }}
                  className="dropdown-item custom-font"
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={handleLogout}
                  as={Link}
                  to="/login"
                  style={{ color: "black" }}
                  className="dropdown-item custom-font"
                >
                  Logout
                </NavDropdown.Item>
               {/*<NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>*/}
              </NavDropdown>
            )}
            {auth.user?.role !== "1" && (
              <>
                <Nav.Link
                  as={Link}
                  to="/Shop"
                  style={{ color: "white" }}
                  className="nav-link custom-font"
                >
                  Shop
                </Nav.Link>
                {auth.user ? (
                  <div className="nav-item">
                    <Badge count={cart?.length} showZero>
                      <Nav.Link
                        as={Link}
                        to="/cart"
                        style={{ color: "white" }}
                        className="nav-link custom-font"
                      >
                       <i className='fas fa-shopping-cart'></i>
                      </Nav.Link>
                    </Badge>
                  </div>
                ) : null}
              </>
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