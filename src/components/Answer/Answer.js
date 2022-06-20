import styles from './Answer.module.css';

const Answer = (props) => {
	const { answer, disabled, onInput, result } = props;

	return (
		<fieldset className={styles.root} disabled={disabled}>
			<input
				className={`${styles.input} ${styles[result]}`}
				name='answer'
				type='number'
				step={0.1}
				required
				value={answer}
				onInput={onInput}
			/>
			{!disabled && (
				<button type='submit' className={styles.submit}>
					submit
				</button>
			)}
		</fieldset>
	);
};

Answer.defaultProps = {
	answer: '',
	disabled: false,
	onInput: () => {},
	result: '',
};

export default Answer;
