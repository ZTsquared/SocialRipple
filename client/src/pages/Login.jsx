import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar"

export default function Login() {
	const { isLoggedIn, onLogin } = useAuth();

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const navigate = useNavigate();
	const { username, password } = credentials;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const login = async () => {
		try {
			console.log("trying...");
			const { data } = await axios("/api/auth/login", {
				method: "POST",
				data: credentials,
			});
			//store it locally
			localStorage.setItem("token", data.token);
			onLogin();
			navigate("/MainMenu");
		} catch (error) {
			console.log(error);
		}
  }
	
  return (
    <div className="body">
      <div>
        <h2> Login:</h2>
        <label htmlFor="username_input">
          username: <br />
          <input
            value={username}
            name="username"
            onChange={handleChange}
            id="username"
            type="text"
          />
        </label>
        <br />
        <br />
        <label htmlFor="password_input">
          password: <br />
          <input
            value={password}
            name="password"
            onChange={handleChange}
            id="password"
            type="password"
          />
          <br />
          <br />
        </label>{" "}
        <br />
        <button onClick={login}>login</button> <br/><br/>
        <Link to="/Register" className="btn btn-success">
                Sign Up
        </Link>
      </div>
    </div>
  );
}
