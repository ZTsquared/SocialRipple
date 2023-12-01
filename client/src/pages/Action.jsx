import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Action.css";
import { useCountdown } from "../hooks/useCountdown";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Action() {
	const [oneAction, setOneAction] = useState([]);
	const { ActionId } = useParams();
	let navigate = useNavigate();

	useEffect(() => {
		displayOneAction();
	}, [ActionId]);

	async function displayOneAction() {
		try {
			const response = await fetch(`/api/actions/${ActionId}`);
			if (!response.ok) {
				throw new Error("Oops, something went wrong");
			}
			const data = await response.json();
			setOneAction(data);
		} catch (error) {
			console.log(error);
		}
	}

	const targetDate = new Date(oneAction.end_time).getTime();

	const { days, hours, minutes, seconds } = useCountdown(targetDate);

	return (
		<div>
			{/* <div className="left-side"> */}
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
								<div>
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
							{oneAction.online
								? `Follow this link: ${oneAction.online_link} `
								: `Location: ${oneAction.longitude} ${oneAction.latitude}`}{" "}
							{/* // {oneAction.online && `Follow this link: ${oneAction.online_link} `} :{" "}
				// {oneAction.in_person && `${oneAction.longitude} ${oneAction.latitude}`} */}
						</Tab>

						<Tab
							eventKey="when"
							title="When?"
							className="actionTabContent-css ">
							{oneAction.start_time
								? `Start time: ${oneAction.start_time}`
								: "Take as long as you want!"}{" "}
							{oneAction.end_time ? `End time: ${oneAction.end_time}` : ""}{" "}
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
												<div className="col">{requirement.description}</div>
												<div className="col">
													{requirement.capacity} people needed
													<div id="actionVolunteerContent-css">
														{requirement.Volunteerships &&
															requirement.Volunteerships.length > 0 && (
																<div>
																	Volunteers:{" "}
																	{requirement.Volunteerships.map(
																		(volunteership) => (
																			<div key={volunteership.id}>
																				<div>{volunteership.User.username}</div>
																				{/* <div>Completed: {volunteership.completed}</div> */}
																			</div>
																		)
																	)}
																</div>
															)}
													</div>
													<button
														type="button"
														className="btn btn-primary btn-sm">
														Join
													</button>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</Tab>
					</Tabs>
				</div>

				<div className="actionBottomContainer-css">
					<div className="countdown">
						{days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
							<div>Countdown is over!</div>
						) : (
							<div>
								Remaining time: {days} days, {hours} hours, {minutes} minutes,{" "}
								{seconds} seconds
							</div>
						)}
					</div>

					{/* back to actionsmenu page */}
					<div className="buttonSection" id="singleButton">
						<button className="backButton" onClick={() => navigate(-1)}>
							Back
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
