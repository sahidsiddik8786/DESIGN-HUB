import React from "react";
import { NavLink } from "react-router-dom";
import "./HeaderFooter.css"; // Make sure your CSS file is named correctly

const UserMenu = () => {
  return (
    <div className="user-menu-container">
      <div className="sidebar-title">
        <h2>Hello</h2>
        <div className="menu-divider"></div>
      </div>
      
      <div className="menu-items">
        <NavLink to="/Dashboard/UserDashboard" className="menu-item">
        
          <span>User Details</span>
        </NavLink>
        <NavLink
          to="/Dashboard/UserDashboard/Profile"
          className="menu-item"
        >
      
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/Dashboard/UserDashboard/Orders"
          className="menu-item">
         
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
