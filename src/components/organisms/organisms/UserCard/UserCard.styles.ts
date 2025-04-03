import { createStyleSheet } from "@/theme";

export const styles = createStyleSheet(() => ({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    gap: 8,
  },
}));
