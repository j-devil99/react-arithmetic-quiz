import styles from './Timer.module.css';

const Timer = (props) => {
	const { timer, className } = props;

	return <div className={`${styles.root} ${className}`}>{timer}s</div>;
};

Timer.defaultProps = {
	timer: '',
	className: '',
};

export default Timer;
