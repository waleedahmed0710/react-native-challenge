import { TodoState } from '../types/todo';

export const initialState: TodoState = {
  items: [],
  deletedItems: [],
  loading: false,
  error: null,
  initialized: false,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  createLoading: false,
  createError: null,
  operation: {
    type: null,
    loading: false,
    error: null,
  },
};
