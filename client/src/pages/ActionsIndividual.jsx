import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import ActionCard from "../components/ActionCard"
import NavBar from "../components/NavBar"


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
          <h3>Individual Actions</h3>
          {actions.map(
            (action, index) =>
              !action.is_group && <ActionCard action={action} index={index} />
          )}
        </div>
        <footer className="footer">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/Home" className="btn btn-success">
              Homepage
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );

}
