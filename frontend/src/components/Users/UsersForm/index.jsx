/**
 *
 * UserForm Component
 *
 */

import { SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import { useState } from "react";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import { Checkbox } from "antd";

function UserForm() {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
	const service = useService();

	async function onSubmit(values) {
		setLoading(true);
		try {
			const { data } = await service.post("/users/auth/register", values);

			window.location.reload();
		} catch (error) {
			if (error?.response?.data?.message) {
				message.error(error.response.data.message);
			} else {
				message.error(
					"Não foi possível editar o Usuário, tente novamente."
				);
			}
		}
		setLoading(false);
	}

	return (
		<Form form={form} onFinish={onSubmit} size="large" layout="vertical">
			<FormItem
				name="email"
				label="E-mail"
				isFocused
				rules={[
					{ required: true },
					{ type: "email", message: "E-mail inválido" },
				]}
			>
				<Input />
			</FormItem>
			<FormItem
				name="admin"
				rules={[{ required: true }]}
				valuePropName="checked"
			>
				<Checkbox>Admin?</Checkbox>
			</FormItem>
			<FormItem
				name="password"
				label="Password"
				rules={[{ required: true }]}
			>
				<Input />
			</FormItem>
			<Button
				icon={<SaveOutlined />}
				type="primary"
				htmlType="submit"
				block
				loading={loading}
			>
				Registrar
			</Button>
		</Form>
	);
}

export default UserForm;
