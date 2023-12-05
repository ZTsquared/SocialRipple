import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";

export default function CreateAction() {
  const [actionBody, setActionBody] = useState();
  const [actionCoordinates, setActionCoordinates] = useState();
  const [requirements, setRequirements] = useState();
  const [user, setUser] = useState();
  const [keywords, setKeywords] = useState(); // just to get the full array of keywords so you can pick the ones you want.
  const [preferences, setPreferences] = useState([]); // doing it like this for now... it's NOT exactly requirements, but ye
  const [isOnline, setIsOnline] = useState(false); //so that we can make the action link show up (or not)
  const [isInPerson, setIsInPerson] = useState(false); //so that we can make the address form show up (or not)

  useEffect(() => {
    getUsers();
    getKeywords();
  }, []);

  useEffect(() => {
    setCoordinates(
      actionBody?.street,
      actionBody?.house_number,
      actionBody?.city
    );
  }, [actionBody?.street, actionBody?.house_number, actionBody?.city]);

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
    if (name === "online") {
      checked ? setIsOnline(true) : setIsOnline(false);
    } else if (name === "inperson") {
      checked ? setIsInPerson(true) : setIsInPerson(false);
    }
    console.log(isInPerson);
    if (name === "online" || name === "inperson" || name === "is_group") {
      checked
        ? setActionBody({ ...actionBody, [name]: true })
        : setActionBody({ ...actionBody, [name]: false });
    } else {
      setActionBody({ ...actionBody, [name]: value });
    }
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    name === "req_capacity"
      ? setRequirements({ ...requirements, capacity: value })
      : setRequirements({ ...requirements, description: value });
  };

  function handleKeywordChange(e) {
    if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
    else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
  }

  async function handleSubmit() {
    event.preventDefault();

    await setCoordinates(actionBody.street, actionBody.number, actionBody.city);

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
      city: actionBody.city,
      latitude: actionCoordinates?.lat,
      longitude: actionCoordinates?.lng,
      organiser_id: user.id,
      Keywords: preferences, // placeholder for now
      Requirements: [requirements], // placeholder for now
    });
  }

  const setCoordinates = async (street, number, city) => {
    try {
      if (street && number && city) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`
        );
        const responseToJson = await response.json();

        if (responseToJson.results.length > 0) {
          console.log("fetch ok (I guess)");
          setActionCoordinates(responseToJson.results[0].geometry?.location);
        } else return;
      }
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
    <div>
      <NavBar />
      <h3>Create an Action</h3>
      <p>Get involved with the SocialRipple community!</p>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="name" className="form-label">
          Action name:
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            maxLength={35}
            className="form-control"
            cols="50"
            rows="1"
          />
        </label>{" "}
        <br />
        <label htmlFor="description" className="form-label">
          Action description:
          <textarea
            onChange={handleChange}
            name="description"
            id="description"
            cols="50"
            rows="3"
            minLength={150}
            className="form-control"
          ></textarea>
        </label>{" "}
        <br />
        <label
          htmlFor="start_time"
          className="form-label"
          style={{ margin: "5px" }}
        >
          Starting date:
          <input
            onChange={handleChange}
            name="start_time"
            id="start_time"
            type="date"
            className="form-control"
          />
        </label>
        <label
          htmlFor="end_time"
          className="form-label"
          style={{ margin: "5px" }}
        >
          Finishing date:
          <input
            onChange={handleChange}
            name="end_time"
            id="end_time"
            type="date"
            className="form-control"
          />
        </label>
        <br />
        <label htmlFor="is_group" className="form-label">
          Is it a group action?
          <input
            onChange={handleChange}
            type="checkbox"
            name="is_group"
            id="is_group"
          />
        </label>
        <br />
        <label htmlFor="online" className="form-label">
          On-line?
          <input
            onChange={handleChange}
            type="checkbox"
            name="online"
            id="online"
          />
        </label>
        <br />
        {isOnline && (
          <div>
            <label htmlFor="online_link" className="form-label">
              On-line action link:
              <input
                onChange={handleChange}
                type="text"
                id="online_link"
                name="online_link"
                className="form-control"
              />
            </label>{" "}
            <br />
          </div>
        )}
        <label htmlFor="inperson" className="form-label">
          In-person?
          <input
            onChange={handleChange}
            type="checkbox"
            name="inperson"
            id="inperson"
          />
        </label>
        <br />
        {isInPerson && (
          <div>
            {" "}
            <h5>Where is it taking place?</h5>
            <label
              htmlFor="street"
              className="form-label"
              style={{ margin: "5px" }}
            >
              <input
                onChange={handleChange}
                type="text"
                name="street"
                id="street"
                className="form-control"
                placeholder="Street"
              />
            </label>
            <label
              htmlFor="house_number"
              className="form-label"
              style={{ margin: "5px" }}
            >
              <input
                onChange={handleChange}
                type="text"
                name="house_number"
                id="house_number"
                className="form-control"
                placeholder="Number"
              />
            </label>
            <label
              htmlFor="city"
              className="form-label"
              style={{ margin: "5px" }}
            >
              <input
                onChange={handleChange}
                type="text"
                name="city"
                id="city"
                className="form-control"
                placeholder="City"
              />
            </label>
            <br />
            <br />
          </div>
        )}
        What is this action related to?
        <div className="preferencesInRegisterPage-css row justify-content-center">
          {keywords?.map((keyword, index) => (
            <div
              key={keyword.id}
              className={`col-2 mb-3 d-flex justify-content-center align-items-center`}
              style={{ margin: index % 3 === 2 ? "5px" : "10px" }}
            >
              <div className="d-inline-flex" style={{ gap: "67px" }}>
                <input
                  id={keyword.id}
                  value={keyword.id}
                  type="checkbox"
                  onChange={handleKeywordChange}
                  checked={preferences.includes(keyword.id) ? "checked" : null}
                  className="btn-check"
                  autoComplete="off"
                />
                <label
                  className="btn"
                  htmlFor={keyword.id}
                  style={{ backgroundColor: "#e4f1fe" }}
                >
                  {keyword.keyword}
                </label>
              </div>
            </div>
          ))}
        </div>
        <label htmlFor="requirements" className="form-label">
          <br />
          <br />
          <h5>Requirements: </h5>
          Capacity:{" "}
          <input
            onChange={handleRequirementChange}
            name="req_capacity"
            type="number"
            className="form-control"
          />{" "}
          <br />
          Description: <br />
          <label htmlFor="" className="form-label">
            <textarea
              onChange={handleRequirementChange}
              name="req_description"
              id="req_description"
              cols="50"
              rows="5"
              className="form-control"
            ></textarea>
          </label>
        </label>{" "}
        <br />
        <button
          className="sigInButton-css"
          style={{
            fontSize: "22px",
            padding: "9px 22px",
            borderRadius: "7px",
          }}
        >
          Create!
        </button>
      </form>
      <br />
    </div>
  );
}
