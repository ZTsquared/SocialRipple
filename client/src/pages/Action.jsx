import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Action.css";
import { useCountdown } from "../hooks/useCountdown";

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
			<div className="container">
				<div className="left-side">
					<h1> {oneAction.name} </h1>
					<h4> Description </h4>
					<p>{oneAction.description}</p>

					<div>
						{oneAction.online
							? `Follow this link: ${oneAction.online_link} `
							: `Location: ${oneAction.longitude} ${oneAction.latitude}`}

						{/* // {oneAction.online && `Follow this link: ${oneAction.online_link} `} :{" "}
				// {oneAction.in_person && `${oneAction.longitude} ${oneAction.latitude}`} */}
					</div>

					<div>
						{oneAction.start_time
							? `Start time: ${oneAction.start_time}`
							: "Take as long as you want!"}{" "}
					</div>

					<div>
						{" "}
						{oneAction.end_time ? `End time: ${oneAction.end_time}` : ""}{" "}
					</div>
				</div>
				<div className="right-side">
					<div>
						{oneAction.Keywords && oneAction.Keywords.length > 0 && (
							<div>
								Keywords:
								<ul>
									{oneAction.Keywords.map((keyword) => (
										<li key={keyword.id}>{keyword.keyword}</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<div>
						{oneAction.Requirements && oneAction.Requirements.length > 0 && (
							<div>
								Requirements
								{oneAction.Requirements.map((requirement) => (
									<div key={requirement.id}>
										<div>Description: {requirement.description}</div>
										<div>Capacity: {requirement.capacity}</div>

										{requirement.Volunteerships &&
											requirement.Volunteerships.length > 0 && (
												<div>
													Other Volunteers
													{requirement.Volunteerships.map((volunteership) => (
														<div key={volunteership.id}>
															<div>{volunteership.User.username}</div>
															{/* <div>Completed: {volunteership.completed}</div> */}
														</div>
													))}
												</div>
											)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			<div>
				{days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
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
	);
}
