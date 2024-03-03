/**
 *
 * Tasks Create Component
 *
 */

import { SaveOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  DatePicker,
  Row,
  Col,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useService } from "../../../contexts/service";
import { FormItem } from "../../_commons";
import "../../../assets/styles/global.css";

function CreateTask({ forms, onFinishs }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const service = useService();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [showDate, setShowDate] = useState(false);

  const dateInitial = (dateInitial) => {
    form.setFieldsValue({ dateInitial: dateInitial });
  };
  const dateFinally = (dateFinally) => {
    form.setFieldsValue({ dateFinally: dateFinally });
  };
  async function onSubmit(values) {
    setLoading(true);
    onSuccess();
    console.log("values", values);
    try {
      if (values.permanent === true) {
        navigate("/Tarefas Permanentes");
      } else {
        window.location.reload();
      }
      const { data } = await service.post("/tasks/auth/tasks", values);
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Não foi possível cadastrar a tarefa, tente novamente.");
      }
      setLoading(false);
    }
  }
  const onSuccess = () => {
    form.resetFields();
    navigate("/app");
  };
  const handleCancelClick = () => {
    navigate("/app");
  };
  const handleFormFinish = (values) => {
    onSubmit({ ...values, permanent: showDate });
    onFinishs({ ...values, permanent: showDate });
    setLoading(true);
  };

  const dataCheckBox = (event) => {
    setShowDate(!showDate);
    setShowDate(event.target.checked);
  };
  return (
    <>
      <Form
        form={form}
        onFinish={handleFormFinish}
        layout="vertical"
        className="custom-form"
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            { required: true },
            { type: "string", message: "Nome inválido" },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>
        <Form.Item name="permanent">
          <Checkbox
            onChange={dataCheckBox} // Use onChange em vez de onClick
            checked={showDate}
          />
          Tarefas Permanentes ?
        </Form.Item>
        {!showDate && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateInitial" label="Data de Início">
                <DatePicker
                  onChange={dateInitial}
                  value={showDate.dateInitial}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dateFinally" label="Data de Final">
                <DatePicker
                  onChange={dateFinally}
                  value={showDate.dateFinally}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        {!showDate && (
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true },
              { type: "email", message: "E-mail inválido" },
            ]}
          >
            <Input className="custom-input" />
          </Form.Item>
        )}
        <Form.Item
          name="task"
          label="Digite Sua Tarefa"
          rules={[{ required: true }]}
        >
          <TextArea className="custom-textarea" />
        </Form.Item>
        <Form.Item>
          <Button
            icon={<SaveOutlined />}
            type="primary"
            htmlType="submit"
            loading={loading}
            className="custom-button"
            style={{ position: "relative", top: "10px" }}
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default CreateTask;
