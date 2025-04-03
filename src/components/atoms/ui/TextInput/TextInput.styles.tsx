import { createStyleSheet } from "@/theme";

export const styles = createStyleSheet((theme) => ({
  label: {
    marginBottom: 4,
    fontWeight: "600",
    color: theme.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: theme.text,
  },
  inputError: {
    borderColor: theme.danger,
  },
  errorText: {
    marginTop: 4,
    color: theme.danger,
    fontSize: 12,
  },
}));
