import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useRef, useState, useCallback } from "react";

import NavBar from "../components/NavBar"
import ActionCard from "../components/ActionCard"

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
            .map((action, index) => (
            <div key={index} className="col-sm">
              <ActionCard action={action} />
            </div>
            ))}
        </div>
      </div>
    </div>
  );

}
