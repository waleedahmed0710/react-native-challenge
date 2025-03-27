"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native"
import { useSelector, useDispatch } from "react-redux"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Ionicons } from "@expo/vector-icons"

import { type TaskFormData, TaskStatus, TaskPriority, type Task } from "../../types"
import { selectCategoriesAsArray } from "../../store/slices/categoriesSlice"
import { CategoryPill } from "../ui/CategoryPill"

interface TaskFormProps {
  initialData?: Task
  onSubmit: (formData: TaskFormData) => void
  onCancel: () => void
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategoriesAsArray)
  const [fadeAnim] = useState(new Animated.Value(0))

  // Form state
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    status: initialData?.status || TaskStatus.TODO,
    priority: initialData?.priority || TaskPriority.MEDIUM,
    dueDate: initialData?.dueDate || undefined,
  })

  // Date picker state
  const [showDatePicker, setShowDatePicker] = useState(false)

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Modal states
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)
  const [statusModalVisible, setStatusModalVisible] = useState(false)
  const [priorityModalVisible, setPriorityModalVisible] = useState(false)

  // Animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  // Handle text input changes
  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is edited
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Handle date change
  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false)
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        dueDate: selectedDate.toISOString(),
      }))
    }
  }

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData)
    } else {
      Alert.alert("Validation Error", "Please fix the errors in the form")
    }
  }

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Render category selection modal
  const renderCategoryModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={categoryModalVisible}
      onRequestClose={() => setCategoryModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setCategoryModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <ScrollView>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[styles.modalOption, formData.categoryId === category.id && styles.selectedOption]}
                    onPress={() => {
                      handleChange("categoryId", category.id)
                      setCategoryModalVisible(false)
                    }}
                  >
                    <CategoryPill category={category} />
                    <Text style={styles.modalOptionText}>{category.name}</Text>
                    {formData.categoryId === category.id && <Ionicons name="checkmark" size={20} color="#6200EE" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCategoryModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )

  // Render status selection modal
  const renderStatusModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={statusModalVisible}
      onRequestClose={() => setStatusModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setStatusModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Status</Text>
              {Object.values(TaskStatus).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.modalOption, formData.status === status && styles.selectedOption]}
                  onPress={() => {
                    handleChange("status", status)
                    setStatusModalVisible(false)
                  }}
                >
                  <Text style={styles.modalOptionText}>{status}</Text>
                  {formData.status === status && <Ionicons name="checkmark" size={20} color="#6200EE" />}
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setStatusModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )

  // Render priority selection modal
  const renderPriorityModal = () => (
    <Modal
      transparent
      animationType="fade"
      visible={priorityModalVisible}
      onRequestClose={() => setPriorityModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setPriorityModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Priority</Text>
              {Object.values(TaskPriority).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[styles.modalOption, formData.priority === priority && styles.selectedOption]}
                  onPress={() => {
                    handleChange("priority", priority)
                    setPriorityModalVisible(false)
                  }}
                >
                  <View
                    style={[
                      styles.priorityDot,
                      {
                        backgroundColor:
                          priority === TaskPriority.HIGH
                            ? "#B00020"
                            : priority === TaskPriority.MEDIUM
                              ? "#FF8800"
                              : "#2E7D32",
                      },
                    ]}
                  />
                  <Text style={styles.modalOptionText}>{priority}</Text>
                  {formData.priority === priority && <Ionicons name="checkmark" size={20} color="#6200EE" />}
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setPriorityModalVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.formGroup}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={[styles.input, errors.title && styles.inputError]}
          value={formData.title}
          onChangeText={(text) => handleChange("title", text)}
          placeholder="Enter task title"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Enter task description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category *</Text>
        <TouchableOpacity
          style={[styles.input, styles.pickerContainer, errors.categoryId && styles.inputError]}
          onPress={() => setCategoryModalVisible(true)}
        >
          {formData.categoryId ? (
            <View style={styles.selectedValue}>
              {categories.find((c) => c.id === formData.categoryId) && (
                <CategoryPill category={categories.find((c) => c.id === formData.categoryId)!} />
              )}
              <Text style={styles.selectedText}>
                {categories.find((c) => c.id === formData.categoryId)?.name || "Select category"}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>Select category</Text>
          )}
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
        {errors.categoryId && <Text style={styles.errorText}>{errors.categoryId}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Status</Text>
        <TouchableOpacity style={[styles.input, styles.pickerContainer]} onPress={() => setStatusModalVisible(true)}>
          <Text style={styles.selectedText}>{formData.status}</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority</Text>
        <TouchableOpacity style={[styles.input, styles.pickerContainer]} onPress={() => setPriorityModalVisible(true)}>
          <View style={styles.selectedValue}>
            <View
              style={[
                styles.priorityDot,
                {
                  backgroundColor:
                    formData.priority === TaskPriority.HIGH
                      ? "#B00020"
                      : formData.priority === TaskPriority.MEDIUM
                        ? "#FF8800"
                        : "#2E7D32",
                },
              ]}
            />
            <Text style={styles.selectedText}>{formData.priority}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity style={[styles.input, styles.pickerContainer]} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.selectedText}>{formData.dueDate ? formatDate(formData.dueDate) : "No due date"}</Text>
          <Ionicons name="calendar-outline" size={20} color="#666" />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={formData.dueDate ? new Date(formData.dueDate) : new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{initialData ? "Update Task" : "Create Task"}</Text>
        </TouchableOpacity>
      </View>

      {renderCategoryModal()}
      {renderStatusModal()}
      {renderPriorityModal()}
    </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 16,
    paddingTop: 60,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  inputError: {
    borderColor: "#B00020",
  },
  errorText: {
    color: "#B00020",
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 40,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#6200EE",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6200EE",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButton: {
    flex: 2,
    backgroundColor: "#6200EE",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "80%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedOption: {
    backgroundColor: "#f0e6ff",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginLeft: 8,
  },
  modalCloseButton: {
    marginTop: 16,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#6200EE",
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "500",
  },
})

