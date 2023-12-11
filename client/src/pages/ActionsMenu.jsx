import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  Outlet,
} from "react-router-dom";
import ActionCard from "../components/ActionCard";
import Map from "../components/Map";

export default function ActionsMenu() {

  const navigate = useNavigate();
  const location = useLocation();
  const [actions, setActions] = useState([]); // an array with ALL the actions
  const [selectFilter, setSelectFilter] = useState(false);
  const [andSearch, setAndSearch] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState([]);
  const [displayActions, setDisplayActions] = useState({
    allVisible: false,
    group: false,
  });
  const [typeOfActions, setTypeOfActions] = useState("all");

  useEffect(() => {
    console.log(location.state);
    getActions("all", []);
    getKeywords();
  }, []);

  async function getActions(type, filterKeywordIds) {

    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setActions(filterActions(data, type, filterKeywordIds));
    } catch (error) {
      console.log(error);
    }
  }

  function filterActions(rawActions, type, filterKeywordIds) {
    setSelectFilter(false);
    if (type === "group") {
      rawActions = rawActions.filter((a) => a.is_group);
    } else if (type === "indiv") {
      rawActions = rawActions.filter((a) => !a.is_group);
    }
    if (!filterKeywordIds.length) {
      return rawActions;
    } else {
      const actionsArray = [];
      for (let act of rawActions) {
        let actionKeywords = [];
        for (let key of act.Keywords) {
          actionKeywords.push(key.id.toString());
        }
        if (andSearch) {
          if (filterKeywordIds.every((id) => actionKeywords.includes(id))) {
            actionsArray.push(act);
          }
        } else {
          if (actionKeywords.some((id) => filterKeywordIds.includes(id))) {
            actionsArray.push(act);
          }
        }
      }
      console.log("setting actions");
      return actionsArray;
    }
  }

  async function getKeywords() {
    try {
      const response = await fetch(`/api/keywords`);
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleKeywordChange(e) {
    if (e.target.checked) setSelectedKeywordIds((k) => [...k, e.target.value]);
    else
      setSelectedKeywordIds((k) => k.filter((key) => key !== e.target.value));
  }

  function handleFilterToggle() {
    if (selectFilter) {
      setSelectedKeywordIds([]);
      setTypeOfActions("all");
      setAndSearch(false);
      getActions("all", []);
    }
    setSelectFilter(!selectFilter);
  }

  function handleAndSearchToggle() {
    setAndSearch(!andSearch);
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

    if (event.target.name === "individual") {
      typeOfActions = "individual";
    }
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
      {!selectFilter ? (
        <button className="sigInButton-css" onClick={handleFilterToggle}>
          Search Actions
        </button>
      ) : (
        <div>
          <br />
          <label className="form-label">
            What kind of activities are you looking for?
          </label>
          <br />
          <button
            className={typeOfActions === "group" ? "btn-check" : "btn"}
            onClick={() => setTypeOfActions("group")}
          >
            Group
          </button>
          <button
            className={typeOfActions === "indiv" ? "btn-check" : "btn"}
            onClick={() => setTypeOfActions("indiv")}
          >
            Individual
          </button>
          <button
            className={typeOfActions === "all" ? "btn-check" : "btn"}
            onClick={() => setTypeOfActions("all")}
          >
            All Types
          </button>
          <br />
          <br />
          <label className="form-label">What themes interest you?</label>
          <br />
          <div className="preferencesInRegisterPage-css row justify-content-center">
            {keywords.map((keyword, index) => (
              <div
                key={keyword.id}
                className={`col-2 mb-3 d-flex justify-content-center align-items-center`}
                style={{ margin: index % 3 === 2 ? "5px" : "10px" }}
              >
                <div className="d-inline-flex" style={{ gap: "67px" }}>
                  <input
                    id={keyword.id}
                    value={keyword.id}
                    type="checkbox"
                    name="preferences"
                    onChange={handleKeywordChange}
                    checked={
                      selectedKeywordIds.includes(keyword.id.toString())
                        ? "checked"
                        : null
                    }
                    className="btn-check"
                    autoComplete="off"
                  />
                  <label
                    className="btn"
                    htmlFor={keyword.id}
                    style={{ backgroundColor: "#e4f1fe" }}
                  >
                    {keyword.keyword}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <br />
          <input
            type="checkbox"
            onChange={handleAndSearchToggle}
            checked={andSearch ? "checked" : false}
          />
          <label htmlFor="">
            Show only actions that match all my selected keywords
          </label>
          <br />
          <button
            className="sigInButton-css"
            onClick={() => getActions(typeOfActions, selectedKeywordIds)}
          >
            Apply Filter
          </button>
          <button className="sigInButton-css" onClick={handleFilterToggle}>
            Cancel Filter
          </button>
        </div>
      )}
      <br />
      <br />
      <div className="row">
        {!actions.length ? (
          <div>
            <h3>Sorry!</h3>
            <div>No actions match your search criteria</div>
          </div>
        ) : (
          <div className="col-sm">
            {/* <h3>Upcomming Actions</h3> */}
            <div className="row">
              {actions.map((action, index) => (
                <div key={index} className="col">
                  <Link
                    to={`/Actions/View/${action.id}`}
                    state={selectedKeywordIds}
                  >
                    <ActionCard action={action} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="actions_right_side">
          <Map />
        </div>
      </div>
      <Outlet />


      <br />
      <br />
      <br />
    </div>
  );
}
