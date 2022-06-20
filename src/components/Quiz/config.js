const OPERATORS = ['/', '+', '-', '*'];

const config = {
	initialState: {
		questions: [],
		answers: [],
		currentQuestion: null,
		tempAnswer: '',
		score: 0,
	},
	getQuestions: ({ numOfQuestions, operandLimit }) => {
		return [...Array(numOfQuestions).keys()].map((num, index) => {
			const operand1 = Math.floor(operandLimit * Math.random());
			const operand2 = 1 + Math.floor(operandLimit * Math.random());
			const operator =
				OPERATORS?.[Math.floor(OPERATORS.length * Math.random())];
			const title = `${operand1} ${operator} ${operand2}`;
			const solution = parseFloat(eval(title)).toFixed(1);

			return {
				title,
				solution,
				number: index + 1,
			};
		});
	},
};

export default config;
