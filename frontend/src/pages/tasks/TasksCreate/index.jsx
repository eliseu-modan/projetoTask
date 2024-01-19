/**
 *
 * EmployeesCreate Page
 *
 */

import withContext from "../../../contexts/withContexts";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, message } from "antd";
import { useEffect, useState } from "react";
import { PageEventsProvider } from "../../../contexts";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../../../contexts/service";
import {
	// EmployeesCardsForm,
	EmployeesGeneralForm,
} from "../../../components/tasks";

function EmployeesCreatePage({ route, ...props }) {
	const service = useService();
	const { employeeId } = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const [employee, setEmployee] = useState();

	// useEffect(() => {
	// 	if (employeeId) {
	// 		getEmployee();
	// 	}
	// }, [employeeId]);

	// async function getEmployee() {
	// 	setLoading(true);
	// 	try {
	// 		const { data } = await service.get(`/employees/${employeeId}`);
	// 		setEmployee(data);
	// 	} catch (error) {
	// 		message.error(
	// 			"Não foi possível recuperar os dados de colaborador."
	// 		);
	// 	}
	// 	setLoading(false);
	// }
	// const onSubmit = async (values) => {
	// 	setLoading(true);
	// 	try {
	// 		// Se precisar editar o funcionário, você pode fazer isso aqui
	// 		// Exemplo: await service.patch(`/employees/${employee.id}`, values);
	// 		const { data } = await service.post("/tasks/auth/tasks", values);
	// 		if (data) {
	// 			// Navegue para "/tasks" após o envio bem-sucedido
	// 			navigate("/tasks");
	// 		}
	// 	} catch (error) {
	// 		if (error?.response?.data?.message) {
	// 			message.error(error.response.data.message);
	// 		} else {
	// 			message.error(
	// 				"Não foi possível fazer o registro, tente novamente."
	// 			);
	// 		}
	// 	}
	// 	setLoading(false);
	// };

	// const onSuccess = () => {
	// 	navigate("/tasks");
	// };

	return (
		<>
			<EmployeesGeneralForm></EmployeesGeneralForm>
		</>
		// <Card className="container">
		// 	<Form form={form} onFinish={onSubmit} layout="vertical">
		// 		<Row
		// 			justify="space-between"
		// 			align="middle"
		// 			className="margin-bottom"
		// 		>
		// 			<Col>
		// 				<h3>{employeeId ? "Editar" : "Criar"} Tarefa</h3>
		// 			</Col>
		// 			<Col>
		// 				<Form.Item>
		// 					<Button
		// 						icon={<SaveOutlined />}
		// 						type="primary"
		// 						htmlType="submit"
		// 						loading={loading}
		// 					>
		// 						Salvar
		// 					</Button>
		// 				</Form.Item>
		// 			</Col>
		// 		</Row>
		// 		<Row gutter={[24, 24]}>
		// 			<Col span={12}>
		// 				<EmployeesGeneralForm />
		// 			</Col>
		// 			{/* <Col span={12}>
		// 				<EmployeesCardsForm employee={employee} form={form} />
		// 			</Col> */}
		// 		</Row>
		// 	</Form>
		// </Card>
	);
}

export default withContext(PageEventsProvider)(EmployeesCreatePage);
