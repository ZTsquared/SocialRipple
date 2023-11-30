import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, onLogout, onLogin } = useAuth();

  function handleLogout() {
    console.log("Logged out");
    onLogout();
    navigate("/MainMenu");
  }

  return (
    // info
    // introduction
    // no filters
    // calls to action of the week
    // login button
    <div>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>
          {isLoggedIn ? (
            <div>
              <Link to="/Action/Create" className="btn btn-success">
                Create Action
              </Link>
              <Link to="/Profile" className="btn btn-success">
                Profile
              </Link>
              <button className="btn btn-success" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/Login" className="btn btn-success">
                Login
              </Link>
              or
              <Link to="/Register" className="btn btn-success">
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </header>
      <h2>Our apps name </h2>
      <h4>hello this is our homepage</h4>
      <p>we need info and kind of an introduction to our app</p>
      <div>also need calls to actions of the week</div>
      <footer className="footer">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/MainMenu" className="btn btn-success">
            Calls to action
          </Link>
        </nav>
      </footer>
    </div>
  );
}
