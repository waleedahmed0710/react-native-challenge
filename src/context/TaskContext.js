import { createContext, useContext, useEffect, useReducer } from "react";
import { taskReducer } from "./TaskReducer";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=10";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const initialState = {
    tasks: [],
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load tasks. Please try again.");
        
        let data = await response.json();
        data = data.map(task => ({ ...task, date: task.date || null }));
        data.sort((a, b) => (!a.date ? 1 : !b.date ? -1 : new Date(b.date) - new Date(a.date)));

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const newTask = { id: Date.now(), date: new Date().toISOString(), ...task };
      dispatch({ type: "ADD_TASK", payload: newTask });

      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const editTask = (id, updatedTask) => {
    dispatch({ type: "EDIT_TASK", payload: { id, ...updatedTask } });
  };

  const deleteTask = async (id, navigate) => {
    try {
      dispatch({ type: "DELETE_TASK", payload: id });

      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task. Returning to home...");
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });

      setTimeout(() => {
        dispatch({ type: "FETCH_ERROR", payload: null });
        navigate("/");
      }, 5000);
    }
  };

  return (
    <TaskContext.Provider value={{ ...state, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
