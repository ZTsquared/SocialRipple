import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useRef, useState, useCallback } from "react";

import NavBar from "../components/NavBar"

export default function Home() {

  const navigate = useNavigate();
  const [actions, setActions] = useState([]);

	useEffect(() => {
		getActions();
	}, []);


  async function getActions() {
    try {
      const response = await fetch(`/api/actions`);
      const data = await response.json();
      setActions(data);
      console.log(actions);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // info
    // introduction
    // no filters
    // calls to action of the week
    // login button
    <div>
      <NavBar/>
      <br />
      <h2>SocialRipple</h2>
      <div className="homepageParagraph-css">
        <p>
          Welcome to SocialRipple, a platform designed to foster connections
          through meaningful social change. Our mission is to provide a space
          where individuals can engage in transformative Calls to Actions—events
          and challenges that transcend the ordinary. Whether you prefer the
          camaraderie of group activities or the personal challenge of
          individual pursuits, our platform offers diverse opportunities, both
          online and in person. At the core of our vision is the belief that
          creating positive societal impact can also be a catalyst for building
          lasting friendships and combating isolation within communities. Join
          us in our commitment to make a difference while forging meaningful
          connections that extend beyond the boundaries of social change.
        </p>
      </div>
      <h4>This is what is going on this week:</h4>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row">
          {actions
            .filter((act, i) => i < 4)
            .map((action) => (
              <div
                className="card"
                style={{
                  width: "18rem",
                  backgroundColor: "#c4c1e0",
                  color: "white",
                  margin: "8px",
                }}
                key={action.id}
              >
                <img
                  src="https://www.teameacc.org/wp-content/uploads/sites/8/2022/04/events.jpg"
                  className="card-img-top"
                  alt="..."
                  style={{ marginTop: "10px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{action.name}</h5>
                  <p className="card-text">{action.description}</p>
                  {action.Keywords.length > 0 && (
                    <div>
                      <div>This action is related to:</div>
                      <div>
                        {action.Keywords.map((k) => (
                          <div key={k.id}>{k.keyword}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  style={{
                    backgroundColor: "#c4c1e0",
                    color: "white",
                    margin: "10px",
                    borderRadius: "10px",
                    border: "2px solid white",
                  }}
                >
                  Access this action
                </button>
              </div>
            ))}
        </div>
      </div>
      <br />
      <Link to="/MainMenu" className="btn btn-success">
        Calls to action
      </Link>
      <br />
      <br />
    </div>
  );

}
