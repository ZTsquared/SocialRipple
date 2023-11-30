import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

	return (
		<div>
			<div>Action Title: {oneAction.name} </div>
			<div> Description: {oneAction.description} </div>

			<div>
				{oneAction.online
					? `Follow this link: ${oneAction.online_link} `
					: `Loction: ${oneAction.longitude} ${oneAction.latitude}`}

				{/* // {oneAction.online && `Follow this link: ${oneAction.online_link} `} :{" "}
				// {oneAction.in_person && `${oneAction.longitude} ${oneAction.latitude}`} */}
			</div>

			<div>
				{oneAction.start_time
					? `Start time: ${oneAction.start_time}`
					: "Take as long as you want!"}{" "}
			</div>

			<div> {oneAction.end_time ? `End time: ${oneAction.end_time}` : ""} </div>
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
						Requirements:
						<ul>
							{oneAction.Requirements.map((requirement) => (
								<li key={requirement.id}>
									<div>Description: {requirement.description}</div>
									<div>Capacity: {requirement.capacity}</div>

									{requirement.Volunteerships &&
										requirement.Volunteerships.length > 0 && (
											<div>
												Volunteerships:
												<ul>
													{requirement.Volunteerships.map((volunteership) => (
														<li key={volunteership.id}>
															<div>User: {volunteership.User.username}</div>
															<div>Completed: {volunteership.completed}</div>
														</li>
													))}
												</ul>
											</div>
										)}
								</li>
							))}
						</ul>
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
