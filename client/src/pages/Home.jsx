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

  //WAITING FOR ACTIONS ENDPOINTS TO BE FINISHED TO DO THIS PART - carol
  //also id want this one to only get the 10 last added actions, and then idk if we divide them into individual/group actions or not tbd
  // async function getActionsOfTheWeek() {
  //   try {
  //     const response = await fetch(`/actions/`);
  //     const data = await response.json();
  //need some kind of if statement to check if its a group or a individual action
  //     setIndividualAction(dataOfIndividualAction);
  //     setGroupAction(dataOfGroupAction);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    // info
    // introduction
    // no filters
    // calls to action of the week
    // login button
    <div>
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
      <div>hello this is our homepage</div>
      <div>we need info and kind of an introduction to our app</div>
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
