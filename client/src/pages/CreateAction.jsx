import React from 'react'

export default function CreateAction() {
  return (
    // form to create an action

    // name of the action
    // description
    // online or in person checkboxes or droplist
    // start time - end time
    // group or individual checkboxes or droplist
    // online link
    // google coordinates (this should come automatically)

    // requirements
    //    · the user can add 0, 1 or more requirements (I'm not sure it makes sense to put 0 req...?)
    //    · the user has to specify the amount of "volunteer users" needed for each requirement

    <div>
      <h3>CreateAction</h3>
      <form action="">
        <label htmlFor="name">action name:<input type="text" id="name" /></label> <br />
        <label htmlFor="description">action description:<textarea name="description" id="description" cols="60" rows="6"></textarea></label> <br />
        <label htmlFor="online_inperson"> on-line or in person?
          <select name="online_inperson" id="online_inperson">
            <option value="on_line">On Line</option> 
            <option value="in_person">In person</option>
          </select></label> <br />
        <label htmlFor="start_time">starting date:<input type="date" /></label> <br />
        <label htmlFor="finishing_time">finishing date:<input type="date" /></label> <br />
        <label htmlFor="group_individual"> group action or individual action?
          <select name="group_individual" id="group_individual">
            <option value="individual">Individual</option> 
            <option value="group">Group</option>
          </select></label> <br />
          <label htmlFor="online_link">on-line action link:<input type="text" id="online_link" /></label> <br />
          <label htmlFor="online_link">location:<input type="text" id="online_link" /></label> <br />
        
          <label htmlFor="requirements"> Requirements:
          <select name="requirements" id="requirements">
            <option value="1">to fetch from backend</option> 

          </select></label> <br />

        <button>Create!</button>
      </form>
    </div>
  )
}
