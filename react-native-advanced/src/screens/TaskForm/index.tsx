"use client"

import type React from "react"
import { useEffect } from "react"
import { StyleSheet, SafeAreaView, Alert, StatusBar } from "react-native"
import { type RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import type { RootStackParamList, TaskFormData } from "../../types"
import { TaskForm } from "@/src/components/tasks/TaskForm"
import { LoadingIndicator } from "../../components/common/LoadingIndicator"
import {
  selectTaskById,
  selectTasksLoading,
  createTask,
  updateTask,
  fetchTaskById,
} from "../../store/slices/tasksSlice"
import { fetchCategories } from "../../store/slices/categoriesSlice"
import type { RootState } from "../../store"
import type { AppDispatch } from "../../store"
import { LinearGradient } from "expo-linear-gradient"

type TaskFormScreenRouteProp = RouteProp<RootStackParamList, "TaskForm">

const TaskFormScreen: React.FC = () => {
  const route = useRoute<TaskFormScreenRouteProp>()
  const navigation = useNavigation()
  const dispatch = useDispatch<AppDispatch>()

  const { taskId } = route.params || {}

  const task = useSelector((state: RootState) => (taskId ? selectTaskById(state, taskId) : null))
  const loading = useSelector(selectTasksLoading)

  useEffect(() => {
    // Fetch categories and task data if needed
    const loadData = async () => {
      try {
        await dispatch(fetchCategories())

        if (taskId) {
          await dispatch(fetchTaskById(taskId))
        }
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [dispatch, taskId])

  const handleSubmit = async (formData: TaskFormData) => {
    try {
      console.log("Submitting task form with data:", formData)

      if (taskId && task) {
        console.log("Updating existing task:", taskId)
        const result = await dispatch(updateTask({ taskId, taskData: formData })).unwrap()
        console.log("Task updated successfully")
      } else {
        console.log("Creating new task")
        const result = await dispatch(createTask(formData)).unwrap()
        console.log("Task created successfully:", result)
      }

      // Only navigate back on success
      navigation.goBack()
    } catch (error) {
      console.error("Error saving task:", error)
      Alert.alert("Error", "Failed to save task. Please try again.")
    }
  }

  const handleCancel = () => {
    navigation.goBack()
  }

  if (loading && taskId) {
    return <LoadingIndicator text="Loading task data..." />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#6200EE", "#9D4EDD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      />
      <TaskForm initialData={task || undefined} onSubmit={handleSubmit} onCancel={handleCancel} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
})

export default TaskFormScreen

