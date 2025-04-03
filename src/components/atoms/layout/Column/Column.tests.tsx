import React from "react";
import { render } from "@testing-library/react-native";
import { Column } from "./Column.component";
import { Text } from "react-native";

describe("Column", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Column>
        <Text>Test Column</Text>
      </Column>
    );
    expect(getByText("Test Column")).toBeTruthy();
  });
});
