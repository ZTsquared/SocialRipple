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

  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_API_KEY"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

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
                { /* Child components, such as markers, info windows, etc. */ 
                <Marker position={center}/>}
              </GoogleMap>}
          </div>
         
        </div>

      </div>
    </div>
  )
}
