import React from "react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import Button from "./index";

const buttonTestID = "button";

describe("Button", () => {
  test("should be able to render the button", () => {
    const { getByTestId } = render(<Button />);
    expect(getByTestId(buttonTestID)).toBeInTheDocument();
  });
});
