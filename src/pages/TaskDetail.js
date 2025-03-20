import { Box, Button, Heading, Input, Textarea, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, editTask } = useTasks();

  const isEditing = id !== "new";
  const existingTask = tasks.find((task) => task.id === parseInt(id)) || { title: "", description: "" };

  const [task, setTask] = useState(existingTask);

  useEffect(() => {
    if (isEditing) {
      setTask(existingTask);
    }
  }, [id, tasks]);

  const handleSubmit = () => {
    if (isEditing) {
      editTask(parseInt(id), task);
    } else {
      addTask(task);
    }
    navigate("/");
  };

  return (
    <Box p={5}>
      <Heading>{isEditing ? "Edit Task" : "New Task"}</Heading>
      <VStack spacing={4} mt={5}>
        <Input
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <Button colorScheme="blue" onClick={handleSubmit}>
          {isEditing ? "Update Task" : "Create Task"}
        </Button>
        <Button variant="ghost" onClick={() => navigate("/")}>Cancel</Button>
      </VStack>
    </Box>
  );
}

export default TaskDetail;
