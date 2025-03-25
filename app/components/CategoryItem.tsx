import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import { CategoryItemProps } from '@/app/types/category';
import styles from '@/app/styles/categoryItem.styles';

export default function CategoryItem({ category, onEdit, onDelete, onPress }: CategoryItemProps) {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, styles.categoryBorder, { borderLeftColor: category.color }]}
      onPress={() => onPress(category)}
    >
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryCount}>{category.count} tasks</Text>
      </View>
      <View style={styles.categoryActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(category)}>
          <Ionicons name="pencil-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(category.id)}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
