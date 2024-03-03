import { LoginOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { FormItem } from "../../_commons";
// import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../contexts/authentication";
import { ROUTE_PRIVATE_ROOT_PATH } from "../../../route/constants";
import { useService } from "../../../contexts/service";
import jwtDecode from "jwt-decode";
function LoginForm() {
  const service = useService();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { setAuthenticationAsync } = useAuthentication();
  // const navigate = useNavigate();

  async function onSubmit(values) {
    setLoading(true);
    try {
      const {
        data: { token, userId },
      } = await service.post("/users/auth/login", values);
      console.log("data", token, userId);
      localStorage.setItem("token", token);

      const tokenDecode = jwtDecode(token);

      await setAuthenticationAsync({
        accessToken: `Bearer ${token}`,
        authData: {
          tokenDecode,
          user: userId,
        },
      }).then(() => navigate(ROUTE_PRIVATE_ROOT_PATH));
    } catch (error) {
      if (error?.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        console.error(error);
        // message.error("Não foi possível fazer login, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <FormItem
        name="email"
        label="E-mail"
        rules={[
          { required: true, message: "Por favor, insira seu e-mail." },
          { type: "email", message: "E-mail inválido" },
        ]}
      >
        <Input />
      </FormItem>

      <FormItem
        name="password"
        label="Senha"
        rules={[{ required: true, message: "Por favor, insira sua senha." }]}
      >
        <Input.Password />
      </FormItem>
      <Button
        htmlType="submit"
        block
        type="primary"
        icon={<LoginOutlined />}
        loading={loading}
        disabled={loading}
      >
        {loading ? "Aguarde..." : "Acessar"}
      </Button>
    </Form>
  );
}

export default LoginForm;
