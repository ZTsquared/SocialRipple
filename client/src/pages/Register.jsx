import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [keywords, setKeywords] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();
  const { username, password, organisation, zipcode } = credentials;

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
        data: credentials,
      });

      // await axios("/api/preferences", {
      //   method: "POST",
      //   data: data.id,
      // })
      console.log(data);

      navigate({ pathname: "/Login" });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    register();
  }

  function handleKeywordChange(e) {
    if (e.target.checked) setPreferences((p) => [...p, e.target.value]);
    else setPreferences((p) => p.filter((pref) => pref !== e.target.value));
  }

  // i'm sending the keywords the user picked in the form.
  // I should be able to grab them and send them to the preferences table with the user_id and the
  // keyword id.

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
