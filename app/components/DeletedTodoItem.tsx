import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import { DeletedTodoItemProps } from '@/app/types/category';
import styles from '@/app/styles/deletedTodoItem.styles';

export default function DeletedTodoItem({ todo, onRestore }: DeletedTodoItemProps) {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskCheckbox}>
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={COLORS.gray}
        />
      </View>

      <Text style={[styles.taskText, styles.deletedTaskText]}>{todo.title}</Text>

      <Text style={styles.todoId}>#{todo.id}</Text>

      <TouchableOpacity style={styles.optionsButton} onPress={() => onRestore(todo.id.toString())}>
        <Ionicons name="refresh" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}
