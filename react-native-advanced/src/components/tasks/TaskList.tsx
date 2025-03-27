import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Task, Category } from '../../types';
import { TaskCard } from './TaskCard';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { 
  selectFilteredTasks, 
  selectTasksLoading, 
  selectTasksError,
  updateTask,
  deleteTask,
  fetchTasks 
} from '../../store/slices/tasksSlice';
import { selectAllCategories } from '../../store/slices/categoriesSlice';
import { RootState } from '../../store';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface TaskListProps {
  filterBar?: React.ReactNode;
}

export const TaskList: React.FC<TaskListProps> = ({ filterBar }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  // Selectors
  const tasks = useSelector(selectFilteredTasks);
  const categories = useSelector(selectAllCategories);
  const loading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);

  // Handlers
  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks());
    setRefreshing(false);
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    dispatch(updateTask({ taskId, taskData: { status: newStatus as any } }));
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const getCategoryById = (categoryId: string): Category | undefined => {
    return categories[categoryId];
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskCard
      task={item}
      category={getCategoryById(item.categoryId)}
      onStatusChange={handleStatusChange}
      onDelete={handleDeleteTask}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="list-outline" size={64} color="#ccc" />
      <Text style={styles.emptyText}>No tasks found</Text>
      <Text style={styles.emptySubtext}>
        Create a new task or adjust your filters
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return <LoadingIndicator text="Loading tasks..." />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#B00020" />
        <Text style={styles.errorText}>Error loading tasks</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {filterBar}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyList}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm' as never)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Extra space for FAB
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: 300,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B00020',
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#6200EE',
    borderRadius: 4,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200EE',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});