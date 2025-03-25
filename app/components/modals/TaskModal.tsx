import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import TaskModalProps from '@/app/types/taskModal';
import styles from '@/app/styles/taskModal.styles';
import useTaskCreation from '@/app/hooks/useTaskCreation';

export default function TaskModal({ isVisible, onClose }: TaskModalProps) {
  const { taskText, setTaskText, handleAddTask } = useTaskCreation(onClose);

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.centeredView}
            >
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add New Task</Text>
                  <TouchableOpacity onPress={onClose}>
                    <Ionicons name="close" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="What do you want to do?"
                  value={taskText}
                  onChangeText={setTaskText}
                  autoFocus
                  multiline
                />

                <TouchableOpacity
                  style={[styles.addButton, !taskText.trim() && styles.disabledButton]}
                  onPress={handleAddTask}
                  disabled={!taskText.trim()}
                >
                  <Text style={styles.addButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
