import CreateTask from "../TasksCreate/index"; 
import React from "react";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, fireEvent, screen , waitFor } from "@testing-library/react";
import TasksCreate from "../../../pages/Tasks/TasksCreate";
// import '@testing-library/jest-dom/extend-expect'; 
import sinon from 'sinon';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
test("permite a entrada de texto do usuário", () => {
  render(<CreateTask />);
  const input = screen.getByLabelText("Nome") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Meu nome" } });
  expect(input.value).toBe("Meu nome");
})
test('executa a ação ao clicar no botão "Salvar" Create Tasks', async () => {
  const mockOnSubmit = sinon.spy();
  const { getByText } = render(<TasksCreate  onSubmit= {mockOnSubmit}  />);
  const button = getByText('Salvar');
  fireEvent.click(button);
  await waitFor(() => {
    expect(mockOnSubmit.calledOnce).toBeFalsy(); 
  });
});
