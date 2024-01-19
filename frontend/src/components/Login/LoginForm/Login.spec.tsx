import React from "react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Login from "./index";
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};



describe("Login Form", () => {
  test("renders email and password fields", () => {
    const { getByLabelText } = render(<Login />);
    
    const emailField = getByLabelText("E-mail");
    const passwordField = getByLabelText("Senha");

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const { getByLabelText, getByText } = render(<Login />);
    
    const emailField = getByLabelText("E-mail");
    const passwordField = getByLabelText("Senha");
    const submitButton = getByText("Acessar");

    // Preencha os campos com dados válidos
    fireEvent.input(emailField, { target: { value: "test@example.com" } });
    fireEvent.input(passwordField, { target: { value: "password123" } });

    // Envie o formulário
    fireEvent.click(submitButton);

    // Você pode esperar por uma resposta assíncrona aqui, se necessário
    // await waitFor(() => expect(/* alguma condição de sucesso */).toBeTruthy());
  });

  // Adicione mais testes conforme necessário para dados inválidos, validação de formulário, etc.
});
