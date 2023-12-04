import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ActionCard from "../components/ActionCard";
import NavBar from "../components/NavBar";

export default function ActionsIndividual() {
  const [allActions, setAllActions] = useState([]);
  const [actions, setActions] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    getAllActions();
    getAllKeywords();
  }, []);

  useEffect(() => {
    setActions(allActions);
  }, [allActions]);

  async function getAllActions() {
    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setAllActions(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllKeywords() {
    try {
      const response = await fetch(`/api/keywords`);
      const data = await response.json();
      setAllKeywords(data);
    } catch (error) {
      console.log(error);
    }
  }

  function filterActions() {}

  return (
    <div>
      <NavBar />
      <div>
        <Link to="/MainMenu/Individual" className="btn btn-success">
          Individual actions
        </Link>
        <Link to="/MainMenu/Group" className="btn btn-success">
          Group actions
        </Link>
        <div>
          {allKeywords.map((k) => (
            <div>{k.keyword}</div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <h3>Individual Actions</h3>
          {actions
            .filter((a) => !a.is_group)
            .map((action, index) => (
              <div key={index} className="col-sm">
                <ActionCard action={action} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
