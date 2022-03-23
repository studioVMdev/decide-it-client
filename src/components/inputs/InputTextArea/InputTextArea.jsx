import React from "react";
import "./InputTextArea.scss";

const InputTextArea = ({ name, label, value, type, handleOnChange }) => {
	return (
		<>
			<label htmlFor={name} className="input__label h3">
				{" "}
				{label}
			</label>
			<textarea
				onChange={handleOnChange}
				className="input__text-area input__field  p-medium"
				type="text"
				name={name}
				label={label}
				rows="4"
				placeholder={label}
				value={value}
			></textarea>
		</>
	);
};

export default InputTextArea;
