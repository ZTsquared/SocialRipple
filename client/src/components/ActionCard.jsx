import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ActionCard({action, index}) {

  return (
    <div key={index} className="col-sm">
        <div name={action.id} className="card">
            <div>
                <b>{action.name}</b>
            </div>
            <div>{action.description}</div>
            <div>When:
            {" " + new Date(action.start_time).toLocaleDateString("en-UK", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}
            </div>
            <div>Starting in: import Claire's countdown clock</div>
            <div>
                place: {action.in_person && "Barcelona"} {action.in_person && action.online && " & "} {action.online && "Online"}
            </div>
        </div>
    </div>
  )
}
