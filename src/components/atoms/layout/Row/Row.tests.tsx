import React from "react";
import { render } from "@testing-library/react-native";
import { Row } from "./Row.component";
import { Text } from "react-native";

describe("Row", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Row>
        <Text>Test Row</Text>
      </Row>
    );
    expect(getByText("Test Row")).toBeTruthy();
  });
});
