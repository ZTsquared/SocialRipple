import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ActionCard from "../components/ActionCard";
import NavBar from "../components/NavBar";
import FootBar from "../components/FootBar";
import Map from "../components/Map";

export default function ActionsMenu() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]); // an array with ALL the actions                                             // lat & lng the map takes as its center
  const [recommendedActions, setRecommendedActions] = useState([]); // the 3 recommended actions on top
  const [displayActions, setDisplayActions] = useState({
    allVisible: false,
    group: false,
  });

  useEffect(() => {
    getActions();
  }, []);

  useEffect(() => {
    setRecommendedActions(actions.filter((e, i) => i < 3));
  }, [actions]);

  useEffect(() => {}, [recommendedActions]);

  async function getActions() {
    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setActions(data);
    } catch (error) {
      console.log(error);
    }
  }

  function actionsToDisplayToggle(event) {
    console.log(event.target.name);
    event.target.name === "individual"
      ? setDisplayActions({ ...displayActions, group: false })
      : setDisplayActions({ ...displayActions, group: true });

    event.target.name === "display_actions_switch" &&
      setDisplayActions({
        ...displayActions,
        allVisible: !displayActions.allVisible,
      });
  }

  // I refactored the Group and individual pages into the mainmenu because right now ActionsIndividual.jsx and ActionsGroup.jsx are
  // exactly the same except one filters the group actions and the other one filters the individual ones.
  // Since the Individual and Group pages also needed a map, it made sense to put them in the main menu and
  // render them conditionally.

  // now what we're doing is filtering conditionally in the same .filter function. It looks ugly for now... I think they should appear in
  // a sort of carousel fashion, showing 3 on top with arrows to scroll between the available actions left or right.
  // This all can be also refactored into components, but I think the concept of staying in the same page, even if filters for the actions are
  // implemented, makes sense.

  // but if we prefer the other approach we can revert to a previous commit ^^

  return (
    <div>
      <NavBar />

      {displayActions.allVisible && (
        <div>
          {/* <Link to="/MainMenu/Individual" className="btn btn-success">
          Individual actions
        </Link> */}

          {/* <Link to="/MainMenu/Group" className="btn btn-success">
          Group actions
        </Link> */}
          <button
            name="group"
            className="btn btn-success"
            onClick={actionsToDisplayToggle}
          >
            Group Actions
          </button>
          <button
            name="individual"
            className="btn btn-success"
            onClick={actionsToDisplayToggle}
          >
            Individual Actions
          </button>
        </div>
      )}

      <div className="container">
        {!displayActions.allVisible && (
          <div className="row">
            <h3>Recommended for you</h3>
            {recommendedActions.map((action, index) => (
              <div key={index} className="col-sm">
                <ActionCard action={action} />
              </div>
            ))}
          </div>
        )}

        {displayActions.allVisible && (
          <div className="row">
            <h3>
              {displayActions.group ? "Group Actions" : "Individual Actions"}
            </h3>
            {actions
              .filter((a) => (displayActions.group ? a.is_group : !a.is_group))
              .map((action, index) => (
                <div key={index} className="col-sm">
                  <ActionCard action={action} />
                </div>
              ))}
          </div>
        )}

        <div className="row">
          <button
            name="display_actions_switch"
            onClick={actionsToDisplayToggle}
            className="btn btn-success"
          >
            {displayActions.allVisible
              ? "back to recomended"
              : "Check out all upcomming actions"}
          </button>
        </div>

        <div className="row">
          <div className="col-sm">
            <div>
              <Map />
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />

        <FootBar />
      </div>
    </div>
  );
}
