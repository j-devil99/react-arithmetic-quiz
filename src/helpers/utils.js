export function inputHelper(e) {
	const fieldName = e.target.name;
	const fieldValue =
		e.target.type === 'checkbox' ? e.target.checked : e.target.value;
	const { dataset } = e?.currentTarget ?? {};
	return {
		fieldName,
		fieldValue,
		dataset,
	};
}
