import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../hooks/useCountdown";
import TextTruncate from "react-text-truncate";

export default function ActionCard({ action }) {
  const [eventDate, setEventDate] = useState(
    new Date(action.start_time).toLocaleDateString("en-UK", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );
  const [eventStartTime, setEventStartTime] = useState(
    new Date(action.start_time).toLocaleTimeString("en-UK", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [eventEndTime, setEventEndTime] = useState(
    new Date(action.end_time).toLocaleTimeString("en-UK", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const targetDate = new Date(action.start_time).getTime();
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (

    <div 
        style={{
          width: "18rem",
          height: "20rem",
          border: "1px solid black",
        //   backgroundColor: "#c4c1e0",
          color: "white",
          marginBottom: "50px",
          borderRadius: "6px",
        }}
    >
        <Link to={`/Action/View/${action.id}>`}>
            <img
            src="https://blog.bluemoontalent.com/wp-content/uploads/2014/02/event-header-4.jpg"
            className="card-img-top"
            alt="..."
            style={{ marginTop: "0px",  borderRadius: "6px 6px 0px 0px" }}
            />
            <div className="card-body" style={{
                margin: "10px",
            }}>
                <div style={{ height: "5rem" }}>
                    <div className="card-title fs-5" style={{ height: "0.5rem" }}>{action.name}</div>
                    <br />
                    <TextTruncate
                        className="card-text fw-light"
                        line={2}
                        element="span"
                        truncateText="…"
                        text={action.description}
                    />

                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col">
                    {`${eventStartTime} - ${eventEndTime}`}{" "}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 ? (
                  <div>Happening Now!</div>
                ) : (
                  <div>
                    {days >= 3 ? (
                      <div>Starting in: {days} days</div>
                    ) : (
                      <div>
                        Starting in: {days * 24 + hours} hours, {minutes}{" "}
                        minutes, {seconds} seconds
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="row">
              <div className="col-3">{`Where: `} </div>
              <div className="col">
                {!action.in_person && !action.online && "Anywhere!"}{" "}
                {action.in_person && "Barcelona"}{" "}
                {action.in_person && action.online && " & "}{" "}
                {action.online && "Online"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
