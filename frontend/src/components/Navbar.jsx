import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    navigate("/");
    window.location.reload(); // refresh UI
  };
  const isAdminPage = sessionStorage.getItem("isAdmin")

  const toggleMenu = () => setOpen(!open);
  const navLinks = document.querySelectorAll(".nav-link");

  const closeMenu = () => {
    setOpen(false);
  };
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));

      // add active class to clicked link
      link.classList.add("active");
    });
  });

  return (
    <nav className="navbar p-0" style={{ backgroundColor: "maroon" }}>
      <div
        className="container-fluid d-flex flex-column align-items-center 
"
        style={{ minHeight: "87px" }}
      >
        {/* Top Row: Logo + Heading + Hamburger */}
        <div
          className="d-flex w-100 align-items-center  position-relative"
          style={{ minHeight: "80px" }}
        >
          {/* Logo + Heading */}
          <div
            className="d-flex align-items-center text-center flex-shrink-1"
            style={{ maxWidth: "calc(100% - 50px)" }}
          >
            <div className="logo-wrapper">
              <img
                src="/images/hhlogo.png"
                alt="Logo"
                width="70"
                height="70"
                className="me-2"
              />
            </div>
            <div
              className="d-flex flex-column text-start "
              style={{ paddingLeft: "30px" }}
            >
              <h1
                className="m-0 fw-bold text-white"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.2",
                  whiteSpace: "normal",
                }}
              >
                HELPING HANDS RGUKT-NUZVID
              </h1>
              <p className="m-0 text-white" style={{ fontSize: "0.75rem" }}>
                A Students's Initiative - An Abode of Service
              </p>
              <p className="m-0 text-white" style={{ fontSize: "0.7rem" }}>
                (Regd No. 313/2019 under the A.P. Societies Registration Act,
                2001)
              </p>
            </div>
          </div>

          {/* Hamburger button */}
          <button
            className="navbar-toggler navbar-dark d-md-none"
            type="button"
            onClick={toggleMenu}
            style={{
              outline: "none",
              boxShadow: "none",
              border: "none",
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                backgroundImage:
                  "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='white' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "35px",
                height: "35px",
                display: "inline-block",
              }}
            ></span>
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`w-100 mt-2 ${open ? "d-block" : "d-none"} d-md-flex`}
          style={{
            backgroundColor: "white",
            borderRadius: "3px",
            position: "relative",
            top: "-9px",
          }}
        >
          <ul
            className="navbar-nav d-flex flex-column flex-md-row justify-content-between align-items-center w-100 flex-wrap
        px-5"
          >
            <li className="nav-item mx-2 my-1">
              <Link
                className="nav-link fw-bold active"
                style={{ color: "maroon" }}
                to="/"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-item mx-2 my-1">
              <Link
                className="nav-link fw-bold"
                style={{ color: "maroon" }}
                to="/about"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li
              className="nav-item dropdown mx-2 my-1 position-relative"
              onMouseEnter={() => setDeptOpen(true)}
              onMouseLeave={() => setDeptOpen(false)}
              onClick={closeMenu}
            >
              <button
                className="nav-link fw-bold dropdown-toggle"
                style={{
                  color: "maroon",
                  background: "transparent",
                  border: "none",
                }}
                onClick={() => setDeptOpen(!deptOpen)}
              >
                Departments
              </button>
              {deptOpen && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    display: "block",
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "white",
                    border: "2px solid maroon",
                    borderRadius: "8px",
                    zIndex: 10,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  {[
                    { label: "HealthCare", path: "/healthCare" },
                    { label: "InternalCare", path: "/internalCare" },
                    {
                      label: "Innovative & Informative",
                      path: "/innovativeAndInformative",
                    },
                    { label: "Outside Charity", path: "/outsideCharity" },
                    { label: "Public Relations", path: "/publicRelations" },
                  ].map((dept) => (
                    <li key={dept.path}>
                      <Link
                        to={dept.path}
                        style={{
                          display: "block",
                          padding: "10px 20px",
                          color: "maroon",
                          fontWeight: "600",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "maroon";
                          e.target.style.color = "white";
                          e.target.style.borderRadius = "5px";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "maroon";
                        }}
                      >
                        {dept.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="nav-item mx-2 my-1">
              <Link
                className="nav-link fw-bold"
                style={{ color: "maroon" }}
                to="/events"
                onClick={closeMenu}
              >
                Events
              </Link>
            </li>
            <li className="nav-item mx-2 my-1">
              <Link
                className="nav-link fw-bold"
                style={{ color: "maroon" }}
                to="/gallery"
                onClick={closeMenu}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item mx-2 my-1">
              
                <Link
                  className="nav-link fw-bold"
                  style={{ color: "maroon" }}
                  to="/ourTeam"
                  onClick={closeMenu}
                >
                  Our Team
                </Link>
              
            </li>
            <li className="nav-item mx-2 my-1">
              <Link
                className="nav-link fw-bold"
                style={{ color: "maroon" }}
                to="/certificate"
                onClick={closeMenu}
              >
                Certificate
              </Link>
            </li>

            
           
            {/* Donate Button */}
            <li className="nav-item mx-2 my-1">
              <Link
                className="nav-link fw-bold"
                style={{ color: "maroon" }}
                to="/donateUs"
                onClick={closeMenu}
              >
                Donate Us
              </Link>
              
               {/* Logout Button (only if admin) */}
            </li>
            {isAdminPage && (
              <li className="nav-item mx-2 my-1">
                <button
                  className="btn btn-outline-danger"
                  style={{ whiteSpace: "nowrap", minWidth: "100px" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}
