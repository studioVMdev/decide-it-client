import React from "react";
// import "./InputText.scss";

const InputText = ({ name, label, value, handleOnChange }) => {
	return (
		<>
			<label htmlFor={name} className="input__label h3">
				{" "}
				{label}
			</label>
			<input
				onChange={handleOnChange}
				className="input__field p-medium"
				type="text"
				name={name}
				label={label}
				placeholder={label}
				value={value}
			/>
		</>
	);
};

export default InputText;
