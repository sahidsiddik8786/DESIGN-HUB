import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { Link, useLocation } from "react-router-dom";

import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

const StaffHeader = ({ OpenSidebar }) => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  };

  const fontSize = "24px"; // Adjust the font size as needed
  const marginRight = "15px";


  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        <div className="avatar avatar-xl">
          <img src="/images/1.jg" alt="" />
        </div>
        <NavDropdown
        title={
          <span
            style={{
              color: "white",
              fontSize,
              marginRight,
              textTransform: "none",
            }}
          >
            {auth?.user?.firstname} {auth?.user?.lastname}
          </span>
        }
        id="basic-nav-dropdown"
        className="nav-dropdown"
      >
        <NavDropdown.Item
          onClick={handleLogout}
          as={Link}
          to="/Login-staff"
          style={{
            color: "black",
            fontSize,
            marginRight,
            textTransform: "none",
          }}
          className="dropdown-item custom-font"
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
      </div>
    </header>
  );
};

export default StaffHeader;
