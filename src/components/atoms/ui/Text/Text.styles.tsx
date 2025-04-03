import { createStyleSheet } from "@/theme";

export const styles = createStyleSheet((theme) => ({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.text,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.text,
  },
  body: {
    fontSize: 14,
    color: theme.text,
  },
  caption: {
    fontSize: 12,
    color: theme.muted,
  },
}));
