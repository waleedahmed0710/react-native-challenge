"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Animated, Dimensions } from "react-native"
import { useSelector } from "react-redux"
import { Ionicons } from "@expo/vector-icons"
import { TaskStatus, TaskPriority, TaskSortOption } from "../types"
import { selectCategoriesAsArray } from "../store/slices/categoriesSlice"
import { CategoryPill } from "./ui/CategoryPill"

interface FilterBarProps {
  statusFilter?: TaskStatus
  categoryFilter?: string
  priorityFilter?: TaskPriority
  sortOption: TaskSortOption
  onChangeStatus: (status?: TaskStatus) => void
  onChangeCategory: (categoryId?: string) => void
  onChangePriority: (priority?: TaskPriority) => void
  onChangeSort: (sortBy: TaskSortOption) => void
  onClearFilters: () => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  categoryFilter,
  priorityFilter,
  sortOption,
  onChangeStatus,
  onChangeCategory,
  onChangePriority,
  onChangeSort,
  onClearFilters,
}) => {
  const categories = useSelector(selectCategoriesAsArray)

  // Modal visibility states
  const [filtersModalVisible, setFiltersModalVisible] = useState(false)
  const [sortModalVisible, setSortModalVisible] = useState(false)
  const [modalAnimation] = useState(new Animated.Value(0))
  const { height } = Dimensions.get("window")

  // Active filter count
  const activeFilterCount = [statusFilter, categoryFilter, priorityFilter].filter(Boolean).length

  // Get category name by ID
  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return ""
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : ""
  }

  // Get sort option display name
  const getSortDisplayName = (option: TaskSortOption) => {
    switch (option) {
      case TaskSortOption.DUE_DATE:
        return "Due Date"
      case TaskSortOption.CREATED_AT:
        return "Created Date"
      case TaskSortOption.PRIORITY:
        return "Priority"
      default:
        return "Default"
    }
  }

  // Animation for modal
  const showModal = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    setVisible(true)
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const hideModal = (setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false)
    })
  }

  // Render filters modal
  const renderFiltersModal = () => (
    <Modal
      transparent
      animationType="none"
      visible={filtersModalVisible}
      onRequestClose={() => hideModal(setFiltersModalVisible)}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [
                {
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Tasks</Text>
            <TouchableOpacity onPress={() => hideModal(setFiltersModalVisible)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Status filter section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Status</Text>
            <View style={styles.filterOptions}>
              {Object.values(TaskStatus).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.filterOption, statusFilter === status && styles.activeFilterOption]}
                  onPress={() => {
                    onChangeStatus(statusFilter === status ? undefined : status)
                  }}
                >
                  <Text style={[styles.filterOptionText, statusFilter === status && styles.activeFilterOptionText]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category filter section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryOptions}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.filterOption, categoryFilter === category.id && styles.activeFilterOption]}
                  onPress={() => {
                    onChangeCategory(categoryFilter === category.id ? undefined : category.id)
                  }}
                >
                  <CategoryPill category={category} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Priority filter section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Priority</Text>
            <View style={styles.filterOptions}>
              {Object.values(TaskPriority).map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[styles.filterOption, priorityFilter === priority && styles.activeFilterOption]}
                  onPress={() => {
                    onChangePriority(priorityFilter === priority ? undefined : priority)
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
                  <Text style={[styles.filterOptionText, priorityFilter === priority && styles.activeFilterOptionText]}>
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                onClearFilters()
                hideModal(setFiltersModalVisible)
              }}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={() => hideModal(setFiltersModalVisible)}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )

  // Render sort modal
  const renderSortModal = () => (
    <Modal
      transparent
      animationType="none"
      visible={sortModalVisible}
      onRequestClose={() => hideModal(setSortModalVisible)}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            styles.sortModalContent,
            {
              transform: [
                {
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={() => hideModal(setSortModalVisible)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {Object.values(TaskSortOption).map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.sortOption, sortOption === option && styles.activeSortOption]}
              onPress={() => {
                onChangeSort(option)
                hideModal(setSortModalVisible)
              }}
            >
              <Text style={[styles.sortOptionText, sortOption === option && styles.activeSortOptionText]}>
                {getSortDisplayName(option)}
              </Text>
              {sortOption === option && <Ionicons name="checkmark" size={20} color="#6200EE" />}
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </Modal>
  )

  return (
    <View style={styles.container}>
      {/* Filter button */}
      <TouchableOpacity style={styles.filterButton} onPress={() => showModal(setFiltersModalVisible)}>
        <Ionicons name="filter" size={18} color={activeFilterCount > 0 ? "#6200EE" : "#666"} />
        <Text style={[styles.buttonText, activeFilterCount > 0 && styles.activeButtonText]}>
          Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </Text>
      </TouchableOpacity>

      {/* Sort button */}
      <TouchableOpacity style={styles.sortButton} onPress={() => showModal(setSortModalVisible)}>
        <Ionicons name="swap-vertical" size={18} color="#666" />
        <Text style={styles.buttonText}>{getSortDisplayName(sortOption)}</Text>
      </TouchableOpacity>

      {renderFiltersModal()}
      {renderSortModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    flex: 1,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
    flex: 1,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  activeButtonText: {
    color: "#6200EE",
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 32,
    maxHeight: "80%",
  },
  sortModalContent: {
    maxHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  filterSection: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    color: "#333",
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryOptions: {
    paddingBottom: 12,
    gap: 8,
  },
  filterOption: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  activeFilterOption: {
    backgroundColor: "#EDE7F6",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#666",
  },
  activeFilterOptionText: {
    color: "#6200EE",
    fontWeight: "500",
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    gap: 12,
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#6200EE",
    flex: 1,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#6200EE",
    fontWeight: "500",
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#6200EE",
    flex: 1,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "500",
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeSortOption: {
    backgroundColor: "#F3F0FF",
  },
  sortOptionText: {
    fontSize: 16,
    color: "#333",
  },
  activeSortOptionText: {
    color: "#6200EE",
    fontWeight: "500",
  },
})

