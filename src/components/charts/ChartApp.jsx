import React from "react";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import Chart from "chart.js/auto";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

const ChartApp = ({ dataset = null, labels, chartLabel, chartType }) => {
	console.log(labels);
	console.log(dataset);

	const chartOptions = {
		aspectRatio: 2,
		plugins: {
			title: {
				display: true,
				text: chartLabel,
				position: "top",
				padding: {
					top: 10,
					bottom: 20,
				},
			},
			// subtitle: {
			// 	position: "bottom",
			// 	display: true,
			// 	text: "subtitle",
			// },
			legend: {
				// display: true,
				display: false,
				position: "bottom",
			},
		},
	};

	return (
		<>
			<Chart
				data={{
					labels: labels,
					datasets: [
						{
							// type: "pie",
							type: chartType,
							// label: chartLabel,
							data: dataset,
							backgroundColor: [
								"rgba(255, 99, 132, 0.2)",
								"rgba(255, 206, 86, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(255, 206, 86, 0.2)",
								"rgba(75, 192, 192, 0.2)",
								"rgba(153, 102, 255, 0.2)",
								"rgba(255, 159, 64, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(75, 192, 192, 0.2)",
								"rgba(153, 102, 255, 0.2)",
								"rgba(153, 102, 255, 0.2)",
							],
							borderColor: [
								"rgba(255, 99, 132, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(75, 192, 192, 1)",
								"rgba(153, 102, 255, 1)",
								"rgba(255, 159, 64, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(75, 192, 192, 1)",
								"rgba(153, 102, 255, 1)",
								"rgba(153, 102, 255, 1)",
							],
							borderWidth: 1,
						},
					],
				}}
				options={chartOptions}
			/>
		</>
	);
};

export default ChartApp;
