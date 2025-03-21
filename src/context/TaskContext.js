import { createContext, useContext, useEffect, useReducer } from "react";
import { taskReducer } from "./TaskReducer";

// Mock API for tasks
const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=10"; 

// Create a Context to store task-related state and actions
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Initial state setup
  const initialState = {
    tasks: [],   
    loading: true,
    error: null 
  };

  // useReducer hook to manage complex state changes with taskReducer
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to load tasks. Please try again.");
        
        let data = await response.json();
        
        // Ensure tasks have a date property
        data = data.map(task => ({ ...task, date: task.date || null }));

        // Sort tasks: Newest first, tasks without a date are auto set to oldest
        data.sort((a, b) => (!a.date ? 1 : !b.date ? -1 : new Date(b.date) - new Date(a.date)));

        //fetched tasks to the reducer
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (task) => {
    try {
        // Assign a unique ID and current timestamp
      const newTask = { id: Date.now(), date: new Date().toISOString(), ...task }; 
       // Update local state
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

  // Edit an existing task
  const editTask = (id, updatedTask) => {
    dispatch({ type: "EDIT_TASK", payload: { id, ...updatedTask } });
  };

  // Delete a task
  const deleteTask = async (id, navigate) => {
    try {
      dispatch({ type: "DELETE_TASK", payload: id }); // Remove task

      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task. Returning to home...");
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });

      // Show error message for 5 seconds, then navigate back to Home
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

// Custom hook to access the Task Context from any component
export const useTasks = () => useContext(TaskContext);
