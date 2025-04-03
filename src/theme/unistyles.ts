import { UnistylesRegistry } from "react-native-unistyles";

import { breakpoints } from "./breakpoints";
import { lightTheme } from "@/theme";

type AppBreakpoints = typeof breakpoints;

type AppThemes = {
  light: typeof lightTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: {
      colors: {
        typography: "#000000",
        background: "#ffffff",
        primary: "#2f80ed",
        secondary: "#56ccf2",
        border: "#e0e0e0",
        danger: "#eb5757",
        success: "#27ae60",
        muted: "#9e9e9e",
      },
      margins: {
        sm: 2,
        md: 4,
        lg: 8,
        xl: 12,
      },
    },
  })
  .addConfig({
    adaptiveThemes: true,
  });
