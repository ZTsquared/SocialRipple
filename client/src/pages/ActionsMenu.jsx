import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import ActionCard from "../components/ActionCard";
import NavBar from "../components/NavBar";
import FootBar from "../components/FootBar";
import Map from "../components/Map";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ActionsMenu() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);                               // an array with ALL the actions                                 
  const [recommendedActions, setRecommendedActions] = useState([]);         // the 3 recommended actions on top
  const [selectFilter, setSelectFilter] = useState(false);
  const [andSearch, setAndSearch] = useState(false)
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState([]);
  const [displayActions, setDisplayActions] = useState({
    allVisible: false,
    group: false,
  });
  
  const [show, setShow] = useState(false);
  const {typeOfActions, ActionId} = useParams();
  const [requirements, setRequirements] = useState([]);


  useEffect(() => {
    console.log(typeOfActions)
    getActions();
    getKeywords();
  }, []);
 
  useEffect(() => {
    console.log(selectedKeywordIds)
  }, [andSearch]);



  useEffect(() => {
    setRecommendedActions(actions.filter((e, i) => i < 3));
  }, [actions]);

  useEffect(() => {}, [recommendedActions]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Outlet context={[requirements, setRequirements]}></Outlet>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={joinActionAndCloseModal}>
              Join!
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
  
  function joinActionAndCloseModal(){
    setShow(false)
  }

  async function getActions() {
    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setActions(data);
    } catch (error) {
      console.log(error);
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
    else setSelectedKeywordIds((k) => k.filter((key) => key !== e.target.value));
  }


  function handleFilterToggle() {
    if (selectFilter){
      setSelectedKeywordIds([])
      setAndSearch(false)
      getActions()
    }
    setSelectFilter(!selectFilter);
  }

  function handleAndSearchToggle(){
    setAndSearch(!andSearch)
  }
  

  function filterActions() {
    const actionsArray = []
    for (let act of actions){
      let actionKeywords = []
      for (let key of act.Keywords){
        actionKeywords.push(key.id.toString())
      }
      if (andSearch){
        if (selectedKeywordIds.every((id) => (actionKeywords.includes(id)))){
          actionsArray.push(act)
        }
      } else {
        if (actionKeywords.some((id) => (selectedKeywordIds.includes(id)))){
          actionsArray.push(act)        
        }
      }
      setActions(actionsArray)
      setSelectFilter(false);
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

    if(event.target.name === "individual"){
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

  const handleCloseModal = () => setShow(false);  
  const handleShowModal = (e) => {  
    console.log(e.target)
    setShow(true);
  }

  return (
    <div >
      {!selectFilter ? 
        <button className="sigInButton-css" onClick = {handleFilterToggle}>Search Actions</button>
        : 
        <div>
          <br />
          <label className="form-label">What kind of activities are you looking for?</label>
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
                      selectedKeywordIds.includes(keyword.id) ? "checked" : null
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
            checked={
              andSearch ? "checked" : false
            }
          />
          <label htmlFor="">Show only actions that match all my selected keywords</label>
          <br />
          <button className="sigInButton-css"onClick = {filterActions}>Apply Filter</button>
          <button className="sigInButton-css" onClick = {handleFilterToggle}>Cancel Filter</button>
        </div>
      }
      <br /><br />
      <div className="row">
        <div className="col-sm">
          <h3>
            {!typeOfActions ? "Recommended Actions" :
            typeOfActions === "Group" ? "Group Actions" : "Individual Actions"}
          </h3>

          <div className="row">

          { typeOfActions ?
          
          actions
            .filter((a) => (typeOfActions === "Group" ? a.is_group : !a.is_group))
            .map((action, index) => (
              <div onClick={handleShowModal} key={index} className="col-3">

                <Link to={`/Actions/View/${action.id}`}>
                  <ActionCard action={action} />
                </Link>
                
              </div>
            ))
            :
            recommendedActions
            .map((action, index) => (
              <div onClick={handleShowModal} key={index} className="col-3">
              
                <Link to={`/Actions/View/${action.id}`}>
                  <ActionCard action={action} />
                </Link>
                
              </div>
            ))
            
            }
          </div>
        </div>

      <div className="col-4" >
          
          <div className="map_container">
          <div>
            <Map />
          </div>
          </div>

      </div>
      </div>

      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >

      <MyVerticallyCenteredModal
        show={show}
        onHide={() => setShow(false)}
      />
      
    </div>
      <br /><br /><br />
    </div>

  );
}
