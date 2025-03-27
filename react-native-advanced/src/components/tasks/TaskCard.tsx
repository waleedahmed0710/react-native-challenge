import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Swipeable } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"
import { TaskStatusBadge } from "./TaskStatusBadge"
import { CategoryPill } from "../ui/CategoryPill"
import { type Task, type Category, TaskPriority } from "../../types"

interface TaskCardProps {
  task: Task
  category?: Category
  onStatusChange?: (taskId: string, newStatus: string) => void
  onDelete?: (taskId: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, category, onStatusChange, onDelete }) => {
  const navigation = useNavigation()

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return "#B00020"
      case TaskPriority.MEDIUM:
        return "#FF8800"
      case TaskPriority.LOW:
        return "#2E7D32"
      default:
        return "#757575"
    }
  }

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    })

    return (
      <View style={styles.rightActions}>
        <Animated.View style={{ transform: [{ translateX: trans }] }}>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => onDelete && onDelete(task.id)}
          >
            <Ionicons name="trash-outline" size={22} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions} enabled={!!onDelete}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("TaskDetail", { taskId: task.id })}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {task.title}
          </Text>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
        </View>

        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.metaInfo}>
            {category && <CategoryPill category={category} />}
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={14} color="#888" />
              <Text style={styles.dueDate}>{formatDate(task.dueDate)}</Text>
            </View>
          </View>

          <TaskStatusBadge status={task.status} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    color: "#333",
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dueDate: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
    borderRadius: 12,
  },
  deleteButton: {
    backgroundColor: "#B00020",
  },
})

