import styles from './Question.module.css';

const Question = (props) => {
	const { title, solution, number } = props.question;

	return (
		<div className={styles.root}>
			<p className={styles.number}>Question {number}</p>
			<pre className={styles.title}>{title}</pre>
		</div>
	);
};

Question.defaultProps = {
	question: {},
};

export default Question;
