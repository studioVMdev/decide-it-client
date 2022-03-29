import React from "react";
import "./CardList.scss";

import CardApp from "../cards/CardApp/CardApp";

const CardList = ({ rawData }) => {
	return (
		<>
			<p>CardList </p>
			{rawData.map((appData) => {
				return <CardApp key={appData.uid} appData={appData} />;
			})}
		</>
	);
};

export default CardList;
