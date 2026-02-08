import { useEffect, useState } from "react";

export const useTimer = (endTime: number) => {
	const [timeLeft, setTimeLeft] = useState(endTime);

	useEffect(() => {
		const timer = setInterval(() => {
			const remaining = endTime - Date.now();
			setTimeLeft(remaining);
		}, 1000);

		return () => clearInterval(timer);
	}, [endTime]);

	return formatTime(timeLeft);
};

const formatTime = (milliseconds: number): string => {
	if (milliseconds <= 0) return "00:00:00";

	const totalSeconds = Math.floor(milliseconds / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (days > 0) {
		return `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	}

	return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
