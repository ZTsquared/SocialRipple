import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CreateAction() {
  const [actionBody, setActionBody] = useState({ description: "" });
  const [actionCoordinates, setActionCoordinates] = useState();
  const [requirements, setRequirements] = useState([
    { capacity: "", description: "" },
  ]);
  const [user, setUser] = useState();
  const [keywords, setKeywords] = useState(); // just to get the full array of keywords so you can pick the ones you want.
  const [preferences, setPreferences] = useState([]); // doing it like this for now... it's NOT exactly requirements, but ye
  const [isOnline, setIsOnline] = useState(false); //so that we can make the action link show up (or not)
  const [isInPerson, setIsInPerson] = useState(false); //so that we can make the address form show up (or not)
  const minLength = 140; //characters in the description field
  const [actionCreated, setActionCreated] = useState(false);
  const [allInputsCompleted, setAllInputsCompleted] = useState(false);
  const [atLeastOneRequirementCompleted, setAtLeastOneRequirementCompleted] =
    useState(false);
  const [unlimitedPlaces, setUnlimitedPlaces] = useState(false);

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
    if (name === "online" || name === "inperson" || name === "is_group") {
      checked
        ? setActionBody({ ...actionBody, [name]: true })
        : setActionBody({ ...actionBody, [name]: false });
    } else {
      setActionBody({ ...actionBody, [name]: value });
    }

    if (actionBody.online) {
      if (
        actionBody.online_link?.length &&
        actionBody.name?.length &&
        actionBody.description?.length &&
        preferences?.length
      ) {
        setAllInputsCompleted(true);
      }
    } else if (actionBody.inperson) {
      if (
        actionBody.city?.length &&
        actionBody.street?.length &&
        actionBody.house_number?.length &&
        actionBody.name?.length &&
        actionBody.description?.length &&
        preferences?.length
      ) {
        setAllInputsCompleted(true);
      }
    }
  };

  const handleRequirementChange = (index, event) => {
    const { name, value, checked } = event.target;
    if (name === `capacity_checkbox${index}`) {
      console.log(`is it checked? ${checked}`);
      if (checked) setUnlimitedPlaces(true);
      else if (!checked) setUnlimitedPlaces(false);
    }

    // if (unlimitedPlaces) {
    //   requirements[index].capacity = null;
    // } //this was here for the unlimited volunteers option

    if (
      (requirements[index].capacity > 0 &&
        requirements[index].description?.length) ||
      (unlimitedPlaces && requirements[0].description?.length)
    ) {
      setAtLeastOneRequirementCompleted(true);
    }

    const newRequirements = [...requirements];

    newRequirements[index][name] = value;

    setRequirements(newRequirements);
  };

  const addRequirement = (e) => {
    e.preventDefault();
    setRequirements([...requirements, { capacity: "", description: "" }]);
  };

  function handleKeywordChange(e) {
    if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
    else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
  }

  async function handleSubmit() {
    event.preventDefault();

    await setCoordinates(actionBody.street, actionBody.number, actionBody.city);

    if (allInputsCompleted) {
      createNewAction({
        online: actionBody.online,
        online_link: actionBody.online_link,
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
        Keywords: preferences,
        Requirements: requirements,
      });
      setActionCreated(true);
    }
  }

  const setCoordinates = async (street, number, city) => {
    try {
      if (street && number && city) {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=carrer%20${street}%20${number}%20${city}&key=AIzaSyCGHIA__546ykAp5aVLx19mpq0fP_OeZhs`
        );
        const responseToJson = await response.json();

        if (responseToJson.results.length > 0) {
          setActionCoordinates(responseToJson.results[0].geometry?.location);
        } else return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createNewAction = async (action) => {
    try {
      const response = await fetch("/api/actions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(action),
      });
      const data = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bodyOfCreateAction-css">
      {!actionCreated && (
        <div>
          <h2>Create an Action, Make a Difference!</h2>
          <div className="paragraphOfCreateAction-css">
            <p>
              Your ideas can spark positive change! By creating an action, you
              contribute to the vibrancy of our community. Whether it's a
              volunteer opportunity, an event, or a cause you're passionate
              about, share it with others and inspire collective impact.
            </p>
            <p>
              Let your creativity shine and lead the way. Get started below and
              help make our community a better place!
            </p>
          </div>
          <form>
            <label
              htmlFor="name"
              className="form-label"
              style={{
                fontSize: "17px",
              }}
            >
              Name:
              <input
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                maxLength={25}
                className="form-control"
                cols="50"
              />
            </label>{" "}
            <br />
            <label
              htmlFor="description"
              className="form-label"
              style={{
                fontSize: "17px",
              }}
            >
              Description:
              <textarea
                onChange={handleChange}
                name="description"
                id="description"
                cols="42"
                rows="4"
                value={actionBody?.description}
                minLength={140}
                className="form-control"
                placeholder="As more people discover your action, this short intro helps introduce it."
              ></textarea>
            </label>{" "}
            <div>
              {actionBody.description?.length <= minLength && (
                <div style={{ color: "red", fontSize: "13px" }}>
                  Please make your description a bit longer so users can
                  understand what it's about!
                </div>
              )}
            </div>
            <br />

            <label
              style={{
                fontSize: "18px",
              }}
            >
              What is this action related to?
            </label>
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
                      checked={
                        preferences.includes(keyword.id) ? "checked" : null
                      }
                      className="btn-check"
                      autoComplete="off"
                    />
                    <label
                      className="btn keywordSelect-css"
                      htmlFor={keyword.id}
                      style={{ backgroundColor: "#e4f1fe" }}
                    >
                      {keyword.keyword}
                    </label>
                  </div>
                </div>
              ))}
            </div>
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
                type="datetime-local"
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
                type="datetime-local"
                className="form-control"
              />
            </label>
            <br />
            <label
              htmlFor="is_group"
              className="form-label"
              style={{
                fontSize: "17px",
              }}
            >
              Is it a group action?
              <input
                onChange={handleChange}
                type="checkbox"
                name="is_group"
                id="is_group"
                className="checkedBoxesCreateAction-css"
              />
            </label>
            <br />
            <label
              htmlFor="online"
              className="form-label"
              style={{
                fontSize: "17px",
              }}
            >
              On-line?
              <input
                onChange={handleChange}
                type="checkbox"
                name="online"
                id="online"
                className="checkedBoxesCreateAction-css"
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
            <label
              htmlFor="inperson"
              className="form-label"
              style={{
                fontSize: "17px",
              }}
            >
              In-person?
              <input
                onChange={handleChange}
                type="checkbox"
                name="inperson"
                id="inperson"
                className="checkedBoxesCreateAction-css"
              />
            </label>
            <br />
            {isInPerson && (
              <div>
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

              </div>
            )}
            
            <br />
            <br />
            <h5>Volunteership Requirements:</h5>
            {requirements.map((requirement, index) => (
              <div key={index}>
                <label htmlFor={`capacity_${index}`} className="form-label">
                  How many people are needed?
                  <input
                    onChange={(e) => handleRequirementChange(index, e)}
                    name="capacity"
                    type="number"
                    min="0"
                    value={requirement.capacity}
                    className="form-control"
                  />
                </label>
                {/* <br /> */}
                {/* <label
                  htmlFor="capacity"
                  className="form-label"
                  style={{
                    fontSize: "17px",
                  }}
                >
                  Unlimited places
                  <input
                    onChange={(e) => {
                      handleRequirementChange(index, e);
                      setUnlimitedPlaces(e.target.checked);
                    }}
                    type="checkbox"
                    name={`capacity_checkbox${index}`}
                    checked={unlimitedPlaces}
                    className="checkedBoxesCreateAction-css"
                  />
                </label> */}
                <br />
                <label htmlFor={`description_${index}`} className="form-label">
                  Description: <br />
                  <textarea
                    onChange={(e) => handleRequirementChange(index, e)}
                    name="description"
                    id={`description_${index}`}
                    value={requirement.description}
                    cols="50"
                    rows="5"
                    className="form-control"
                    placeholder="Help us understand what tasks or skills are needed from volunteers during this action."
                  ></textarea>
                </label>
                <br />
                {!atLeastOneRequirementCompleted && (
                  <div style={{ color: "red", fontSize: "13px" }}>
                    Please add at least one requirement
                  </div>
                )}
              </div>
            ))}
            <br />
            <button
              onClick={(e) => addRequirement(e)}
              className="buttonToAddNewRequirement-css"
            >
              Add More
            </button>
            <br />
            <br />
            {allInputsCompleted ? (
              <button
                className="sigInButton-css"
                style={{
                  fontSize: "22px",
                  padding: "9px 22px",
                  borderRadius: "7px",
                }}
                onClick={handleSubmit}
                type="submit"
              >
                Create!
              </button>
            ) : (
              <div>
                <div>
                  Finish completing all the inputs to create an Action!😉
                </div>
                <button
                  className="sigInButton-css"
                  style={{
                    fontSize: "22px",
                    padding: "9px 22px",
                    borderRadius: "7px",
                    backgroundColor: "rgb(93, 163, 198)",
                    color: " rgb(224, 220, 220)",
                  }}
                  disabled={true}
                >
                  Create!
                </button>
              </div>
            )}
          </form>
          <br />
        </div>
      )}
      <div>
        {actionCreated && (
          <div>
            <h3 className="actionCreatedTittle-css">
              Your action was created succesfully!
            </h3>
            <Link to="/">
              <button className="buttonToGoToHomePage-css">Home</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
