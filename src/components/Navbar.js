/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Logo from "../assets/images/mery-icon.png";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  // const [notifications, setNotifications] = useState([]);
  // const [socket, setSocket] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = () => {
      let { user, role, image } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setUser(user);
      setRole(role);
    };
    fetchData();
  }, []);

  return (
    <section>
      <nav
        className="navbar pe-5 ps-3 navbar-expand-lg py-40"
        style={{ backgroundColor: "#F9FAFF" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={Logo} width="60" height="60" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto text-lg gap-lg-0 gap-2">
              <NavLink
                to="/dashboard"
                exact
                className="nav-item nav-link my-auto"
                activeClassName="active"
              >
                Home
              </NavLink>
              <NavLink
                to="/officer"
                className="nav-item nav-link my-auto"
                activeClassName="active"
              >
                Officer
              </NavLink>
              <NavLink
                to="/manager"
                className="nav-item nav-link my-auto"
                activeClassName="active"
              >
                Manager
              </NavLink>
              <NavLink
                to="/finance"
                className="nav-item nav-link my-auto"
                activeClassName="active"
              >
                Finance
              </NavLink>
            </ul>
            <div className="vertical-line d-lg-block d-none"></div>
            <div className="d-flex align-items-center">
              <p className="text-lg color-palette-1 ms-3 my-auto">
                {role}, {user}
              </p>
              <button
                onClick={() => handleLogout()}
                className="btn btn-link text-decoration-none ms-3 my-auto"
              >
                <FaSignOutAlt size={20} color="black" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Navbar;
