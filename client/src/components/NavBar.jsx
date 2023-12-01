import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function NavBar() {
    const { isLoggedIn, onLogout, onLogin } = useAuth();

    function handleLogout() {
        console.log("Logged out");
        onLogout();
        navigate("/");
      }

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>
        {isLoggedIn ? (
            <div>
            <Link to="/MainMenu" className="btn btn-success">
              Calls to action
            </Link>
            <Link to="/Action/Create" className="btn btn-success">
                Create Action
            </Link>
            <Link to="/Profile" className="btn btn-success">
                Profile
            </Link>
            {/* <button className="btn btn-success" onClick={handleLogout}> */}
            <button className="btn btn-success" onClick={handleLogout}>
                Logout
            </button>
            </div>
        ) : (
            <div>
            <Link to="/Login" className="btn btn-success">
                Login
            </Link>
            </div>
        )}
        </nav>
    </header>
  )
}
