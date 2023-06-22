import React from "react";
import { render, screen } from "@testing-library/react-native";
import App from "../src/App";

describe("<App />", () => {
  it("has 1 child", () => {
    render(<App />);
    expect(
      screen.getByText(/open up App.tsx to start working on your app!/i)
    ).toBeTruthy();
  });
});
