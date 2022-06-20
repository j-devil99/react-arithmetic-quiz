import { useState } from 'react';
import './App.css';
import { Quiz } from './components';

const quiz1NumOfQuestions = 20;
const quiz2NumOfQuestions = 10;

function App() {
	const [score1, setScore1] = useState(0);
	const [score2, setScore2] = useState(0);

	return (
		<div className='App'>
			<div className='cumulative-result'>
				Overall Result: {score1 + score2} /{' '}
				{quiz1NumOfQuestions + quiz2NumOfQuestions}
			</div>
			<div className='quizzes'>
				<Quiz
					numOfQuestions={quiz1NumOfQuestions}
					score={score1}
					setScore={setScore1}
				/>
				<Quiz
					numOfQuestions={quiz2NumOfQuestions}
					score={score2}
					setScore={setScore2}
				/>
			</div>
		</div>
	);
}

export default App;
