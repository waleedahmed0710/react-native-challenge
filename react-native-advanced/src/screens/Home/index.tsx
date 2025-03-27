"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { TaskList } from "@/src/components/tasks/TaskList"
import { fetchTasks, setTaskFilters, setSortBy } from "../../store/slices/tasksSlice"
import { fetchCategories } from "../../store/slices/categoriesSlice"
import { FilterBar } from "@/src/components/FilterBar"
import { ErrorBoundary } from "../../components/common/ErrorBoundary"
import type { TaskStatus, TaskPriority, TaskSortOption } from "../../types"
import type { RootState } from "../../store"
import { LinearGradient } from "expo-linear-gradient"

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch()

  // Get filters from Redux
  const filters = useSelector((state: RootState) => state.tasks.filters)
  const sortBy = useSelector((state: RootState) => state.tasks.sortBy)

  // Local state for filter UI
  const [statusFilter, setStatusFilter] = useState<TaskStatus | undefined>(filters.status)
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(filters.categoryId)
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | undefined>(filters.priority)
  const [sortOption, setSortOption] = useState<TaskSortOption>(sortBy as TaskSortOption)

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchTasks())
    dispatch(fetchCategories())
  }, [dispatch])

  // Apply filters when they change
  useEffect(() => {
    dispatch(
      setTaskFilters({
        status: statusFilter,
        categoryId: categoryFilter,
        priority: priorityFilter,
      }),
    )
  }, [dispatch, statusFilter, categoryFilter, priorityFilter])

  // Apply sort when it changes
  useEffect(() => {
    dispatch(setSortBy(sortOption))
  }, [dispatch, sortOption])

  const handleClearFilters = () => {
    setStatusFilter(undefined)
    setCategoryFilter(undefined)
    setPriorityFilter(undefined)
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
      <ErrorBoundary>
        <View style={styles.content}>
          <View style={styles.filterBarContainer}>
            <FilterBar
              statusFilter={statusFilter}
              categoryFilter={categoryFilter}
              priorityFilter={priorityFilter}
              sortOption={sortOption}
              onChangeStatus={setStatusFilter}
              onChangeCategory={setCategoryFilter}
              onChangePriority={setPriorityFilter}
              onChangeSort={setSortOption}
              onClearFilters={handleClearFilters}
            />
          </View>
          <TaskList />
        </View>
      </ErrorBoundary>
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
  content: {
    flex: 1,
    paddingTop: 50, // Add padding to account for the header height
  },
  filterBarContainer: {
    zIndex: 5, // Lower than header but still above other content if needed
  },
})

export default HomeScreen

