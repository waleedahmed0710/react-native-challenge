"use client"

import type React from "react"
import { useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from "react-native"
import { type RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import type { RootStackParamList, TaskStatus } from "../../types"
import {
  fetchTaskById,
  selectTaskById,
  selectTasksLoading,
  selectTasksError,
  updateTask,
  deleteTask,
} from "../../store/slices/tasksSlice"
import { selectCategoryById } from "../../store/slices/categoriesSlice"
import { TaskStatusBadge } from "@/src/components/tasks/TaskStatusBadge"
import { CategoryPill } from "../../components/ui/CategoryPill"
import { LoadingIndicator } from "../../components/common/LoadingIndicator"
import { ActionButtons } from "@/src/components/ActionButtons"
import type { RootState } from "../../store"
import { LinearGradient } from "expo-linear-gradient"

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, "TaskDetail">

const TaskDetailScreen: React.FC = () => {
  const route = useRoute<TaskDetailScreenRouteProp>()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { taskId } = route.params

  // Selectors
  const task = useSelector((state: RootState) => selectTaskById(state, taskId))
  const category = useSelector((state: RootState) => (task ? selectCategoryById(state, task.categoryId) : null))
  const loading = useSelector(selectTasksLoading)
  const error = useSelector(selectTasksError)

  // Fetch task on mount
  useEffect(() => {
    dispatch(fetchTaskById(taskId))
  }, [dispatch, taskId])

  // Handle status change
  const handleStatusChange = (newStatus: TaskStatus) => {
    dispatch(
      updateTask({
        taskId,
        taskData: { status: newStatus },
      }),
    )
  }

  // Handle edit
  const handleEdit = () => {
    navigation.navigate("TaskForm", { taskId })
  }

  // Handle delete
  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          dispatch(deleteTask(taskId))
          navigation.goBack()
        },
      },
    ])
  }

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return <LoadingIndicator text="Loading task details..." />
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#B00020" />
        <Text style={styles.errorText}>Error loading task</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => dispatch(fetchTaskById(taskId))}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (!task) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#B00020" />
        <Text style={styles.errorText}>Task not found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#6200EE", "#9D4EDD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerBackground}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={styles.metaContainer}>
            {category && <CategoryPill category={category} size="large" />}
            <TaskStatusBadge status={task.status} size="large" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description || "No description provided"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Priority:</Text>
            <View
              style={[
                styles.priorityIndicator,
                {
                  backgroundColor:
                    task.priority === "High" ? "#B00020" : task.priority === "Medium" ? "#FF8800" : "#2E7D32",
                },
              ]}
            />
            <Text style={styles.detailValue}>{task.priority}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Due Date:</Text>
            <Text style={styles.detailValue}>{formatDate(task.dueDate)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Created:</Text>
            <Text style={styles.detailValue}>{formatDate(task.createdAt)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Updated:</Text>
            <Text style={styles.detailValue}>{formatDate(task.updatedAt)}</Text>
          </View>
        </View>

        <ActionButtons
          currentStatus={task.status}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerBackground: {
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
    width: 110,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#B00020",
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#6200EE",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
})

export default TaskDetailScreen

