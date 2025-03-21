export const taskReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_SUCCESS":
        return { ...state, tasks: action.payload, loading: false, error: null };
  
      case "FETCH_ERROR":
        return { ...state, tasks: [], loading: false, error: action.payload };
  
      case "ADD_TASK":
        return { 
          ...state, 
          tasks: [action.payload, ...state.tasks].sort((a, b) => (b.date ? new Date(b.date) - new Date(a.date) : 1)) 
        };
  
      case "EDIT_TASK":
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
        };
  
      case "DELETE_TASK":
        return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };
  
      default:
        return state;
    }
  };
  