import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ActionsMenu() {
  const { isLoggedIn, onLogout, onLogin } = useAuth();                                  // we all know these guys
  const [actions, setActions] = useState([]);                                           // an array with ALL the actions
  const [center, setCenter] = useState();                                               // lat & lng the map takes as its center
  const [currentMarkerAction, setCurrentMarkerAction] = useState();                     // all the info of the action corresponding to the marker clicked
  const [recommendedActions, setRecommendedActions] = useState([]);                     // the 3 recommended actions on top
  const [showInfoWindow, setShowInfoWindow] = useState({visible: false, position: {}}); // the dinamically updated popup for the marker clicked
  const [map, setMap] = useState(null);                                                 // the map in all its joy and glory                                           

  const navigate = useNavigate();

  useEffect(() => {
    getActions();
  }, []);

  useEffect(() => {
    setRecommendedActions(actions.filter((e,i) => i < 3));
    setCenter({ lat: actions[1]?.latitude, lng: actions[1]?.longitude})
  }, [actions]);

  const containerStyle = {
    width: "1000px",
    height: "500px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const onLoad = useCallback(function callback(map) {
    
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  function handleLogout() {
    console.log("Logged out");
    onLogout();
    navigate("/");
  }


  function markerClick(action) {
    console.log(`action ${action.name} clicked`);
    setCenter({ lat: action.latitude, lng: action.longitude})
    setShowInfoWindow({visible: true, position: { lat: action.latitude, lng: action.longitude}})
    setCurrentMarkerAction(action)
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

  function handleActionClick(e){
    const action_id = e.target.name
    console.log(e.target)
  }

  return (

    <div>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>
          Nav bar of our awesome app{" "}
          {isLoggedIn ? (
            <div>
              <Link to="/Action/Create" className="btn btn-success">
                Create Action
              </Link>
              <Link to="/Profile" className="btn btn-success">
                Profile
              </Link>
              <button className="btn btn-success" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/Login" className="btn btn-success">
                Login
              </Link>
              <Link to="/Register" className="btn btn-success">
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </header>
      <div className="container">
        <div className="row">
          <h3>Recommended for you</h3>
          {recommendedActions.map(
            (action, index) =>(
              <div key={index} className="col-sm">
                <div name={action.id} className="card" onClick={handleActionClick}>
                  <div>
                    <b>{action.name}</b>
                  </div>
                  <div>{action.description}</div>
                  {/* <div>Starting {Date.createFromMysql()}</div> */}
                  <div>Starting {new Date(action.start_time).getMonth() + 1}/{new Date(action.start_time).getDay()}/{new Date(action.start_time).getFullYear()}</div>
                  <div>
                    place: {action.in_person && "Barcelona"} {action.in_person && action.online && " & "} {action.online && "Online"}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="row">
          <Link to="Individual" className="btn btn-success">
            Check out all upcomming actions
          </Link>
        </div>
        <div className="row">
          <div className="col-sm">
            <div>
              <h3>a decent looking map</h3>
              {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
                onLoad={onLoad}
                onUnmount={onUnmount}>
                
                {actions.map((action, i) => <div key={i}><Marker onClick={() => markerClick(action)} key={i} position={{lat: action.latitude, lng: action.longitude}}/>
                                                             
                                            </div>)}
                                            {showInfoWindow.visible === true &&
                                                                
                                            <InfoWindow position={center}>
                                              <div>
                                                <p>{currentMarkerAction.name}</p>
                                                <p>{currentMarkerAction.description}</p>
                                                <Link to={`/Action/View/${currentMarkerAction.id}`}>learn more </Link>
                                              </div>
                                            </InfoWindow>
                                            }
                
              </GoogleMap>}
            </div>
          </div>
        </div>
        <footer className="footer">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="btn btn-success">
              Homepage
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
