import { useState } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch } from '@/services/storage/redux/hooks';
import { createTodo } from '@/services/storage/redux/slices/todoSlice';

export default function useTaskCreation(onClose: () => void) {
  const [taskText, setTaskText] = useState('');
  const dispatch = useAppDispatch();

  const handleAddTask = async () => {
    if (taskText.trim() === '') {
      return;
    }

    try {
      await dispatch(
        createTodo({
          userId: 1,
          title: taskText,
          completed: false,
        }),
      ).unwrap();

      Alert.alert('Success', 'Task added successfully!');
      setTaskText('');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to add task. Please try again.');
    }
  };

  return {
    taskText,
    setTaskText,
    handleAddTask,
  };
}
