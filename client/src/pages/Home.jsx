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
      <br />
      <h2>Our apps name </h2>
      <div className="homepageParagraph">
        <p>
          Welcome to (we need a name asap), a platform designed to foster
          connections through meaningful social change. Our mission is to
          provide a space where individuals can engage in transformative Calls
          to Actions—events and challenges that transcend the ordinary. Whether
          you prefer the camaraderie of group activities or the personal
          challenge of individual pursuits, our platform offers diverse
          opportunities, both online and in person. At the core of our vision is
          the belief that creating positive societal impact can also be a
          catalyst for building lasting friendships and combating isolation
          within communities. Join us in our commitment to make a difference
          while forging meaningful connections that extend beyond the boundaries
          of social change.
        </p>
      </div>

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
