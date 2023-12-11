import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";

export default function Register() {
	const { onLogin } = useAuth();
	const [preferences, setPreferences] = useState([]);
	const [userCoordinates, setUserCoordinates] = useState();
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
		organisation: false,
		street: "",
		house_number: "",
		city: "",
	});
	const [keywords, setKeywords] = useState([]);
	let { username, password, organisation, street, house_number, city } =
		credentials;
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value, checked } = e.target;
		if (name === "organisation") {
			setCredentials({ ...credentials, [name]: checked });
		} else setCredentials({ ...credentials, [name]: value });
		console.log(credentials);
		console.log(checked);
		// console.log(name);
	};

	useEffect(() => {
		getKeywords();
	}, []);

	useEffect(() => {
		setCoordinates(street, house_number, city);
	}, [city]);

	const getKeywords = async function () {
		try {
			const res = await fetch(`/api/keywords/`);
			if (!res.ok) throw new Error(`Oops!`);
			const data = await res.json();
			setKeywords(data);
		} catch (error) {
			setError(error.message);
		}
	};

	const register = async (user) => {
		try {
			console.log("trying...");
			const { data } = await axios("/api/auth/register", {
				method: "POST",
				data: { user, preferences },
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
		login();
	};

	const setCoordinates = async (street, number, city) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`
			);
			const responseToJson = await response.json();
			console.log(responseToJson);
			setUserCoordinates(responseToJson.results[0].geometry.location);
			return responseToJson.results[0].geometry.location;
		} catch (error) {
			console.log(error.message);
		}
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
			navigate("/Profile");
		} catch (error) {
			console.log(error);
		}
	};

	function handleKeywordChange(e) {
		console.log(credentials);
		if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
		else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		await setCoordinates(
			credentials.street,
			credentials.number,
			credentials.city
		);

		register({
			username: credentials.username,
			password: credentials.password,
			organisation: credentials.organisation,
			latitude: userCoordinates?.lat,
			longitude: userCoordinates?.lng,
			city: credentials.city,
		});

		login();
	}

	return (
		<div>
			<div className="registerPage-css">
				<div>
					<br />
					<div className="registerTitle-css">
						<h2> Sign up</h2>
					</div>
					<form onSubmit={() => handleSubmit(event)} action="">
						<label htmlFor="username" className="form-label">
							Username: <br />
							<input
								value={username}
								name="username"
								onChange={handleChange}
								id="username"
								type="text"
								className="form-control"
							/>
						</label>
						<br />
						<br />
						<label htmlFor="password" className="form-label">
							Password <br />
							<input
								value={password}
								name="password"
								onChange={handleChange}
								id="password"
								type="password"
								className="form-control"
							/>
						</label>
						<br /> <br />
						<label htmlFor="organisation" className="form-label">
							Are you an organisation? <br />
							<input
								value={organisation}
								name="organisation"
								onChange={handleChange}
								id="organisation"
								type="checkbox"

								// className="form-control"
							/>
							<br />
							<br />
						</label>
						<div>Address</div>
						<label htmlFor="street" className="form-label">
							<input
								placeholder="Street Name"
								onChange={handleChange}
								type="text"
								name="street"
								id="street"
								className="form-control"
							/>
						</label>
						<label htmlFor="house_number" className="form-label">
							<input
								placeholder="Number"
								onChange={handleChange}
								type="text"
								name="house_number"
								id="house_number"
								className="form-control"
							/>
						</label>{" "}
						<label htmlFor="city" className="form-label">
							<input
								placeholder="City"
								onChange={handleChange}
								type="text"
								name="city"
								id="city"
								className="form-control"
							/>
						</label>{" "}
						<br />
						<br />
						<label className="form-label">What are your interests?</label>
						<br />
						<div className="preferencesInRegisterPage-css row justify-content-center">
							{keywords.map((keyword, index) => (
								<div
									key={keyword.id}
									className={`col-2 mb-3 d-flex justify-content-center align-items-center`}
									style={{ margin: index % 3 === 2 ? "5px" : "10px" }}>
									<div className="d-inline-flex" style={{ gap: "67px" }}>
										<input
											id={keyword.id}
											value={keyword.id}
											type="checkbox"
											name="preferences"
											onChange={handleKeywordChange}
											checked={
												preferences.includes(keyword.id) ? "checked" : null
											}
											className="btn-check"
											autoComplete="off"
										/>
										<label
											className="btn"
											htmlFor={keyword.id}
											style={{ backgroundColor: "#e4f1fe" }}>
											{keyword.keyword}
										</label>
									</div>
								</div>
							))}
						</div>
						<br />
						<button className="sigInButton-css">Sign in</button>
					</form>
					<br />
				</div>
			</div>
		</div>
	);
}
