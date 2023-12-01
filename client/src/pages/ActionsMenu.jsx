import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ActionsMenu() {
  const { isLoggedIn, onLogout, onLogin } = useAuth();
  const [actions, setActions] = useState([]);
  const [recommendedActions, setRecommendedActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getLocation();
    getActions();
  }, []);

  useEffect(() => {
    setRecommendedActions(actions.filter((e,i) => i < 3));
  }, [actions]);

  useEffect(() => {
    // console.log(recommendedActions, actions);
    // console.log(new Date(recommendedActions[0]?.start_time).getDay())

  }, [recommendedActions]);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: 41.571417,
    lng: 2.01803,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  //state:
  const [locationMarker, setLocationMarker] = useState();
  const [actionMarkers, setActionMarkers] = useState();
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);



    setMap(map);
  }, []);

  // useEffect(() => {
  //   if (map) {
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     actions.map(action => {
  //       bounds.extend({
  //         lat: action.latitude,
  //         lng: action.longitude,
  //       });
  //     });
  //     map.fitBounds(bounds);
  //   }
  // }, [map, actions]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  function handleLogout() {
    console.log("Logged out");
    onLogout();
    navigate("/");
  }

  // const concoctRecomendations = actions.filter()

  const getLocation = async (street, number, city) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`
      );
      const responseToJson = await response.json();

      setLocationMarker(responseToJson);
      // console.log(responseToJson.results[0].geometry.location)
      // return responseToJson.results[0].geometry.location
    } catch (error) {
      console.log(error.message);
    }
  };

  function markerClick(markerIndex) {
    console.log(`marker ${markerIndex} clicked`);
    console.log(actions)
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

  // I need to show all the actions markers on the map.
  // the actions come with an address, so we need to grab them with the getLocation (maybe?) for each one.
  // how do I fetch multiple actions in REACT omg
  // should I do it when we MAP to instantiate the markers?

  return (
    // maybe show the actions in a 2 columns format: |group| |individual|
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
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}>
                
                <Marker onClick={markerClick} label="A" title="Hello World!" position={center}/>
                {actions.map((action, i) => <Marker onClick={markerClick} key={i} position={{lat: action.latitude, lng: action.longitude}}/>)}
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
