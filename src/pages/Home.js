import {
  Box, Button, Heading, VStack, Text, Spinner, Alert, AlertIcon,
  Card, CardBody, Stack, Divider, HStack, IconButton
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { FaEdit, FaTrash } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const { tasks, loading, error, deleteTask } = useTasks();

  return (
    <Box maxW="600px" mx="auto" p={5}>
      <Heading textAlign="center" mb={5} color="blue.600">
        To Do List
      </Heading>

      <Button colorScheme="blue" size="lg" width="100%" onClick={() => navigate("/task/new")}>
        + Add New To Do
      </Button>

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

        {!loading &&
          !error &&
          tasks.map((task) => (
            <Card key={task.id} borderRadius="lg" shadow="md" p={4} _hover={{ shadow: "lg" }}>
              <CardBody>
                <Stack spacing={2}>
                  <Text fontSize="lg" fontWeight="bold" color="blue.700">
                    {task.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {task.description || "No description provided"}
                  </Text>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontSize="xs" color="gray.500">
                      {task.date ? `Created: ${new Date(task.date).toLocaleString()}` : "Created: Unknown"}
                    </Text>
                    <HStack>
                      <IconButton
                        icon={<FaEdit />}
                        colorScheme="yellow"
                        aria-label="Edit Task"
                        size="sm"
                        onClick={() => navigate(`/task/${task.id}`)}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        aria-label="Delete Task"
                        size="sm"
                        onClick={() => deleteTask(task.id, navigate)}
                      />
                    </HStack>
                  </HStack>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </VStack>
    </Box>
  );
}

export default Home;
