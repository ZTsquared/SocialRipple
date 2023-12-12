import { useNavigate } from "react-router-dom";

import React, { useEffect, useRef, useState } from "react";
import { WebGLRenderer } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Sphere, useTexture } from "@react-three/drei";
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

	const EsferitaBonita = ({ position, size, color }) => {
		const ref = useRef();

		const earthTexture = useTexture("./public/earthmap.jpeg");

		useFrame((state, delta) => {
			ref.current.rotation.y += delta / 4;
		});

		return (
			<mesh ref={ref} position={[-3, 3.27, 3]}>
				<sphereGeometry args={[0.3, 24, 24]} />
				<meshStandardMaterial map={earthTexture} />
			</mesh>
		);
	};

	const TitleCanvas = () => {
		return (
			<Canvas
				frameloop="demand"
				camera={{ position: [0, 10, 9], fov: 10, near: 0.1, far: 200 }}>
				<ambientLight intensity={4} />

				<EsferitaBonita />

				<Text3D
					anchorX="center"
					position={[-4.3, 3, 3]}
					font="./public/fonts/Kalnia Thin_Regular.json">
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
		<div className="homepageBody-css">
			<div className="flex justify-center items-center h-screen w-screen">
				<TitleCanvas />
			</div>

			<br />

			<div className="homepageParagraph-css">
				<p>
					Welcome to SocialRipple, a platform designed to foster connections
					through meaningful social change.
				</p>
			</div>

			<div className="d-flex justify-content-center align-items-center">
				{/* <div className="row"> */}
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
				{/* </div> */}
				{/* <div className="row"> */}
			</div>
			<div className="mission-container-css">
				<h4>Our Mission</h4>
				<p className="mission-statement-css">
					We want to create a safe space for transformative Calls to Actions,
					fostering connections through group and individual activities, online
					and in person. Our vision emphasizes the dual impact of societal
					change and building lasting friendships to combat isolation. Join us
					in making a difference and forming meaningful connections.
				</p>
			</div>

			<div className="row">
				<div className="col-4">
					<div className="homepageBoxes">
						<i class="fa-solid fa-users"></i>
						<br></br>
						Connect with other people. Join a community of like-minded and open
						people, who are hungry for social change. Let's make this world a
						better place, together.
					</div>
				</div>
				<div className="col-4">
					{" "}
					<div className="homepageBoxes">
						<i class="fa-solid fa-calendar"></i>
						<br></br>
						Join any of our user generated calls to action. Buy a book from a
						local store or come to our movie night. We have a wide range of
						activities created by people like you.
					</div>
				</div>
				<div className="col-4">
					{" "}
					<div className="homepageBoxes">
						<i class="fa-solid fa-user"></i>
						<br></br>
						Keep connected with other users. Keep track of your previous and
						upcoming calls to action. Make your profile space really your own
						safe corner of the internet.
					</div>
				</div>
			</div>
		</div>
	);
}
