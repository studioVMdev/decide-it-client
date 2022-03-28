import React from "react";

const InputDate = ({ name, label, value, handleOnChange, min }) => {
	return (
		<>
			<label htmlFor={name} className="input__label h3">
				{" "}
				{label}
			</label>
			<input
				min={min}
				onChange={handleOnChange}
				className="input__field p-medium"
				type="date"
				name={name}
				label={label}
				value={value}
			/>
		</>
	);
};

export default InputDate;
