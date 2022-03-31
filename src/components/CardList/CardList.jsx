import React, { useState } from "react";
import "./CardList.scss";

import { Text, Pagination, Divider } from "@mantine/core";

import CardApp from "../cards/CardApp/CardApp";

const CardList = ({ rawData }) => {
	const [activePage, setPage] = useState(1);
	const pageSize = 10;

	console.log(activePage);
	const slicedData = rawData.slice(
		(activePage - 1) * pageSize,
		activePage * pageSize
	);

	return (
		<>
			{/* <Divider
				my="xs"
				label="Detailed Applications List"
				labelPosition="center"
			/> */}
			{slicedData.map((appData) => {
				return <CardApp key={appData.uid} appData={appData} />;
			})}
			<Pagination
				page={activePage}
				siblings={2}
				onChange={setPage}
				total={Math.ceil(rawData.length / 10)}
			/>
		</>
	);
};

export default CardList;

// import React from "react";
// import "./CardList.scss";

// import CardApp from "../cards/CardApp/CardApp";

// const CardList = ({ rawData }) => {
// 	return (
// 		<>
// 			<p>CardList </p>
// 			{rawData.map((appData) => {
// 				return <CardApp key={appData.uid} appData={appData} />;
// 			})}
// 		</>
// 	);
// };

// export default CardList;
