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
			{slicedData.map((appData) => (
				<CardApp key={appData.uid} appData={appData} />
			))}
			<Pagination
				p="sm"
				page={activePage}
				siblings={2}
				onChange={setPage}
				total={Math.ceil(rawData.length / 10)}
			/>
		</>
	);
};

export default CardList;
