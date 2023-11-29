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
  const { individualAction, setIndividualAction } = useState([]);
  const { groupAction, setGroupAction } = useState([]);
  const dummyActionsArray = [
    {
      id: 1,
      online: false,
      in_person: true,
      start_time: "11:00 03-12-2023",
      end_time: "11:00 04-12-2023",
      is_group: true,
      name: "a dummy action",
      description: "description of the first action",
      organiser_id: 3,
      online_link: "www.alink.org",
      latitude: "555",
      longitude: "666",
    },
    {
      id: 2,
      online: false,
      in_person: true,
      start_time: "11:00 23-11-2023",
      end_time: "11:00 30-11-2023",
      is_group: true,
      name: "another dummy action",
      description: "description of the second action",
      organiser_id: 5,
      online_link: "www.anotherlink.org",
      latitude: "777",
      longitude: "999",
    },
  ];

  // useEffect(() => {
  //   getActionsOfTheWeek();
  // }, []);

  const dummyRequirementsArray = [
    {
      id: 1,
      action_id: dummyActionsArray[0].id,
      description: "wash the wosh",
    },
  ];

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  function handleLogout() {
    console.log("Logged out");
    // onLogout();
    navigate("/");
  }

  //WAITING FOR ACTIONS ENDPOINTS TO BE FINISHED TO DO THIS PART - carol
  // async function getActionsOfTheWeek() {
  //   try {
  //     const response = await fetch(`/actions/`);
  //     const data = await response.json();
  //need some kind of if statement to check if its a group or a individual action
  //     setIndividualAction(dataOfIndividualAction);
  //     setGroupAction(dataOfGroupAction);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
          <div className="col-sm">
            <h3>Group Actions</h3>
            {dummyActionsArray.map((action, index) => (
              <div key={index} className="card">
                <div>
                  <b>{action.name}</b>
                </div>
                <div>{action.description}</div>
                <div>Start time: {action.start_time}</div>
                <div>End time: {action.end_time}</div>
                <div>
                  place: lat:{action.latitude}long:{action.longitude} we'll see
                  how we display this
                </div>
                <div>we need to display the requirements here</div>
              </div>
            ))}
          </div>

          <div className="col-sm">
            <h3>Individual Actions</h3>
          </div>

          <div className="col-sm">
            <div>
              <h3>a decent looking map</h3>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {
                    /* Child components, such as markers, info windows, etc. */
                    <Marker position={center} />
                  }
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/Home" className="btn btn-success">
            Homepage
          </Link>
        </nav>
      </footer>
    </div>
  );
}
