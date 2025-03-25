import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { Category, TodoCategory } from '@/app/types/category';
import useTodos from '@/app/hooks/useTodo';
import CATEGORIES from '@/app/constants/category';
import COLORS from '@/app/constants/colors';

export default function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState(COLORS.categoryBlue);
  const [todoCategoryMap, setTodoCategoryMap] = useState<TodoCategory[]>([]);
  const [categoryTodosModalVisible, setCategoryTodosModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { todos, updateTodoItem } = useTodos();

  useEffect(() => {
    loadCategories();
    loadTodoCategoryMap();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && todos && todoCategoryMap.length > 0) {
      const updatedCategories = updateCategoryCountsWithoutStateUpdate();
      if (JSON.stringify(updatedCategories) !== JSON.stringify(categories)) {
        setCategories(updatedCategories);
        saveCategories(updatedCategories);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, todoCategoryMap]);

  const loadCategories = async () => {
    try {
      const categoriesString = await SecureStore.getItemAsync(CATEGORIES.CATEGORIES_KEY);

      if (categoriesString) {
        setCategories(JSON.parse(categoriesString));
      } else {
        setCategories(CATEGORIES.DEFAULT_CATEGORIES);
        await SecureStore.setItemAsync(
          CATEGORIES.CATEGORIES_KEY,
          JSON.stringify(CATEGORIES.DEFAULT_CATEGORIES),
        );
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories(CATEGORIES.DEFAULT_CATEGORIES);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTodoCategoryMap = async () => {
    try {
      const mapString = await SecureStore.getItemAsync(CATEGORIES.TODO_CATEGORY_KEY);
      if (mapString) {
        setTodoCategoryMap(JSON.parse(mapString));
      }
    } catch (error) {
      console.error('Error loading todo category mappings:', error);
    }
  };

  const saveCategories = async (updatedCategories: Category[]) => {
    try {
      await SecureStore.setItemAsync(CATEGORIES.CATEGORIES_KEY, JSON.stringify(updatedCategories));
    } catch (error) {
      console.error('Error saving categories:', error);
      Alert.alert('Error', 'Failed to save categories. Please try again.');
    }
  };

  const saveTodoCategoryMap = async (map: TodoCategory[]) => {
    try {
      await SecureStore.setItemAsync(CATEGORIES.TODO_CATEGORY_KEY, JSON.stringify(map));
    } catch (error) {
      console.error('Error saving todo category mappings:', error);
    }
  };

  const updateCategoryCountsWithoutStateUpdate = () => {
    const counts: { [key: string]: number } = {};

    categories.forEach(cat => {
      counts[cat.id] = 0;
    });

    todoCategoryMap.forEach(mapping => {
      if (counts[mapping.categoryId] !== undefined) {
        counts[mapping.categoryId]++;
      }
    });

    return categories.map(cat => ({
      ...cat,
      count: counts[cat.id] || 0,
    }));
  };

  const handleSaveCategory = () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'Category name cannot be empty');
      return;
    }

    let updatedCategories = [...categories];

    if (editingCategory) {
      updatedCategories = updatedCategories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, name: categoryName, color: categoryColor } : cat,
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryName,
        color: categoryColor,
        count: 0,
      };
      updatedCategories = [...updatedCategories, newCategory];
    }

    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    closeModal();
  };

  const handleDeleteCategory = (categoryId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this category? Any tasks in this category will become uncategorized.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedCategories = categories.filter(cat => cat.id !== categoryId);
            setCategories(updatedCategories);
            await saveCategories(updatedCategories);

            const updatedMap = todoCategoryMap.filter(map => map.categoryId !== categoryId);
            setTodoCategoryMap(updatedMap);
            await saveTodoCategoryMap(updatedMap);
          },
        },
      ],
    );
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryColor(COLORS.categoryBlue);
    setModalVisible(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryColor(category.color);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
    setCategoryName('');
  };

  const openCategoryTodosModal = (category: Category) => {
    setSelectedCategory(category);
    setCategoryTodosModalVisible(true);
  };

  const closeCategoryTodosModal = () => {
    setCategoryTodosModalVisible(false);
    setSelectedCategory(null);
  };

  const getCategoryTodos = () => {
    if (!selectedCategory || !todos) return [];
    return todos.filter(todo =>
      todoCategoryMap.some(
        mapping => mapping.todoId === todo.id && mapping.categoryId === selectedCategory.id,
      ),
    );
  };

  const toggleTodoCompletion = async (todoId: number, currentCompleted: boolean) => {
    if (!updateTodoItem) return;
    await updateTodoItem(todoId, { completed: !currentCompleted });
  };

  const categoryColors = [
    COLORS.categoryBlue,
    COLORS.categoryRed,
    COLORS.categoryYellow,
    COLORS.categoryGreen,
    COLORS.categoryPurple,
    COLORS.categoryOrange,
    COLORS.categoryTeal,
    COLORS.categoryBrightRed,
    COLORS.categoryLavender,
    COLORS.categorySkyBlue,
  ];

  const randomizeTodoCategories = async () => {
    if (!todos || todos.length === 0 || categories.length === 0) {
      Alert.alert('Error', 'No todos or categories available to randomize');
      return;
    }

    const newTodoCategoryMap: TodoCategory[] = todos.map(todo => {
      const randomCategoryIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomCategoryIndex];

      return {
        todoId: todo.id,
        categoryId: randomCategory.id,
      };
    });

    // setTodoCategoryMap(newTodoCategoryMap);
    await saveTodoCategoryMap(newTodoCategoryMap);

    const updatedCategories = updateCategoryCountsWithoutStateUpdate();
    setCategories(updatedCategories);
    await saveCategories(updatedCategories);

    Alert.alert('Success', 'Todos have been randomly assigned to categories!');
  };

  return {
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
  };
}
