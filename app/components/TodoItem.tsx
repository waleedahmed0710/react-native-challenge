import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import { TodoItemProps } from '@/app/types/category';
import styles from '@/app/styles/todoItem.styles';

export default function TodoItem({ todo, onOptionPress }: TodoItemProps) {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskCheckbox}>
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={todo.completed ? COLORS.primary : COLORS.taskComplete}
        />
      </View>

      <Text style={[styles.taskText, todo.completed && styles.taskTextCompleted]}>
        {todo.title}
      </Text>

      <Text style={styles.todoId}>#{todo.id}</Text>

      <TouchableOpacity style={styles.optionsButton} onPress={() => onOptionPress(todo)}>
        <Ionicons name="ellipsis-vertical" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}
