import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Action.css";
import { useCountdown } from "../hooks/useCountdown";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";

export default function Action() {
	const [oneAction, setOneAction] = useState({});
	const { ActionId } = useParams();
	const [requirements, setRequirements] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {
		displayOneAction();
	}, [ActionId]);

	useEffect(() => {
		console.log(oneAction);
	}, [oneAction]);

	async function displayOneAction() {
		try {
			const response = await fetch(`/api/actions/${ActionId}`);
			if (!response.ok) {
				throw new Error("Oops, something went wrong");
			}
			const data = await response.json();
			console.log(data.name);
			setOneAction(data);
		} catch (error) {
			console.log(error);
		}
	}

	const targetDate = new Date(oneAction.end_time).getTime();

	const { days, hours, minutes, seconds } = useCountdown(targetDate);

	const startTime = new Date(oneAction.start_time).toLocaleDateString("en-UK", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	const endTime = new Date(oneAction.end_time).toLocaleDateString("en-UK", {
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
	});

	// adding ruquirement and user id to volunteershi table
	async function addVolunteerships() {
		try {
			console.log("posting");
			const data = await fetch(`/api/users/profile/volunteerships`, {
				method: "POST",
				body: JSON.stringify({ requirements }),
				headers: {
					authorization: "Bearer " + localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			});
			console.log("returned by post:");
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	function handleCheckboxChange(e) {
		if (e.target.checked) setRequirements((r) => [...r, e.target.value]);
		else setRequirements((r) => r.filter((req) => req !== e.target.value));
	}

	// users to join events with the requirements selected
	const handleClick = () => {
		addVolunteerships();
	};

	return (
		<div>


			<div className="actioncontainer-css">
				<h1> {oneAction.name} </h1>
				<div className="tabs">
					<Tabs defaultActiveKey="description" id="tabs">
						<Tab
							eventKey="description"
							title="Description"
							className="actionTabContent-css ">
							<p>{oneAction.description}</p>
							{oneAction.Keywords && (
								<div className="keywordBadges">
									<ul>
										{oneAction.Keywords.map((keyword) => (
											<li className="badge bg-primary" key={keyword.id}>
												{keyword.keyword}
											</li>
										))}
									</ul>
								</div>
							)}
						</Tab>

						<Tab
							eventKey="location"
							title="Location"
							className="actionTabContent-css ">
							<div>
								<div className="container">
									{oneAction.online
										? `Follow this link: ${oneAction.online_link} `
										: `Location: ${oneAction.longitude} ${oneAction.latitude}`}{" "}
								</div>
								<div>
									{oneAction.start_time
										? `Start time: ${startTime}`
										: "Take as long as you want!"}{" "}
									{oneAction.end_time ? `End time: ${endTime}` : ""}{" "}
								</div>
							</div>{" "}
						</Tab>

						<Tab
							eventKey="requirements"
							title="Requirements"
							className="actionTabContent-css">
							{oneAction.Requirements && oneAction.Requirements.length > 0 && (
								<div className="container">
									{oneAction.Requirements.map((requirement) => (
										<div key={requirement.id}>
											<div className="row">
												<div className="col-6">{requirement.description}</div>
												<div className="col-2">
													<input
														value={requirement.id}
														type="checkbox"
														checked={
															requirements.includes(requirement.id)
																? "checked"
																: null
														}
														onChange={handleCheckboxChange}
													/>
												</div>
												{/* <div className="col-2">
													{requirement.Volunteerships.length !==
														requirement.capacity &&
														`${requirement.Volunteerships.length} / ${requirement.capacity}`}
												</div> */}

												<div className="col-2">
													{requirement.Volunteerships &&
														requirement.Volunteerships.length > 0 && (
															<div>
																Volunteers:{" "}
																{requirement.Volunteerships.map(
																	(volunteership) => (
																		<div key={volunteership.id}>
																			<div>{volunteership.User.username}</div>
																		</div>
																	)
																)}
															</div>
														)}
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</Tab>
					</Tabs>
				</div>
				<div className="container">
					<div className="row">
						{/* back to actionsmenu page */}
						<div className="col-3">
							<div className="buttonSection" id="singleButton">
								<button className="backButton" onClick={() => navigate(-1)}>
									Back
								</button>
							</div>
						</div>

						<div className="col-6">
							<div className="countdown">
								{days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
									<div>Countdown is over!</div>
								) : (
									<div>
										Time until action!
										<br></br>
										{days} days, {hours} hours, {minutes} minutes, {seconds}{" "}
										seconds
									</div>
								)}
							</div>
						</div>

						<div className="col-3">
							<div className="joinButton">
								<button
									type="button"
									className="btn btn-primary btn-sm"
									onClick={handleClick}>
									Join
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
