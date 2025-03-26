import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import { CategoryModalProps } from '@/app/types/category';
import styles from '@/app/styles/categoryModal.styles';

export default function CategoryModal({
  visible,
  onClose,
  categoryName,
  onCategoryNameChange,
  categoryColor,
  onCategoryColorChange,
  onSave,
  editingCategory,
  colorOptions,
}: CategoryModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingCategory ? 'Edit Category' : 'New Category'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            <Text style={styles.inputLabel}>Category Name</Text>
            <TextInput
              style={styles.input}
              value={categoryName}
              onChangeText={onCategoryNameChange}
              placeholder="Enter category name"
            />

            <Text style={styles.inputLabel}>Color</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={colorOptions}
              keyExtractor={(_, index) => `color-${index}`}
              renderItem={({ item: color }) => (
                <TouchableOpacity
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    categoryColor === color && styles.selectedColorOption,
                  ]}
                  onPress={() => onCategoryColorChange(color)}
                />
              )}
              contentContainerStyle={styles.colorOptionsContainer}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={onSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
