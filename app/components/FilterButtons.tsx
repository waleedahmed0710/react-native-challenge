import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FilterButtonsProps } from '@/app/types/components';
import styles from '@/app/styles/filterButtons.styles';

export default function FilterButtons({
  selectedFilter,
  onFilterChange,
  totalTodos,
  completedTodos,
  deletedTodos,
}: FilterButtonsProps) {
  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'all' && styles.activeFilterButton]}
        onPress={() => onFilterChange('all')}
      >
        <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>
          All ({totalTodos})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'completed' && styles.activeFilterButton]}
        onPress={() => onFilterChange('completed')}
      >
        <Text
          style={[styles.filterText, selectedFilter === 'completed' && styles.activeFilterText]}
        >
          Completed ({completedTodos})
        </Text>
      </TouchableOpacity>

      {deletedTodos > 0 && (
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'deleted' && styles.activeFilterButton]}
          onPress={() => onFilterChange('deleted')}
        >
          <Text
            style={[styles.filterText, selectedFilter === 'deleted' && styles.activeFilterText]}
          >
            Deleted ({deletedTodos})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
