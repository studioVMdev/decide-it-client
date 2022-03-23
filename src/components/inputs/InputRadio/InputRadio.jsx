import React from "react";
import "./InputRadio.scss";

const InputRadio = ({ value = null, label, name, handleOptionChange }) => {
	return (
		<>
			<label htmlFor={`${label}`} className="input__label h3">
				{label}
			</label>
			<div className="input__options-wrapper">
				<div className="status-check">
					<label htmlFor="status-input" className="input__radio-wrapper">
						<input
							type="radio"
							name="status-input"
							value="In Stock"
							checked={value === "In Stock"}
							onChange={handleOptionChange}
							className="input__radio-input"
						/>
						<span className="input__radio-label p-medium">In Stock</span>
					</label>
				</div>

				<div className="status-check">
					<label htmlFor="status-input" className="input__radio-wrapper">
						<input
							type="radio"
							name="status-input"
							value="Out of Stock"
							checked={value === "Out of Stock"}
							onChange={handleOptionChange}
							className="input__radio-input"
						/>
						<span className="input__radio-label p-medium">
							Out of Stock
						</span>
					</label>
				</div>
			</div>
		</>
	);
};

export default InputRadio;
