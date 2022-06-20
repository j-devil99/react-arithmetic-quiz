import { Answer } from '../Answer';
import { Question } from '../Question';
import styles from './Result.module.css';

const Result = (props) => {
	const { score, numOfQuestions, questions, answers } = props;

	return (
		<div className={styles.root}>
			<p className={styles.heading}>Quiz Over</p>
			<p>
				Your final score : {score} / {numOfQuestions}
			</p>
			<div className={styles.summary}>
				{questions.map((question, idx) => {
					const result =
						answers[idx] === question.solution
							? 'correct'
							: 'wrong';
					return (
						<div className={`${styles.wrapper} ${styles[result]}`}>
							<Question
								question={question}
								key={question.number}
							/>
							<div className={styles.answers}>
								<div className={styles.answer}>
									Your Answer
									<Answer
										disabled
										answer={answers[idx] ?? 'No Answer'}
										result={result}
									/>
								</div>
								<div className={styles.answer}>
									Solution
									<Answer
										disabled
										answer={question.solution}
										result='correct'
									/>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Result;
