import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProfileScreen from "../src/screens/authenticated/ProfileScreen";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock the expo-router
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

// Mock the userStore
jest.mock("@/src/store/userStore", () => ({
  useUserStore: jest.fn(() => ({
    user: {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
    },
    logout: jest.fn(),
  })),
}));

describe("ProfileScreen", () => {
  it("renders correctly with user data", () => {
    const { getByText } = render(<ProfileScreen />);

    // Check if user name and email are displayed
    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("john.doe@example.com")).toBeTruthy();
  });

  it("renders menu items", () => {
    const { getByText } = render(<ProfileScreen />);

    // Check if menu items are rendered
    expect(getByText("Edit Profile")).toBeTruthy();
    expect(getByText("Notifications")).toBeTruthy();
    expect(getByText("Payment Methods")).toBeTruthy();
    expect(getByText("Help & Support")).toBeTruthy();
  });
});
