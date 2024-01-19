import { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";

import "./style.css";

function DashboardPage({ numberTasks, ultimoElemento }) {
	const [currentTime, setCurrentTime] = useState(getCurrentTime());
	const [currentDate, setCurrentDate] = useState(getCurrentDate());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(getCurrentTime());
		}, 1000); // Atualiza a cada segundo

		return () => {
			clearInterval(intervalId);
		};
	}, []); //

	function getCurrentTime() {
		const currentDate = new Date();
		const hours = currentDate.getHours().toString().padStart(2, "0");
		const minutes = currentDate.getMinutes().toString().padStart(2, "0");
		const seconds = currentDate.getSeconds().toString().padStart(2, "0");
		return `${hours}:${minutes}:${seconds}`;
	}

	function getCurrentDate() {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
		const day = currentDate.getDate().toString().padStart(2, "0");
		return `${day}-${month}-${year}`;
	}

	return (
		<Row gutter={[24, 24]}>
			<Col span={6}>
				<Card>
					<h2>Tarefas Criadas</h2>
					<h1>{numberTasks}</h1>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<h2>Data</h2>
					<h1>{currentDate}</h1>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<h2>Horario Atual</h2>
					<h1>{currentTime}</h1>
				</Card>
			</Col>
			<Col span={6}>
				<Card>
					<h2>Ultima tarefa Criada</h2>
					<h1>{ultimoElemento}</h1>
				</Card>
			</Col>
		</Row>
	);
}

export default DashboardPage;
