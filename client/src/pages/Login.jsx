import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar";

export default function Login() {
	const { isLoggedIn, onLogin } = useAuth();
	const [mouseOverJoinButton, setMouseOverJoinButton] = useState(false);
	const [show, setShow] = useState(true);


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

	function closeModal() {
		setShow(false);
		setTimeout(() => {
			navigate("/");
			//setShowSuccessMessage(false); // Reset the success message state when closing the modal
		}, 1000);
		setTimeout(() => navigate("/", { state: location.state }), 300);
	}

	const login = async () => {
		try {
			console.log(credentials);
			console.log("trying...");
			const { data } = await axios("/api/auth/login", {
				method: "POST",
				data: credentials,
			});
			//store it locally
			localStorage.setItem("token", data.token);
			onLogin();
			navigate("/Actions");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="body">

				<Modal
					show={show}
					onHide={closeModal}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
					>
					<Modal.Header closeButton style={{backgroundColor: "#babecb"}}>
						<Modal.Title>Login</Modal.Title>
					</Modal.Header>
					<Modal.Body >
						<div>
						{/* <h2 className="loginHeading-css"> Login</h2> */}
						<div
							className="
							loginBox-css">
							<label htmlFor="username_input">
								Username <br />
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
								Password <br />
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
							<button onClick={login} className="btn btn-success">
								login
							</button>{" "}
							<br />
							<br />
							<Link to="/Register">Don't have an account yet?</Link>
						</div>
					</div>
					</Modal.Body>
				<Modal.Footer style={{backgroundColor: "#babecb"}}>

					
				</Modal.Footer>
			</Modal>
			
		</div>
	);
}
