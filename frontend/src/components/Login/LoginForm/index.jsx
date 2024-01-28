import { LoginOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { FormItem } from "../../_commons";
// import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../contexts/authentication";
import { ROUTE_PRIVATE_ROOT_PATH } from "../../../route/constants";
import { useService } from "../../../contexts/service";
import jwtDecode from "jwt-decode";
import "./index.css";
function LoginForm() {
  const service = useService();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setAuthenticationAsync } = useAuthentication();
  // const navigate = useNavigate();
  async function onSubmit(values) {
    setLoading(true);
    try {
      const { data } = await service.post("/users/auth/login", values);
      console.log("data", data.token, data);
      localStorage.setItem("token", data.token);
      const tokenDecode = jwtDecode(data.token);

      await setAuthenticationAsync({
        accessToken: `Bearer ${data.token}`,
        authData: {
          tokenDecode,
          user: data.userId,
        },
      }).then(() => navigate(ROUTE_PRIVATE_ROOT_PATH));
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        console.log(error);
        message.error("Não foi possível fazer login, tente novamente.");
      }
    }
    setLoading(false);
  }
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
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
        name="password"
        label="Senha"
        rules={[{ required: true }]}
        isFocused
      >
        <Input.Password />
      </FormItem>

      <Button
        htmlType="submit"
        block
        type="primary"
        icon={<LoginOutlined />}
        loading={loading}
      >
        Acessar
      </Button>
    </Form>
  );
}

export default LoginForm;
