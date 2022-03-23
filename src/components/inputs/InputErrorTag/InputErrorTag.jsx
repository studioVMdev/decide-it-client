import React from "react";

import "./InputErrorTag.scss";

import { ReactComponent as ErrorIcon } from "../../../assets/icons/error-24px.svg";

const InputErrorTag = ({ children, isValid }) => {
	return (
		<div className="input">
			{children}
			{!isValid && (
				<div className="input__error-wrapper">
					<ErrorIcon style={{ width: "14px" }} />
					<p className="p-small input__error-tag ">
						This field is required
					</p>
				</div>
			)}
		</div>
	);
};

export default InputErrorTag;
