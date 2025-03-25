import React from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/app/constants/colors';
import CategoryItem from '../../components/CategoryItem';
import CategoryModal from '../../components/modals/CategoryModal';
import CategoryTodosModal from '../../components/modals/CategoryTodosModal';
import useCategories from '../../hooks/useCategories';
import styles from '@/app/styles/categories.styles';

export default function Categories() {
  const {
    categories,
    isLoading,
    modalVisible,
    editingCategory,
    categoryName,
    categoryColor,
    categoryTodosModalVisible,
    selectedCategory,
    setCategoryName,
    setCategoryColor,
    handleSaveCategory,
    handleDeleteCategory,
    openAddModal,
    openEditModal,
    closeModal,
    openCategoryTodosModal,
    closeCategoryTodosModal,
    getCategoryTodos,
    toggleTodoCompletion,
    categoryColors,
    randomizeTodoCategories,
  } = useCategories();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Categories</Text>
      </View>

      <Text style={styles.subtitle}>
        Organize your tasks into categories to stay focused and productive
      </Text>

      {categories.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="folder-open-outline" size={64} color={COLORS.gray} />
          <Text style={styles.emptyStateText}>No categories yet</Text>
          <TouchableOpacity style={styles.emptyStateButton} onPress={openAddModal}>
            <Text style={styles.emptyStateButtonText}>Create your first category</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onEdit={openEditModal}
              onDelete={handleDeleteCategory}
              onPress={openCategoryTodosModal}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={[styles.randomizeButton, styles.addCategoryFAB]}
        onPress={randomizeTodoCategories}
      >
        <Ionicons name="shuffle" size={20} color={COLORS.white} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.addCategoryFAB, styles.addRight]} onPress={openAddModal}>
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>

      <CategoryModal
        visible={modalVisible}
        onClose={closeModal}
        categoryName={categoryName}
        onCategoryNameChange={setCategoryName}
        categoryColor={categoryColor}
        onCategoryColorChange={setCategoryColor}
        onSave={handleSaveCategory}
        editingCategory={editingCategory}
        colorOptions={categoryColors}
      />

      <CategoryTodosModal
        visible={categoryTodosModalVisible}
        onClose={closeCategoryTodosModal}
        category={selectedCategory}
        todos={getCategoryTodos()}
        onToggleTodo={toggleTodoCompletion}
      />
    </View>
  );
}
