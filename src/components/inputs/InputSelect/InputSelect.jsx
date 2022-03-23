import React from "react";
import "./InputSelect.scss";

const InputSelect = ({
	options = null,
	label,
	name,
	value,
	handleOnChange,
}) => {
	return (
		<>
			<label htmlFor={`${label}`} className="input__label h3">
				{label}
			</label>
			<select
				className="input__field p-medium"
				value={value}
				onChange={handleOnChange}
			>
				<option className=" input__field p-medium" value="" disabled hidden>
					Please Choose...
				</option>
				{options &&
					options.map((option) => (
						<option
							key={option}
							name={name}
							className=" input__field p-medium"
							value={option}
						>
							{option}
						</option>
					))}
			</select>
		</>
	);
};

export default InputSelect;

{
	/* <select value={this.state.fruit} onChange={this.handleChange}>
{options.map((option) => (
  <option value={option.value}>{option.label}</option>
))}
</select> */
}
