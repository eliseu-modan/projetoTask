/**
 *
 * EmployeesFilter Component
 *
 */

import { Button, Col, Form, Input, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FormItem } from "../../_commons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmployeesFilter({ onChange, values }) {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	useEffect(() => {
		if (values) {
			form.setFieldsValue(values);
			console.log("Filter values changed:", values); // Adiciona este log
		}
	}, [values]);

	return (
		<Form
			form={form}
			className="planning-history-filter"
			name="planning-history-filter"
			onValuesChange={(_, values) => onChange(values)}
			size="large"
		>
			<Row justify="space-between" gutter={[24, 24]}>
				<Col span={24} md={9} lg={7}>
					<FormItem noMargin label="Pesquisar Tarefa" name="search">
						<Input.Search />
					</FormItem>
				</Col>
				<Col>
					<Button
						icon={<PlusOutlined />}
						type="primary"
						onClick={() => navigate("/app/create")}
						className="width-100"
					>
						Adicionar Tarefa
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default EmployeesFilter;
