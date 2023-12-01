import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [preferences, setPreferences] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    organisation: "",
    zipcode: "",
  });
  const [keywords, setKeywords] = useState([]);
  let { username, password, organisation, zipcode } = credentials;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    getKeywords();
  }, []);

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

  const register = async () => {
    try {
      console.log("trying...");
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: { credentials, preferences },
      });
      console.log(data);
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  function handleKeywordChange(e) {
    if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
    else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
    console.log(preferences);
  }

  function handleSubmit(event) {
    event.preventDefault();
    register();
  }

  return (
    <div className="mainMenu">
      <div>
        <div className="registerTitle-css">
          <h2> Register:</h2>
        </div>

        <form onSubmit={() => handleSubmit(event)} action="">
          <label htmlFor="username_input" className="form-label">
            username: <br />
            <input
              value={username}
              name="username"
              onChange={handleChange}
              id="username"
              type="text"
              className="form-control"
            />
          </label>
          <br />
          <br />
          <label htmlFor="password_input" className="form-label">
            password: <br />
            <input
              value={password}
              name="password"
              onChange={handleChange}
              id="password"
              type="password"
              className="form-control"
            />
            <br />
            <br />
          </label>{" "}
          <br />
          <label htmlFor="organisation_input" className="form-label">
            are you an organisation: <br />
            <input
              value={organisation}
              name="organisation"
              onChange={handleChange}
              id="organisation"
              type="organisation"
              className="form-control"
            />
            <br />
            <br />
          </label>{" "}
          <br />
          <label htmlFor="zipcode_input" className="form-label">
            zipcode: <br />
            <input
              value={zipcode}
              name="zipcode"
              onChange={handleChange}
              id="zipcode"
              type="zipcode"
              className="form-control"
            />
            <br />
            <br />
          </label>{" "}
          <br />
          <label className="form-label">
            what type of actions are you looking for?
          </label>
          <br />
          <div className="preferencesInRegisterPage-css row justify-content-center">
            {keywords.map((keyword, index) => (
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
                    name="preferences"
                    onChange={handleKeywordChange}
                    checked={
                      preferences.includes(keyword.id) ? "checked" : null
                    }
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
          <br />
          <button className="sigInButton-css">Sign in</button>
        </form>
        <br />
      </div>
    </div>
  );
}
