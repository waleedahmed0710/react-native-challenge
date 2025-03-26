import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import { CategoryTodosModalProps } from '@/app/types/category';
import styles from '@/app/styles/categoryTodosModal.styles';

export default function CategoryTodosModal({
  visible,
  onClose,
  category,
  todos,
  onToggleTodo,
}: CategoryTodosModalProps) {
  const renderTodoItem = ({
    item,
  }: {
    item: { id: number; title: string; completed: boolean };
  }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoCheckbox}
        onPress={() => onToggleTodo(item.id, item.completed)}
      >
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.completed ? COLORS.primary : COLORS.taskComplete}
        />
      </TouchableOpacity>
      <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <View style={styles.categoryHeaderInfo}>
              <View
                style={[
                  styles.categoryColorDot,
                  {
                    backgroundColor: category?.color || COLORS.primary,
                  },
                ]}
              />
              <Text style={styles.modalTitle}>{category?.name || 'Category'}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {todos.length > 0 ? (
              <FlatList
                data={todos}
                renderItem={renderTodoItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.todoList}
              />
            ) : (
              <View style={styles.emptyTodosState}>
                <Ionicons name="document-text-outline" size={48} color={COLORS.gray} />
                <Text style={styles.emptyTodosText}>No tasks in this category</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
