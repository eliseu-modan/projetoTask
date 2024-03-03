import React from "react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { render, fireEvent,waitFor } from "@testing-library/react";
import Side from "../../../layouts/Private/components/Sider/index";
import Login from "../LoginForm/index";



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
    fireEvent.input(emailField, { target: { value: "test@example.com" } });
    fireEvent.input(passwordField, { target: { value: "password123" } });

    fireEvent.click(submitButton);

  });

});









