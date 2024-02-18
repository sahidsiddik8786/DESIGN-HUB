import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "./HeaderFooter.css";
import './AdminMenu.css';
const AdminMenu = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSidebar = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div id="wrapper" className={`toggled-${isToggled ? '2' : ''}`}>
    <div className="admin-menu">
      <div className="list-group dashboard-menu">
      <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
      <li className="active">
            <a href="/Dashboard/AdminDashboard"><span className="fa-stack fa-lg pull-left"><i className="fa fa-dashboard fa-stack-1x "></i></span> Dashboard</a>
            <ul className="nav-pills nav-stacked">
              <li><a href="#">link1</a></li>
              <li><a href="#">link2</a></li>
            </ul>
          </li>
          </ul>
      
        <NavLink to="/Dashboard/AdminDashboard/adminregister" className="list-group-item list-group-item-action">
          Registration  
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-category" className="list-group-item list-group-item-action">
          Create Category
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-subcategory" className="list-group-item list-group-item-action">
          Create SubCategory
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-product" className="list-group-item list-group-item-action">
          Create Product
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/products" className="list-group-item list-group-item-action">
          Product
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-categorydesign" className="list-group-item list-group-item-action">
          Create Category for design
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/designimages" className="list-group-item list-group-item-action">
          Upload Category Based Images
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-subcategorydesign" className="list-group-item list-group-item-action">
          Create SubCategory for design
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/create-designs" className="list-group-item list-group-item-action">
          Create Designs
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/designs" className="list-group-item list-group-item-action">
          Designs
        </NavLink>
        <NavLink to="/Dashboard/admin/orders" className="list-group-item list-group-item-action">
         Orders
        </NavLink>
        <NavLink to="/Dashboard/AdminDashboard/Users" className="list-group-item list-group-item-action">
          Users
        </NavLink>
      </div>
    </div>
    </div>
  );
};

export default AdminMenu;
