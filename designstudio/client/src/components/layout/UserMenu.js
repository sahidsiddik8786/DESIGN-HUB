import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <NavLink
            to="/Dashboard/UserDashboard">
              <h4>User Details</h4>
            </NavLink>
               <NavLink
                  to="/Dashboard/UserDashboard/Profile"
                     className="list-group-item list-group-item-action"
                      >
                       Profile
                      </NavLink>
                 <NavLink
            to="/Dashboard/UserDashboard/Orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
