import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Todo } from '@/types/todo';
import useTodos from './useTodo';

export default function useTodoData() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

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

  const handleModalClose = async () => {
    setIsAddModalVisible(false);

    if (selectedTodo && selectedTodo.completed !== isCompleted) {
      try {
        await updateTodoItem(selectedTodo.id, {
          title: selectedTodo.title,
          completed: isCompleted,
        });
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
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
        },
      },
    ]);
  };

  const handleRestoreTodo = (id: string) => {
    restoreTodoItem(parseInt(id));
    Alert.alert('Restored', `Todo #${id} has been restored to your list.`);
  };

  return {
    isAddModalVisible,
    setIsAddModalVisible,
    selectedTodo,
    editedTitle,
    setEditedTitle,
    isCompleted,
    setIsCompleted,
    todos,
    deletedTodos,
    isLoading,
    error,
    updateLoading,
    handleOptionPress,
    handleUpdateTodo,
    handleDeleteTodo,
    handleRestoreTodo,
    handleModalClose,
  };
}
