import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GoogleMap, useLoadScript, useJsApiLoader, Marker } from '@react-google-maps/api';


export default function ActionsMenu() {


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
      longitude: "666"    
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
      longitude: "999"    
    }
  ]

  const dummyRequirementsArray = [
    {
      id: 1,
      action_id: dummyActionsArray[0].id,
      description: "wash the wosh"
    }
  ]

  const dummyUserLocationsArray = [
    {
      latitude: 41.571417, 
      longitude: 2.018030,
      street: "Ample",
      number: 50,
      city: "Terrassa"
    },
    {
      latitude: 41.572108, 
      longitude: 2.017086,
      street: "Ample",
      number: 128,
      city: "Terrassa"
    },
    {
      latitude: 41.569009, 
      longitude: 2.017235,
      street: "Ample",
      number: 91,
      city: "Terrassa"
    }
  ]

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const containerStyle = {
    width: '400px',
    height: '600px'
  };
  
  const center = {
    lat: 41.571417,
    lng: 2.018030,
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs"
  })

  //state:
  const [locationMarker, setLocationMarker] = useState();
  const [map, setMap] = useState(null)
  const [actionMarkers, setActionMarkers] = useState();



  useEffect(() => {getLocation()}, [])

  const getLocation = async (street, number, city) => {
    
    try{

      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`)
      const responseToJson = await response.json();
      
      setLocationMarker(responseToJson);
      // console.log(responseToJson.results[0].geometry.location)
      // return responseToJson.results[0].geometry.location
    } catch (error) {
      console.log(error.message);
      }
  }

// I need to show all the actions markers on the map.
// the actions come with an address, so we need to grab them with the getLocation (maybe?) for each one.
// how do I fetch multiple actions in REACT omg
// should I do it when we MAP to instantiate the markers?

function markerClick(markerIndex){
  console.log(`marker ${markerIndex} clicked`)
}

  return (
    // maybe show the actions in a 2 columns format: |group| |individual|

    <div className="container">
      <div className="row">

        <div className="col-sm">
          <h3>Group Actions</h3>
          {dummyActionsArray.map((action, index) => 
                        <div key={index} className="card">
                          <div><b>{action.name}</b></div>
                          <div>{action.description}</div>
                          <div>Start time: {action.start_time}</div>
                          <div>End time: {action.end_time}</div>
                          <div>place: lat:{action.latitude}long:{action.longitude} we'll see how we display this</div>
                          <div>we need to display the requirements here</div>
                        </div>)}
        </div>

        <div className="col-sm">
          <h3>Individual Actions</h3>

        </div>
        
        <div className="col-sm">
          <div>
            <h3>a decent looking map</h3>
              {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}>
                {dummyUserLocationsArray.map((location, i) => <Marker onClick={() => markerClick(i)} key={i} position={{lat: location.latitude, lng: location.longitude}}/>)}
                {/* // dummyUserLocationsArray.map((location, i) => <Marker onClick={markerClick} key={i} position={() => getLocation(location.street, location.number, location.city )}/>)} */}
              </GoogleMap>}
          </div>
         
        </div>

      </div>
    </div>
  )
}
