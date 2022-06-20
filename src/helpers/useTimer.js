import { useRef, useState } from 'react';

const useTimer = (startsFrom) => {
	const [timer, setTimer] = useState(startsFrom ?? 20);
	const timerRef = useRef(null);

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimer((prev) => {
				return prev - 1;
			});
		}, 1000);

		return () => {
			clearInterval(timerRef.current);
		};
	};

	const resetTimer = () => {
		setTimer(startsFrom);
		clearInterval(timerRef.current);
		startTimer();
	};

	return {
		startTimer,
		resetTimer,
		timer,
	};
};

export default useTimer;
