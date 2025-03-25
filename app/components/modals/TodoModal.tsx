import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import TodoModalProps from '@/app/types/modals';
import styles from '@/app/styles/todoModal.styles';

export default function TodoModal({
  visible,
  onClose,
  title,
  onTitleChange,
  isCompleted,
  onCompletedChange,
  onUpdate,
  onDelete,
  updateLoading,
}: TodoModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Todo Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={onTitleChange}
              placeholder="Todo title"
            />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => onCompletedChange(!isCompleted)}
              >
                <Ionicons
                  name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
                  size={24}
                  color={isCompleted ? COLORS.primary : COLORS.taskComplete}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Completed</Text>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  styles.updateButton,
                  updateLoading && styles.disabledButton,
                ]}
                onPress={onUpdate}
                disabled={updateLoading}
              >
                <Text style={styles.actionButtonText}>
                  {updateLoading ? 'Updating...' : 'Update'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteActionButton]}
                onPress={onDelete}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
