import React from "react";
import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import getUser from "./GetUser";

export default function Map() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState();
  const [actions, setActions] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState({
    visible: false,
    position: {},
  });
  const [currentMarkerAction, setCurrentMarkerAction] = useState();

  useEffect(() => {
    getActions();
    setUserCoordinatesAsCenter();
  }, []);

  // did this because otherwise getUser() returns a not-so-useful promise
  async function setUserCoordinatesAsCenter() {
    const myUserCoord = await getUser();
    setCenter(myUserCoord);
  }

  const containerStyle = {
    display: "flex",
    width: "500px",
    height: "800px",
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

  function markerClick(action) {
    console.log(`action ${action.name} clicked`);
    setCurrentMarkerAction(action);
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

  return (
    <div>

    <h3> <br /></h3>

    {isLoaded && 
    <GoogleMap 
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      
      {actions.filter(a => a.latitude && a.longitude).map((action, i) => 
      <div key={i}>
        <Marker onClick={() => markerClick(action)} key={i} position={{lat: action.latitude, lng: action.longitude}}/>
                                                   
          </div>)}
          {showInfoWindow.visible === true &&
                              
          <InfoWindow onCloseClick={() => console.log("this")} position={center}>
            <div>
              <p>{currentMarkerAction.name}</p>
              <p>{currentMarkerAction.description}</p>
              <Link to={`/Action/View/${currentMarkerAction.id}`}>learn more </Link>
            </div>
          </InfoWindow>
          }
    </GoogleMap>}

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {actions
            .filter((a) => a.latitude && a.longitude)
            .map((action, i) => (
              <div key={i}>
                <Marker
                  onClick={() => markerClick(action)}
                  key={i}
                  position={{ lat: action.latitude, lng: action.longitude }}
                />
              </div>
            ))}
          {showInfoWindow.visible === true && (
            <InfoWindow
              onCloseClick={() => console.log("this")}
              position={center}
            >
              <div>
                <p>{currentMarkerAction.name}</p>
                <p>{currentMarkerAction.description}</p>
                <Link to={`/Action/View/${currentMarkerAction.id}`}>
                  learn more{" "}
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}
