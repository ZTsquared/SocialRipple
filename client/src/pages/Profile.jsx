import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// shows the profile of the logged user.
// it shows the user basic info (i'm thinking name, age, interests, profile pic, etc...)
// and also the events the user is registered as a volunteer or as taking a challenge.
// this for now and we build on top of that

export default function Profile() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>
          Nav bar of our awesome app{" "}
          <div>
            <Link to="/MainMenu" className="btn btn-success">
              Calls to action
            </Link>

            <button className="btn btn-success">Logout</button>
          </div>
        </nav>
      </header>
      <h1>User profile</h1>
      <h3>Hello {user.username}!</h3>
      <div>These are your preferences:</div>
      <div>{user.Keywords}</div>
      <div>
        You have been a memeber since:{" "}
        {
          <div className="dateAtEntry">
            {new Date(user.createdAt).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        }
      </div>
      <Link to="/Action/Create">
        <button className="btn btn-success">Create a new action!</button>
      </Link>
    </div>
  );
}
