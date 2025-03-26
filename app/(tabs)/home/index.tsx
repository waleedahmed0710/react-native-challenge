import React from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import COLORS from '@/app/constants/colors';
import useHome from '@/app/hooks/useHome';
import TodoItem from '../../components/TodoItem';
import DeletedTodoItem from '../../components/DeletedTodoItem';
import TodoModal from '@/app/components/modals/TodoModal';
import Pagination from '../../components/Pagination';
import FilterButtons from '../../components/FilterButtons';
import { DeletedTodo } from '@/services/types/todo';
import styles from '@/app/styles/home.styles';
import useTodoData from '@/app/hooks/useTodoData';

export default function Home() {
  const {
    username,
    currentPage,
    filteredTodos,
    totalPages,
    startIndex,
    endIndex,
    selectedFilter,
    setSelectedFilter,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = useHome();

  const {
    isAddModalVisible,
    editedTitle,
    setEditedTitle,
    isCompleted,
    setIsCompleted,
    todos,
    deletedTodos,
    isLoading,
    error,
    updateLoading,
    handleOptionPress,
    handleUpdateTodo,
    handleDeleteTodo,
    handleRestoreTodo,
    handleModalClose,
  } = useTodoData();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Text style={styles.welcomeText}>{username}&apos;s List</Text>
          <Text style={styles.subtitle}>
            {selectedFilter === 'all'
              ? 'All todos'
              : selectedFilter === 'completed'
                ? 'Completed todos'
                : 'Deleted todos'}{' '}
            &bull; Page {currentPage} of {totalPages}
          </Text>
        </View>

        <FilterButtons
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          totalTodos={todos?.length || 0}
          completedTodos={todos?.filter(t => t.completed).length || 0}
          deletedTodos={deletedTodos?.length || 0}
        />

        <View style={styles.listContainer}>
          {filteredTodos && filteredTodos.length > 0 ? (
            <FlatList
              data={filteredTodos.slice(startIndex, endIndex)}
              renderItem={({ item }) => {
                if (selectedFilter === 'deleted' && 'deletedAt' in item) {
                  return (
                    <DeletedTodoItem todo={item as DeletedTodo} onRestore={handleRestoreTodo} />
                  );
                } else {
                  return <TodoItem todo={item} onOptionPress={handleOptionPress} />;
                }
              }}
              keyExtractor={item => item.id.toString()}
              style={styles.taskList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {selectedFilter === 'deleted' ? 'No recently deleted todos' : 'No todos found'}
              </Text>
            </View>
          )}
        </View>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredTodos.length}
            onNextPage={goToNextPage}
            onPrevPage={goToPrevPage}
            onPageChange={goToPage}
          />
        )}
      </View>

      <TodoModal
        visible={isAddModalVisible}
        onClose={handleModalClose}
        title={editedTitle}
        onTitleChange={setEditedTitle}
        isCompleted={isCompleted}
        onCompletedChange={setIsCompleted}
        onUpdate={handleUpdateTodo}
        onDelete={handleDeleteTodo}
        updateLoading={updateLoading}
      />
    </KeyboardAvoidingView>
  );
}
