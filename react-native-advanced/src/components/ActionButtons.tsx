import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { TaskStatus } from "../types"
import { Ionicons } from "@expo/vector-icons"

interface ActionButtonsProps {
  currentStatus: TaskStatus
  onStatusChange: (status: TaskStatus) => void
  onEdit: () => void
  onDelete: () => void
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ currentStatus, onStatusChange, onEdit, onDelete }) => {
  // Helper to get available status transitions
  const getAvailableStatusChanges = (currentStatus: TaskStatus): TaskStatus[] => {
    switch (currentStatus) {
      case TaskStatus.TODO:
        return [TaskStatus.IN_PROGRESS]
      case TaskStatus.IN_PROGRESS:
        return [TaskStatus.TODO, TaskStatus.DONE]
      case TaskStatus.DONE:
        return [TaskStatus.IN_PROGRESS]
      default:
        return []
    }
  }

  // Get style for status button
  const getStatusButtonStyle = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return styles.todoButton
      case TaskStatus.IN_PROGRESS:
        return styles.inProgressButton
      case TaskStatus.DONE:
        return styles.doneButton
      default:
        return {}
    }
  }

  // Get text color for status button
  const getStatusTextColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return styles.todoText
      case TaskStatus.IN_PROGRESS:
        return styles.inProgressText
      case TaskStatus.DONE:
        return styles.doneText
      default:
        return {}
    }
  }

  // Get icon for status button
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO:
        return "list-outline"
      case TaskStatus.IN_PROGRESS:
        return "time-outline"
      case TaskStatus.DONE:
        return "checkmark-done-outline"
      default:
        return "help-outline"
    }
  }

  const availableStatusChanges = getAvailableStatusChanges(currentStatus)

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Status</Text>
        <View style={styles.statusButtons}>
          {availableStatusChanges.map((status) => (
            <TouchableOpacity
              key={status}
              style={[styles.statusButton, getStatusButtonStyle(status)]}
              onPress={() => onStatusChange(status)}
            >
              <Ionicons
                name={getStatusIcon(status)}
                size={20}
                color={
                  status === TaskStatus.TODO ? "#2196F3" : status === TaskStatus.IN_PROGRESS ? "#FF9800" : "#4CAF50"
                }
              />
              <Text style={[styles.statusText, getStatusTextColor(status)]}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Ionicons name="create-outline" size={20} color="white" />
            <Text style={styles.editButtonText}>Edit Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={20} color="white" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 12,
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
    marginBottom: 16,
  },
  statusButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
  },
  todoButton: {
    borderColor: "#2196F3",
    backgroundColor: "rgba(33, 150, 243, 0.1)",
  },
  inProgressButton: {
    borderColor: "#FF9800",
    backgroundColor: "rgba(255, 152, 0, 0.1)",
  },
  doneButton: {
    borderColor: "#4CAF50",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  statusText: {
    fontWeight: "500",
    marginLeft: 8,
  },
  todoText: {
    color: "#2196F3",
  },
  inProgressText: {
    color: "#FF9800",
  },
  doneText: {
    color: "#4CAF50",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200EE",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 2,
  },
  editButtonText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B00020",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 8,
  },
})

