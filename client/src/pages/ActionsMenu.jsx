import React, { useEffect, useRef, useState, useCallback } from "react";
import {

  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,

} from "@react-google-maps/api";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ActionCard from "../components/ActionCard"
import NavBar from "../components/NavBar"
import FootBar from "../components/FootBar"

export default function ActionsMenu() {
  const [actions, setActions] = useState([]);                                           // an array with ALL the actions
  const [center, setCenter] = useState();                                               // lat & lng the map takes as its center
  const [currentMarkerAction, setCurrentMarkerAction] = useState();                     // all the info of the action corresponding to the marker clicked
  const [recommendedActions, setRecommendedActions] = useState([]);                     // the 3 recommended actions on top
  const [showInfoWindow, setShowInfoWindow] = useState({visible: false, position: {}}); // the dinamically updated popup for the marker clicked
  const [map, setMap] = useState(null);                                                 // the map in all its joy and glory                                           
  const navigate = useNavigate();
    //state:
  const [locationMarker, setLocationMarker] = useState();
  const [actionMarkers, setActionMarkers] = useState();

  useEffect(() => {
    getActions();
  }, []);

  useEffect(() => {
    setRecommendedActions(actions.filter((e, i) => i < 3));
    setCenter({ lat: actions[1]?.latitude, lng: actions[1]?.longitude });
  }, [actions]);


  useEffect(() => {
    // console.log(recommendedActions, actions);
    // console.log(new Date(recommendedActions[0]?.start_time).getDay())
  }, [recommendedActions]);


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



  // const concoctRecomendations = actions.filter()

  const getLocation = async (street, number, city) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`
      );
      const responseToJson = await response.json();

      setLocationMarker(responseToJson);
    } catch (error) {
      console.log(error.message);
    }
  };

  function markerClick(action) {
    console.log(`action ${action.name} clicked`);
    setCenter({ lat: action.latitude, lng: action.longitude });
    setShowInfoWindow({
      visible: true,
      position: { lat: action.latitude, lng: action.longitude },
    });

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

  function handleActionClick(e) {
    const action_id = e.target.name;
    console.log(e.target);
  }

  return (
    <div>
      <NavBar/>
      <div className="container">
        <div className="row">
          <h3>Recommended for you</h3>
          {recommendedActions.map((action, index) => (
            <div key={index}
            className="col-sm">
              <ActionCard action={action} />
            </div>
          ))}
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

              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {actions.map((action, i) => (
                    <div key={i}>
                      <Marker
                        onClick={() => markerClick(action)}
                        key={i}
                        position={{
                          lat: action.latitude,
                          lng: action.longitude,
                        }}
                      />
                    </div>
                  ))}
                  {showInfoWindow.visible === true && (
                    <InfoWindow position={center}>
                      <div>
                        <p>hola</p>
                        <Link to="/">learn more </Link>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              )}

            </div>
          </div>
        </div>
        <FootBar/>
      </div>
    </div>
  );

}
