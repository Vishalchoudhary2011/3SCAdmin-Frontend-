import React from "react";
import "../../../style/sidebar.css";
import ScaiIcon from "../../../assets/3sc.png";
import UserIcon from "../../../assets/user.png";
import DashboardIcon from "../../../assets/dashboard.webp";
import GridIcon from "../../../assets/grid.jfif";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <img src={ScaiIcon} alt="3SC Icon" />
      </div>

      <div className="sidebar-profile">
        <div className="profile">
          <img src={UserIcon} alt="User Profile Pic" />
        </div>

        <div className="profile-info">
          <h4>Petey Jerry</h4>
          <p>Admin Control</p>
        </div>

        <div className="sidebar-list">
          <ul>
            <li>
              <Link to="/">
                <img src={DashboardIcon} /> <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/grid">
                <img src={GridIcon} alt="gridIcon"/> <span>Grid</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
