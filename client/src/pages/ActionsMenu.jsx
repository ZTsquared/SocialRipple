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
  const [displayActions, setDisplayActions] = useState({
    allVisible: false,
    group: false,
  });
  
  const {typeOfActions, ActionId} = useParams();

  useEffect(() => {
    console.log(typeOfActions)
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

  const [show, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);
  const handleShowModal = (e) => {
    
    console.log(e.target)
    setShow(true);
  }

  return (
    <div className="container">

      <br /><br /><br />
      <div className="row">
        <div className="col-sm">
          <h3>
            {!typeOfActions ? "Recommended Actions" :
            typeOfActions === "Group" ? "Group Actions" : "Individual Actions"}
          </h3>
          { typeOfActions ?
          
          actions
            .filter((a) => (typeOfActions === "Group" ? a.is_group : !a.is_group))
            .map((action, index) => (
              <div onClick={handleShowModal} key={index} className="col-sm">

                <Link to={`/Actions/View/1`}>
                  <ActionCard action={action} />
                </Link>
                
              </div>
            ))
            :
            recommendedActions
            .map((action, index) => (
              <div onClick={handleShowModal} key={index} className="col-sm">
                <Link to={`/Actions/View/1`}>
                  <ActionCard action={action} />
                </Link>
              </div>
            ))
            
            }
        </div>

      <div className="col-sm">

          <div className="map_container">
            <Map />
          </div>

      </div>
      </div>

      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <>
      <Button variant="primary" onClick={handleShowModal}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Outlet></Outlet>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
      <br /><br /><br />
    </div>

  );
}
