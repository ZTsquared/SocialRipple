import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
	const countdownDate = new Date(targetDate).getTime(); //new Date--> gives today's date, but the target date in () gives that date / getTime --> js method that gives time

	const [countDown, setCountDown] = useState(
		countdownDate - new Date().getTime() // countdownDate MINUS today's date = countdown
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(countdownDate - new Date().getTime()); // calculates remaining time in the countdown
		}, 1000); // This line creates an interval that executes th function every 1 sec. In this case, the function is updating the countdown timer.

		return () => clearInterval(interval);
	}, [countdownDate]);

	return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
	// calculate time left
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

	return { days, hours, minutes, seconds };
};

export { useCountdown };

// countdown --- calculated in milliseconds
