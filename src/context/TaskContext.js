import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=10";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Failed to load tasks. Please try again later.");
                }
                let data = await response.json();

                // Ensure each task has a date (if missing, treat as oldest)
                data = data.map((task) => ({
                    ...task,
                    date: task.date || null,
                }));

                // Sort: Newest first, tasks without dates treated as oldest
                data.sort((a, b) => {
                    if (!a.date) return 1;
                    if (!b.date) return -1;
                    return new Date(b.date) - new Date(a.date);
                });

                setTasks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    // Function to add a new task
    const addTask = async (task) => {
        try {
            const newTask = { id: Date.now(), date: new Date().toISOString(), ...task };

            // Optimistically update UI
            setTasks((prevTasks) => [...prevTasks, newTask].sort((a, b) => (b.date ? new Date(b.date) - new Date(a.date) : 1)));

            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(newTask),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to add task. Please try again.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to edit a task
    const editTask = async (id, updatedTask) => {
        try {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
            );

            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                body: JSON.stringify(updatedTask),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to update task. Please try again.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to delete a todo
    const deleteTask = async (id, navigate) => {
        try {
            // Optimistically remove the task from UI
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete task. Returning to home...");
            }
        } catch (err) {
            setError(err.message);

            // Wait 5 seconds, then return to home
            setTimeout(() => {
                setError(null);
                navigate("/");
            }, 5000);
        }
    };


    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, loading, error }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
