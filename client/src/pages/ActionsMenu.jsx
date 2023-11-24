import React from 'react'

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
      </div>
    </div>
  )
}