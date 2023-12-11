import { useNavigate } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import {WebGLRenderer} from "three";
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Sphere, useTexture } from '@react-three/drei';

import ActionCard from "../components/ActionCard";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// import "./public/fonts/Kalnia-VariableFont.ttf"
export default function Home() {
  const navigate = useNavigate();
  const [actions, setActions] = useState([]);

  const renderer = new WebGLRenderer();
  renderer.autoClear = false;

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



  const EsferitaBonita = ({ position, size, color}) => {

    const ref = useRef();

    const earthTexture = useTexture("./public/earthmap.jpeg")

    useFrame((state, delta) => {

      ref.current.rotation.y += delta / 4;
    })

    return (
      <mesh ref={ref} position={[-3, 3.27, 3]}>
      <sphereGeometry args={[0.3, 24, 24]} />
      <meshStandardMaterial map={earthTexture}/>
      </mesh>
    )
}

  const TitleCanvas = () => {

    return (
      <Canvas frameloop="demand" camera={{ position: [0, 10, 9], fov: 10, near: 0.1, far: 200 }}> 
        <ambientLight intensity={4} />
        
        <EsferitaBonita />


        <Text3D anchorX="center" position={[-4.3, 3, 3]} font="./public/fonts/Kalnia Thin_Regular.json">

          Social Ripple
          <meshNormalMaterial />
        </Text3D>
        
      </Canvas>
    );
  };

  

  return (
    // info
    // introduction
    // no filters
    // calls to action of the week
    // login button
    <div>


    <div className="flex justify-center items-center h-screen w-screen">
      <TitleCanvas />
    </div>


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
          <Carousel>
            {actions
              .filter((act, i) => i < 4)
              .map((action, index) => (
                <div key={index}>
                  <img
                    src="https://blog.bluemoontalent.com/wp-content/uploads/2014/02/event-header-4.jpg"
                    alt=""
                  />
                  <p className="legend">
                    {action.name} <br /> {action.description}
                  </p>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
