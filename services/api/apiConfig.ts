import { Todo } from '../../types/todo';

const fetchApiUrl = process.env.EXPO_PUBLIC_FETCH_API_URL as string;

export const fetchTodosAPI = async () => {
  if (!fetchApiUrl) {
    throw new Error('FETCH_API_URL is not defined');
  }
  const response = await fetch(fetchApiUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  const data = await response.json();
  return data as Todo[];
};

export const createTodoAPI = async (todo: Omit<Todo, 'id'>) => {
  const response = await fetch(fetchApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }

  const data = await response.json();
  return data as Todo;
};

export const updateTodoAPI = async (todo: Todo) => {
  const response = await fetch(`${fetchApiUrl}/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  const data = await response.json();
  return data as Todo;
};

export const deleteTodoAPI = async (todoId: number) => {
  const response = await fetch(`${fetchApiUrl}/${todoId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo from server');
  }

  return todoId;
};
