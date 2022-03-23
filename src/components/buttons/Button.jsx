import React from "react";
import "./Button.scss";

const Button = ({
	variant = "primary",
	type,
	value,
	icon,
	id,
	handleClick,
}) => {
	//primary is default variant

	//secondary - cancel variant
	variant === "secondary" && (value = "Cancel");
	//delete - delete variant
	variant === "delete" && (value = "Delete");
	//header - header variant

	// You can also pass an icon which will show inside the button before the text;

	//you can pass down whatever function you want to trigger when button is clicked

	return (
		<button
			onClick={(e) => handleClick(e)}
			className={`button button__${variant} ${icon && "button__with-icon"}`}
		>
			{icon}
			<h3>{value}</h3>
		</button>
	);
};

export default Button;
