import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar"

// shows the profile of the logged user.
// it shows the user basic info (i'm thinking name, age, interests, profile pic, etc...)
// and also the events the user is registered as a volunteer or as taking a challenge.
// this for now and we build on top of that

export default function Profile() {
	const [user, setUser] = useState([]);
	const [preferences, setPreferences] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getUsers();
	}, []);

	useEffect(() => {
		getPreferences();
	}, [user]);

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

	function getPreferences() {
		setPreferences(user.Keywords);
	}


  return (
    <div className="body">
      <NavBar/>
			<h1>User profile</h1>
			<h3>Hello {user.username}!</h3>
			<div>These are your preferences:</div>
			<div>
				{preferences?.map((e) => (
					<div>{e.keyword}</div>
				))}
			</div>
			<div>
				You have been a member since:
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
