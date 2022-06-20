import { useEffect, useReducer, useRef } from 'react';
import { inputHelper, useTimer } from '../../helpers';
import { Answer } from '../Answer';
import { Question } from '../Question';
import { Result } from '../Result';
import { Timer } from '../Timer';
import config from './config';
import styles from './Quiz.module.css';

function reducer(state, action) {
	switch (action.type) {
		case 'INIT':
			return config.initialState;
		case 'INIT_QUESTIONS':
			return {
				...state,
				questions: config.getQuestions(action.payload),
				currentQuestion: 0,
			};
		case 'NEXT_QUESTION':
			return {
				...state,
				currentQuestion: state.currentQuestion + 1,
				tempAnswer: '',
			};
		case 'SET_TEMP_ANSWER':
			return {
				...state,
				tempAnswer: action.payload,
			};
		case 'SET_ANSWERS':
			return {
				...state,
				answers: action.payload,
			};
		case 'INCREMENT_SCORE':
			return {
				...state,
				score: state.score + 1,
			};
		default:
			return state;
	}
}

const Quiz = (props) => {
	const { numOfQuestions, operandLimit } = props;

	const [state, dispatch] = useReducer(reducer, config.initialState);

	const { questions, currentQuestion, answers, tempAnswer, score } = state;

	const timerRef = useRef(null);

	const { resetTimer, timer } = useTimer(20);

	useEffect(() => {
		if (currentQuestion != null && currentQuestion < questions.length) {
			timerRef.current = setTimeout(() => {
				moveAhead();
			}, 20 * 1000);
			resetTimer();
		}
	}, [currentQuestion, questions]);

	const initQuiz = () => {
		clearTimeout(timerRef.current);
		timerRef.current = null;
		dispatch({
			type: 'INIT',
		});
	};

	const startQuiz = () => {
		dispatch({
			type: 'INIT_QUESTIONS',
			payload: {
				numOfQuestions,
				operandLimit,
			},
		});
	};

	const moveAhead = () => {
		clearTimeout(timerRef.current);
		timerRef.current = null;
		dispatch({
			type: 'NEXT_QUESTION',
		});
	};

	const submitAnswerAndMoveAhead = (e) => {
		e.preventDefault();
		const answer = parseFloat(tempAnswer).toFixed(1);
		const tempAnswers = [...answers];
		tempAnswers[currentQuestion] = answer;
		if (answer === questions[currentQuestion].solution) {
			dispatch({
				type: 'INCREMENT_SCORE',
			});
		}
		dispatch({
			type: 'SET_ANSWERS',
			payload: tempAnswers,
		});
		moveAhead();
	};

	const handleInput = (e) => {
		const { fieldValue } = inputHelper(e);
		dispatch({
			type: 'SET_TEMP_ANSWER',
			payload: fieldValue,
		});
	};

	return (
		<div className={styles.root}>
			{currentQuestion != null && (
				<button className={styles.reset} onClick={initQuiz}>
					Reset
				</button>
			)}
			{currentQuestion == null && (
				<button onClick={startQuiz}>Start Quiz!</button>
			)}
			{currentQuestion >= 0 && currentQuestion < questions.length && (
				<>
					<form
						onSubmit={submitAnswerAndMoveAhead}
						className={styles.form}
					>
						<Question question={questions[currentQuestion]} />
						<p>
							Score : {score} / {numOfQuestions}
						</p>
						<Answer answer={tempAnswer} onInput={handleInput} />
					</form>
					<Timer className={styles.timer} timer={timer} />
				</>
			)}
			{currentQuestion != null && currentQuestion >= questions.length && (
				<Result
					score={score}
					numOfQuestions={numOfQuestions}
					questions={questions}
					answers={answers}
				/>
			)}
		</div>
	);
};

Quiz.defaultProps = {
	numOfQuestions: 20,
	operandLimit: 10,
};

export default Quiz;
