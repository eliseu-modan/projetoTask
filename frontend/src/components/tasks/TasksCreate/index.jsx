/**
 *
 * Tasks Create Component
 *
 */

import { SaveOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
// import { useNavigate } from "react-router-dom";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import "../../../assets/styles/global.css";

function CreateTask() {
	// const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const service = useService();
	const { TextArea } = Input;
	const [form] = Form.useForm();

	async function onSubmit(values) {
		setLoading(true);
		onSuccess();
		try {
			const { data } = await service.post("/tasks/auth/tasks", values);
		} catch (error) {
			if (error?.response?.data?.message) {
				message.error(error.response.data.message);
			} else {
				message.error(
					"Não foi possível cadastrar a tarefa, tente novamente."
				);
			}
		}
		setLoading(false);
	}
	const onSuccess = () => {
		form.resetFields();
		navigate("/app");
	};
	const handleCancelClick = () => {
		navigate("/app");
	};
	return (
		<Form
			form={form}
			onFinish={onSubmit}
			layout="vertical"
			className="custom-form"
		>
			<FormItem
				name="name"
				label="Nome"
				rules={[
					{ required: true },
					{ type: "name", message: "Nome inválido" },
				]}
			>
				<Input className="custom-input" />
			</FormItem>

			<FormItem
				name="email"
				label="E-mail"
				rules={[
					{ required: true },
					{ type: "email", message: "E-mail inválido" },
				]}
			>
				<Input className="custom-input" />
			</FormItem>

			<Form.Item
				name="task"
				label="Digite Sua Tarefa"
				rules={[{ required: true }]}
			>
				<TextArea className="custom-textarea" hidden={4} />
			</Form.Item>

			<Form.Item>
				<Button
					icon={<SaveOutlined />}
					type="primary"
					htmlType="submit"
					loading={loading}
					className="custom-button"
				>
					Salvar
				</Button>

				<Button
					id="editButtonCancel"
					icon={<SaveOutlined />}
					type="primary"
					htmlType="submit"
					loading={loading}
					onClick={handleCancelClick}
					className="custom-button"
				>
					Cancelar
				</Button>
			</Form.Item>
		</Form>
	);
}

export default CreateTask;
