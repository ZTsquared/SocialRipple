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
import ActionCard from "../components/ActionCard";


export default function Map({ actions }) {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 41.481111, lng: 2.127002 });
  // const [actions, setActions] = useState([]);
  const [showInfoWindow, setShowInfoWindow] = useState({
    visible: false,
    position: {},
  });
  const [currentMarkerAction, setCurrentMarkerAction] = useState();

  useEffect(() => {
    setUserCoordinatesAsCenter();
  }, []);

  // did this because otherwise getUser() returns a not-so-useful promise
  async function setUserCoordinatesAsCenter() {
    const myUserCoord = await getUser();
    setCenter(myUserCoord);
  }

  const containerStyle = {
    width: "100vw",
    height: "800px",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_API_KEY",
  });

  const onLoad = useCallback(function callback(map) {
    map.zoom = 10;
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

  const MyInfoWindow = () => {
    return (
      <InfoWindow onCloseClick={() => console.log("current action marker id: ", currentMarkerAction.id)} position={center}>
        <div>
          <Link to={`/Actions/View/${currentMarkerAction.id}`}>
          <ActionCard action={currentMarkerAction}></ActionCard>
          </Link>
        </div>
        
      </InfoWindow>
    );
  };

  return (
    <div>
      <h3>
        {" "}
        <br />
      </h3>

      {isLoaded && center && (
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
          {showInfoWindow.visible === true && <MyInfoWindow />}
        </GoogleMap>
      )}
    </div>
  );
}
