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

  function handleKeywordChange(e) {
    if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
    else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
    console.log(preferences);
  }

  const register = async () => {
    try {
      console.log("trying...");
      const { data } = await axios("/api/auth/register", {
        method: "POST",
        data: { credentials, preferences },
      });
      console.log(data);
      // navigate({ pathname: "/Login" });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    register();
  }

  return (
    <div className="mainMenu">
      <div>
        <h2> Register:</h2>
        <form onSubmit={() => handleSubmit(event)} action="">
          <label htmlFor="username_input">
            username: <br />
            <input
              value={username}
              name="username"
              onChange={handleChange}
              id="username"
              type="text"
            />
          </label>
          <br />
          <br />
          <label htmlFor="password_input">
            password: <br />
            <input
              value={password}
              name="password"
              onChange={handleChange}
              id="password"
              type="password"
            />
            <br />
            <br />
          </label>{" "}
          <br />
          <label htmlFor="organisation_input">
            organisation: <br />
            <input
              value={organisation}
              name="organisation"
              onChange={handleChange}
              id="organisation"
              type="organisation"
            />
            <br />
            <br />
          </label>{" "}
          <br />
          <label htmlFor="zipcode_input">
            zipcode: <br />
            <input
              value={zipcode}
              name="zipcode"
              onChange={handleChange}
              id="zipcode"
              type="zipcode"
            />
            <br />
            <br />
          </label>{" "}
          <br />
          {keywords.map((keyword, index) => (
            <div key={keyword.id}>
              <input
                id={keyword.id}
                value={keyword.id}
                type="checkbox"
                name="preferences" //do i need this?
                onChange={handleKeywordChange}
                checked={preferences.includes(keyword.id) ? "checked" : null}
              />
              {keyword.keyword}
            </div>
          ))}
          <button>Sign in</button>
        </form>
      </div>
    </div>
  );
}
