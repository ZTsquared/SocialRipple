import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
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
            {/* <button className="btn btn-success" onClick={handleLogout}> */}
            <button className="btn btn-success">
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
  )
}
