import { Box, Button, Heading, VStack, Text, IconButton, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { FaEdit, FaTrash } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const { tasks, deleteTask } = useTasks();

  return (
    <Box p={5}>
      <Heading>Task Manager</Heading>
      <Button colorScheme="blue" mt={4} onClick={() => navigate("/task/new")}>
        Add Task
      </Button>

      <VStack spacing={4} mt={5} align="stretch">
        {tasks.length === 0 ? (
          <Text>No tasks available</Text>
        ) : (
          tasks.map((task) => (
            <HStack
              key={task.id}
              p={3}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
                <Text fontSize="sm">{task.description}</Text>
              </Box>
              <IconButton icon={<FaEdit />} onClick={(e) => { e.stopPropagation(); navigate(`/task/${task.id}`); }} />
              <IconButton icon={<FaTrash />} colorScheme="red" onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }} />
            </HStack>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default Home;
