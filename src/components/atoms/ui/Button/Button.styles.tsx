import { createStyleSheet } from "@/theme";

export const styles = createStyleSheet((theme) => ({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
  fullWidth: {
    width: "100%",
  },
}));
