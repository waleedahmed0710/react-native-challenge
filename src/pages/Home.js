import { Box, Button, Heading, VStack, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

function Home() {
  const navigate = useNavigate();
  const { tasks, loading, error } = useTasks();

  return (
    <Box maxW="600px" mx="auto" p={5}>
      <Heading textAlign="center" mb={5} color="blue.600">
        To-Do List
      </Heading>

      <Button colorScheme="blue" size="lg" width="100%" onClick={() => navigate("/task/new")}>
        + Add New Task
      </Button>

      {/* Spacer for better separation */}
      <Box height="20px" />

      {loading && (
        <VStack mt={5} spacing={3}>
          <Spinner size="lg" />
          <Text fontSize="md" color="gray.600">Fetching tasks...</Text>
        </VStack>
      )}

      {error && (
        <Alert status="error" mt={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}

      <VStack spacing={4} mt={5} align="stretch">
        {!loading && !error && tasks.length === 0 && (
          <Text fontSize="md" textAlign="center" color="gray.500">
            No tasks available. Start by adding one!
          </Text>
        )}

        {!loading && !error &&
          tasks.map((task) => <TaskItem key={task.id} task={task} />)}
      </VStack>
    </Box>
  );
}

export default Home;
