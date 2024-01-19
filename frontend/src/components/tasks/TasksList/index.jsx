/**
 *
 * Tasks List Component
 *
 */

import { DeleteOutlined, EditOutlined, InboxOutlined } from "@ant-design/icons";
import { SaveOutlined } from "@ant-design/icons";

import {
	Button,
	Col,
	message,
	Modal,
	Row,
	Table,
	Tag,
	Form,
	Input,
} from "antd";
import { useEffect, useState } from "react";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import "../../../assets/styles/global.css";
import DashoardPage from "../../../pages/Dashboard";
import Search from "antd/es/input/Search";

function EmployeesList({ onEdit, onItemsEdit, filter, ...props }) {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const { TextArea } = Input;
	const [isEditFormVisible, setIsEditFormVisible] = useState(false);
	const [pagination, setPagination] = useState({ current: 1, pageSize: 6 }); // Define a página inicial e o tamanho da página
	const [modalVisible, setModalVisible] = useState(false);
	const [originalEmployeeCount, setOriginalEmployeeCount] = useState(0);
	const [ultimoElemento, setUltimoElemento] = useState();

	const service = useService();
	useEffect(() => {
		getTasks();
	}, [filter, pagination.current, pagination.pageSize]);

	async function getTasks() {
		setLoading(true);
		try {
			const { data } = await service.get("/tasks/auth/getTasks", {
				params: {
					search: filter.search, // Forneça o valor de pesquisa corretamente
					page: pagination.current,
					pageSize: pagination.pageSize,
				},
			});
			if (originalEmployeeCount === 0) {
				setOriginalEmployeeCount(data.length);
			}

			setEmployees(data);
			const ultimoElemento = data[data.length - 1];
			console.log("Último elemento:", ultimoElemento);
			setUltimoElemento(ultimoElemento.name);
		} catch (error) {
			message.error("Não foi possível listar as tarefas.");
		}
		setLoading(false);
	}

	const columns = [
		{ key: "name", dataIndex: "name", title: "Nome da Tarefa" },
		{ key: "email", dataIndex: "email", title: "Email" },
		{ key: "subject", dataIndex: "subject", title: "Tarefa" },
		{
			key: "action",
			title: "Ação",
			align: "right",
			render: (taskSelected) => (
				<Row justify="end" gutter={24}>
					<Col>
						<Button
							icon={<EditOutlined />}
							type="link"
							onClick={() => {
								handleEditClick(taskSelected);
							}}
						/>
					</Col>
					<Col>
						<Button
							icon={<DeleteOutlined />}
							type="link"
							danger
							onClick={() => removeConfirm(taskSelected)}
						/>
					</Col>
				</Row>
			),
		},
	];
	function removeConfirm(taskSelected) {
		console.log("taskSelected", taskSelected);
		Modal.confirm({
			title: "Remover tarefa",
			content: `Deseja realmente remover a tarefa "${taskSelected.name}?"`,
			okText: "Não",
			cancelText: "Remover!",
			cancelButtonProps: { danger: true },
			onCancel: () => onRemove(taskSelected),
		});
	}

	async function onRemove(taskSelected) {
		try {
			console.log("taskSelected.id", taskSelected.id);
			await service.delete(`tasks/auth/removeTasks/${taskSelected.id}`);
			getTasks({ page: 1 });
			message.success(
				`A Tarefa "${taskSelected.name}" foi removido com sucesso!`
			);
		} catch (error) {
			message.error(
				`Não foi possível remover a Tarefa "${taskSelected.name}"`
			);
		}
	}

	const handleEditClick = (taskSelected) => {
		form.setFieldsValue(taskSelected);
		setModalVisible(true);
	};

	async function onSubmit(values) {
		try {
			setLoading(true);
			const response = await service.patch(
				`/tasks/auth/updateTask/${form.getFieldValue("id")}`,
				values
			);
			console.log("Dados recebidos:", response.data);
			getTasks();
			setIsEditFormVisible(false);
			message.success("Tarefa atualizada com sucesso!");
		} catch (error) {
			console.error("Erro ao atualizar a tarefa:", error);
			message.error("Não foi possível atualizar a Tarefa.");
		} finally {
			setLoading(false);
		}
	}
	const numberTasks = employees.length;

	return (
		<>
			{console.log("Rendered tasks in table:", employees)}{" "}
			{/* Adicione este log */}
			{employees.length >= 0 && (
				<DashoardPage
					numberTasks={originalEmployeeCount}
					ultimoElemento={ultimoElemento}
				/>
			)}{" "}
			<Table
				columns={columns}
				dataSource={employees}
				rowKey={(taskSelected) => taskSelected.id}
				pagination={{
					current: pagination.current,
					pageSize: pagination.pageSize,
					total: employees.length,
					onChange: (page, pageSize) =>
						setPagination({ current: page, pageSize }),
				}}
				loading={loading}
				scroll={{ x: 670 }}
				{...props}
			/>
			<Modal
				title="Editar Tarefa"
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				footer={null}
			>
				<Form form={form} onFinish={onSubmit} layout="vertical">
					<FormItem
						name="name"
						label="Nome"
						rules={[
							{ required: true },
							{ type: "name", message: "Nome inválido" },
						]}
					>
						<Input />
					</FormItem>

					<FormItem
						name="email"
						label="E-mail"
						rules={[
							{ required: true },
							{ type: "email", message: "E-mail inválido" },
						]}
					>
						<Input />
					</FormItem>
					<Form.Item
						name="subject"
						label="Digite Sua Tarefa"
						rules={[{ required: true }]}
					>
						<TextArea hidden={4} />
					</Form.Item>
					<Form.Item>
						<Button
							icon={<SaveOutlined />}
							type="primary"
							htmlType="submit"
							loading={loading}
							onClick={(a) => setModalVisible(false)}
						>
							Salvar
						</Button>
						<Button
							id="editButtonCancel"
							icon={<SaveOutlined />}
							type="primary"
							onClick={(a) => setModalVisible(false)}
						>
							Cancelar
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default EmployeesList;
