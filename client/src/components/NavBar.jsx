import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import useAuth from "../hooks/useAuth";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

export default function NavBar() {
  const { isLoggedIn, onLogout, onLogin } = useAuth();
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await fetch(`/api/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  function handleLogout() {
    console.log("Logged out");
    onLogout();
    navigate("/");
  }

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };
  return (
    <nav
      className="navbar bg-body-tertiary fixed-top"
      style={{
        marginBottom: "30px",
        background: "linear-gradient(to right, #001B79, #FF90C2)",
        color: "#1640D6",
      }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          style={{
            color: "#1640D6",
          }}
        >
          SocialRipple
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleToggleOffcanvas}
          style={{
            color: "#1640D6",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`offcanvas offcanvas-end${showOffcanvas ? " show" : ""}`}
          tabIndex="-1"
          	style={{
						width: "15%",
						backgroundColor: "#efdceb",
						// color: "#1640D6",
					}}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            {isLoggedIn ? (
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Hey, {user?.username}!
              </h5>
            ) : (
              <h5>Welcome!</h5>
            )}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={handleToggleOffcanvas}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link to="/" onClick={handleToggleOffcanvas}>
                  <div className="nav-link active" aria-current="page" href="#">
                    Home
                  </div>
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link to="/Actions" onClick={handleToggleOffcanvas}>
                  <div className="nav-link active" aria-current="page" href="#">
                    Actions
                  </div>
                </Link>
              </li>{" "}
              {isLoggedIn && (
                <div>
                  <li className="nav-item">
                    <Link to="/Action/Create" onClick={handleToggleOffcanvas}>
                      <div
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Create Action
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Profile" onClick={handleToggleOffcanvas}>
                      <br />
                      <div
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Profile
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Action/Create" onClick={handleToggleOffcanvas}>
                      <div
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                        onClick={handleLogout}
                      >
                        Log out
                      </div>
                    </Link>
                  </li>
                </div>
              )}
              {!isLoggedIn && (
                <div>
                  <li className="nav-item">
                    <Link to="/Login" onClick={handleToggleOffcanvas}>
                      <div
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Sign Up or Log in
                      </div>
                    </Link>
                  </li>
                </div>
              )}
            </ul>
            {/* <form className="d-flex mt-3" role="search"> //just leaving this in here in case we want a search bar at any point 

              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
