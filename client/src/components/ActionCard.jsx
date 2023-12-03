import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../hooks/useCountdown";

export default function ActionCard({action}) {

    const [eventDate, setEventDate] = useState(new Date(action.start_time).toLocaleDateString("en-UK", {
        weekday: 'long',
        day: "numeric",
        month: "long",
        year: "numeric",
    }))
    const [eventStartTime, setEventStartTime] = useState(new Date(action.start_time).toLocaleTimeString("en-UK", {hour: '2-digit', minute:'2-digit'}))
    const [eventEndTime, setEventEndTime] = useState(new Date(action.end_time).toLocaleTimeString("en-UK", {hour: '2-digit', minute:'2-digit'}))
    
    const targetDate = new Date(action.start_time).getTime();
	const { days, hours, minutes, seconds } = useCountdown(targetDate);


    

  return (
    <div
        style={{
            width: "18rem",
            backgroundColor: "#c4c1e0",
            color: "white",
            margin: "8px",
            padding: "10px",
            borderRadius: "6px"
        }}
    >
    <img
      src="https://www.teameacc.org/wp-content/uploads/sites/8/2022/04/events.jpg"
      className="card-img-top"
      alt="..."
      style={{ marginTop: "10px",  borderRadius: "4px" }}
    />
    <br /><hr />
    <div className="card-body">
      <h5 className="card-title">{action.name}</h5>
      <p className="card-text">{action.description}</p>
      <hr />
        <div>
            {action.is_group ? 
                <div>
                    <div className="row">
                        <div className="col-3">{`When: `} </div>
                        <div className="col">{eventDate} </div>
                    </div> 
                    <div className="row">
                    <div className="col-3"></div>
                        <div className="col">{`${eventStartTime} - ${eventEndTime}`} </div>
                    </div> 
                </div> : <div>
					{days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
						<div>Happening Now!</div>
					) : (
						<div>
							{(days >=3) ? <div>Starting in: {days} days</div> : <div>Starting in: {days*24 + hours} hours, {minutes} minutes, {seconds} seconds</div>}
						</div>
					)}
                </div>
            }
                <div className="row">
                    <div className="col-3">{`Where: `} </div>
                    <div className="col">{action.in_person && "Barcelona"} {action.in_person && action.online && " & "} {action.online && "Online"} </div>
                </div> 
        </div>
    </div>
    {/* <button
      style={{
        backgroundColor: "#c4c1e0",
        color: "white",
        margin: "10px",
        borderRadius: "10px",
        border: "2px solid white",
      }}
    >
      Access this action
    </button> */}
  </div>
  )
}

