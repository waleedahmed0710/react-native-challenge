import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Todo } from '@/types/todo';
import useTodos from './useTodo';
import * as SecureStore from 'expo-secure-store';
import FilterType from '@/app/types/home';
import { USER_DATA_KEY } from '@/services/constants/user';

export default function useHome() {
  const [username, setUsername] = useState('My');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const itemsPerPage = 30;
  const {
    todos,
    deletedTodos,
    isLoading,
    error,
    fetchTodosIfNeeded,
    updateTodoItem,
    deleteTodoItem,
    restoreTodoItem,
    updateLoading,
  } = useTodos();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync(USER_DATA_KEY);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUsername(userData.username || 'My');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const filteredTodos =
    selectedFilter === 'all'
      ? todos || []
      : selectedFilter === 'completed'
        ? (todos || []).filter(todo => todo.completed)
        : deletedTodos || [];

  const totalPages = Math.ceil((filteredTodos || []).length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = (filteredTodos || []).slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  useEffect(() => {
    fetchTodosIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionPress = (todo: Todo) => {
    setSelectedTodo(todo);
    setEditedTitle(todo.title);
    setIsCompleted(todo.completed);
    setIsAddModalVisible(true);
  };

  const handleUpdateTodo = async () => {
    if (!selectedTodo) return;

    try {
      await updateTodoItem(selectedTodo.id, {
        title: editedTitle,
        completed: isCompleted,
      });

      Alert.alert('Update Successful', `Todo #${selectedTodo.id} has been updated.`, [
        { text: 'OK', onPress: () => setIsAddModalVisible(false) },
      ]);
    } catch (error) {
      Alert.alert('Update Failed', 'There was an error updating the todo. Please try again.', [
        { text: 'OK' },
      ]);
    }
  };

  const handleDeleteTodo = () => {
    if (!selectedTodo) return;

    Alert.alert('Confirm Delete', `Are you sure you want to delete Todo #${selectedTodo.id}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTodoItem(selectedTodo.id);
          Alert.alert(
            'Deleted',
            `Todo #${selectedTodo.id} has been moved to deleted items. It will be permanently removed after 24 hours.`,
          );
          setIsAddModalVisible(false);
        },
      },
    ]);
  };

  const handleRestoreTodo = (id: string) => {
    restoreTodoItem(parseInt(id));
    Alert.alert('Restored', `Todo #${id} has been restored to your list.`);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push(-1);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(-1);
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return {
    username,
    isAddModalVisible,
    setIsAddModalVisible,
    selectedTodo,
    editedTitle,
    setEditedTitle,
    isCompleted,
    setIsCompleted,
    currentPage,
    selectedFilter,
    setSelectedFilter,
    itemsPerPage,
    todos,
    deletedTodos,
    isLoading,
    error,
    filteredTodos,
    totalPages,
    startIndex,
    endIndex,
    currentTodos,
    updateLoading,
    handleOptionPress,
    handleUpdateTodo,
    handleDeleteTodo,
    handleRestoreTodo,
    goToNextPage,
    goToPrevPage,
    goToPage,
    getPageNumbers,
  };
}
