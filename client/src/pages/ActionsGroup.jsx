import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ActionCard from "../components/ActionCard"
import NavBar from "../components/NavBar"
import FootBar from "../components/FootBar"

export default function ActionsIndividual() {
  const [actions, setActions] = useState([]);

	useEffect(() => {
		getActions();
	}, []);

  async function getActions() {
    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setActions(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <NavBar/>
      <div>
        <Link to="/MainMenu/Individual" className="btn btn-success">
          Individual actions
        </Link>
        <Link to="/MainMenu/Group" className="btn btn-success">
          Group actions
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <h3>Group Actions</h3>
          {actions.filter((a) =>(a.is_group)).map(
            (action, index) =>
            <div key={index} className="col-sm">
              <ActionCard action={action} />
            </div>
          )}
        </div>
      </div>
      <FootBar/>
    </div>
  );

}
