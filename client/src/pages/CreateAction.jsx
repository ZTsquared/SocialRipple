import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function CreateAction() {

  const [actionBody, setActionBody] = useState();
  const [actionCoordinates, setActionCoordinates] = useState();
  const [requirements, setRequirements] = useState();
  const [user, setUser] = useState();
  const [keywords, setKeywords] = useState(); // just to get the full array of keywords so you can pick the ones you want.
  const [preferences, setPreferences] = useState([]); // doing it like this for now... it's NOT exactly requirements, but ye

  useEffect(() => {
    getUsers();
    getKeywords();
  }, [])

  async function getUsers() {
    try {
      const response = await fetch(`/api/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getKeywords = async function () {
    try {
      const res = await fetch(`/api/keywords/`);
      if (!res.ok) throw new Error(`Oops!`);

      const data = await res.json();
      setKeywords(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if(name === "online" || name === "inperson" || name === "is_group"){
      checked ? setActionBody({ ...actionBody, [name]: true}) : setActionBody({ ...actionBody, [name]: false})
    }
    else{
      setActionBody({ ...actionBody, [name]: value });
    }
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    name === "req_capacity" ? setRequirements({...requirements, capacity: value}) : setRequirements({...requirements, description: value})
  }

  function handleKeywordChange(e) {
    if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
    else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
  }

  async function handleSubmit(){
    event.preventDefault()

    await setCoordinates(actionBody.street, actionBody.number, actionBody.city)

    //to be refactored. doing it like this now because the actionBody has the street, house number and city
    //instead of coordinates and it made sense to me passing the whole thing with the coordinates instead
    //of an address
    
    createNewAction({
      online: actionBody.online,
      inperson: actionBody.inperson,
      start_time: actionBody.start_time,
      end_time: actionBody.end_time,
      is_group: actionBody.is_group,
      name: actionBody.name,
      description: actionBody.description,
      online_link: actionBody.online_link,
      latitude: actionCoordinates?.lat,
      longitude: actionCoordinates?.lng,
      organiser_id: user.id,
      Keywords: preferences,          // placeholder for now
      Requirements: [ requirements ]  // placeholder for now
    });
  }

  const setCoordinates  = async (street, number, city) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`
      );
      const responseToJson = await response.json();

      // console.log(responseToJson)
      setActionCoordinates(responseToJson.results[0].geometry.location)
      return responseToJson.results[0].geometry.location
    } catch (error) {
      console.log(error.message);
    }
  };

  const createNewAction = async (action) => {
    try {
      console.log("trying...");
      const { data } = await axios("/api/actions", {
        method: "POST",
        data: action,
      });

      console.log(data);

      
    } catch (error) {
      console.log(error);
    }
  };

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

    // requirements:
    // description
    // capacity

    <div>
      <header className="navbar navbar-expand-lg navbar-light bg-light">
        <nav>
          Nav bar of our awesome app{" "}
          <div>
            <Link to="/MainMenu" className="btn btn-success">
              Calls to action
            </Link>
            <Link to="/Profile" className="btn btn-success">
              Profile
            </Link>
            <button className="btn btn-success">Logout</button>
          </div>
        </nav>
      </header>

      <h3>CreateAction</h3>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="name">
          action name:
          <input onChange={handleChange} type="text" id="name" name="name" />
        </label>{" "}
        <br />
        <label htmlFor="description">
          action description:
          <textarea
            onChange={handleChange}
            name="description"
            id="description"
            cols="60"
            rows="6"
          ></textarea>
        </label>{" "}
        <br />

        <label htmlFor="online">
          {" "}
          on-line?
          <input onChange={handleChange} type="checkbox"name="online" id="online" />
        </label>{" "}
            <br />
        <label htmlFor="inperson">
          {" "}
          in-person?
          <input onChange={handleChange} type="checkbox"name="inperson" id="inperson" />
        </label>{" "}
        <br />

        <label htmlFor="start_time">
          starting date:
          <input onChange={handleChange} name="start_time" id="start_time" type="date" />
        </label>{" "}
        <br />

        <label htmlFor="end_time">
          finishing date:
          <input onChange={handleChange} name="end_time" id="end_time" type="date" />
        </label>{" "}
        <br />

        <label htmlFor="is_group">
          {" "}
          is it a group action?
          <input onChange={handleChange} type="checkbox" name="is_group" id="is_group" />
        </label>{" "}
        <br />

        <label htmlFor="online_link">
          on-line action link:
          <input onChange={handleChange} type="text" id="online_link" name="online_link" />
        </label>{" "}
        <br />
          <h5>Address</h5>
        <label htmlFor="street">
          Street:
          <input onChange={handleChange} type="text" name="street" id="street" />
        </label>{" "}
        <label htmlFor="house_number">
          Number:
          <input onChange={handleChange} type="text" name="house_number" id="house_number" />
        </label>{" "}
        <label htmlFor="city">
          City:
          <input onChange={handleChange} type="text" name="city" id="city" />
        </label>{" "}
        <br />

        Choose the keywords that fit better:

        {keywords?.map((keyword, index) => (
            <div key={keyword.id}>
              <input
                id={keyword.id}
                value={keyword.id}
                type="checkbox"
                onChange={handleKeywordChange}
                checked={preferences.includes(keyword.id) ? "checked" : null}
              />
              {keyword.keyword}
            </div>
          ))}

        <label htmlFor="requirements">
         
          <br /><br />
          Requirements: <br />
            capacity: <input onChange={handleRequirementChange} name="req_capacity" type="number" /> <br />
            description: <br />
            <label htmlFor=""><textarea onChange={handleRequirementChange} name="req_description" id="req_description" cols="30" rows="10"></textarea></label> 
        </label>{" "}
        <br />
        <button>Create!</button>
      </form>
    </div>
  );
}
