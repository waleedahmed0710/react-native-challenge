import { Box, Button, Heading, Input, Textarea, VStack, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
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
  const [errors, setErrors] = useState({ title: false });

  useEffect(() => {
    if (isEditing) {
      setTask(existingTask);
    }
  }, [id, tasks]);

  const validateForm = () => {
    const newErrors = { title: task.title.trim() === "" };
    setErrors(newErrors);
    return !newErrors.title;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isEditing) {
      editTask(parseInt(id), task);
    } else {
      addTask({ ...task, id: Date.now(), date: new Date().toISOString() });
    }
    navigate("/");
  };

  return (
    <Box maxW="500px" mx="auto" p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <Heading size="lg" textAlign="center" color="blue.600">
        {isEditing ? "Edit To Do" : "Create New To Do"}
      </Heading>
      <VStack spacing={5} mt={6} align="stretch">
        <FormControl isInvalid={errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Enter to do title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          {errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Enter to do description (optional)"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </FormControl>

        <VStack spacing={3} width="100%">
          <Button colorScheme="blue" width="100%" onClick={handleSubmit}>
            {isEditing ? "Update to do" : "Create to do"}
          </Button>
          <Button variant="outline" width="100%" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}

export default TaskDetail;
