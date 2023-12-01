import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import ActionCard from "../components/ActionCard";

export default function ActionsIndividual() {
  const { isLoggedIn, onLogout, onLogin } = useAuth();
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getActions();
  }, []);

  function handleLogout() {
    console.log("Logged out");
    onLogout();
    navigate("/");
  }

  async function getActions() {
    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setActions(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="body">
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>
          Nav bar of our awesome app{" "}
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
              <Link to="/Register" className="btn btn-success">
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </header>
      <div>
        <Link to="/MainMenu/Individual" className="btn btn-success">
          Individual actions
        </Link>
        <Link to="/MainMenu/Group" className="btn btn-success">
          Group actions
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <h3>Individual Actions</h3>
          {actions.map(
            (action, index) =>
              !action.is_group && <ActionCard action={action} index={index} />
          )}
        </div>
        <footer className="footer">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/Home" className="btn btn-success">
              Homepage
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
