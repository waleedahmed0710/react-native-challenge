import { useState, useEffect } from 'react';
import useTodos from './useTodo';
import * as SecureStore from 'expo-secure-store';
import FilterType from '@/app/types/home';
import { USER_DATA_KEY } from '@/services/constants/user';
import { ITEMS_PER_PAGE } from '@/app/constants/common';
import getPageNumbers from '@/app/utils/pagination';

export default function useHome() {
  const [username, setUsername] = useState('My');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

  const { todos, deletedTodos } = useTodos();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userDataString = await SecureStore.getItemAsync(USER_DATA_KEY);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUsername(userData.username || 'Guest');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  const filteredTodos =
    selectedFilter === 'all'
      ? todos || []
      : selectedFilter === 'completed'
        ? (todos || []).filter(todo => todo.completed)
        : deletedTodos || [];

  const totalPages = Math.ceil((filteredTodos || []).length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbersList = () => getPageNumbers(currentPage, totalPages);

  return {
    username,
    currentPage,
    selectedFilter,
    setSelectedFilter,
    filteredTodos,
    totalPages,
    startIndex,
    endIndex,
    goToNextPage,
    goToPrevPage,
    goToPage,
    getPageNumbers: getPageNumbersList,
  };
}
