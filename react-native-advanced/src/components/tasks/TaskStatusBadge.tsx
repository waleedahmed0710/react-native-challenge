import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TaskStatus } from "../../types"

interface TaskStatusBadgeProps {
  status: TaskStatus
  size?: "small" | "medium" | "large"
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status, size = "medium" }) => {
  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "#2196F3" // Blue
      case TaskStatus.IN_PROGRESS:
        return "#FF9800" // Orange
      case TaskStatus.DONE:
        return "#4CAF50" // Green
      default:
        return "#9E9E9E" // Grey
    }
  }

  const getStatusStyles = (size: string) => {
    switch (size) {
      case "small":
        return {
          container: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
          text: { fontSize: 10 },
        }
      case "large":
        return {
          container: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
          text: { fontSize: 14 },
        }
      case "medium":
      default:
        return {
          container: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
          text: { fontSize: 12 },
        }
    }
  }

  const statusColor = getStatusColor(status)
  const sizeStyles = getStatusStyles(size)

  return (
    <View
      style={[
        styles.container,
        sizeStyles.container,
        { backgroundColor: `${statusColor}20` }, // 20% opacity of the status color
        { borderColor: statusColor },
      ]}
    >
      <Text style={[styles.text, sizeStyles.text, { color: statusColor }]}>{status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
  },
  text: {
    fontWeight: "600",
  },
})

