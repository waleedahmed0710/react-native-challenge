import { Card, CardBody, Stack, Text, Divider, Button } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const TaskItem = ({ task }) => {
  const navigate = useNavigate();
  const { deleteTask } = useTasks();

  return (
    <Card borderRadius="lg" shadow="md" p={4} _hover={{ shadow: "lg" }}>
      <CardBody>
        <Stack spacing={2}>
          <Text fontSize="lg" fontWeight="bold" color="blue.700">
            {task.title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {task.description || "No description provided"}
          </Text>
          <Divider />
          <Text fontSize="xs" color="gray.500">
            {task.date ? `Created: ${new Date(task.date).toLocaleString()}` : "Created: Unknown"}
          </Text>
          <Stack direction="row" justifyContent="space-between">
            <Button leftIcon={<FaEdit />} colorScheme="yellow" size="sm" onClick={() => navigate(`/task/${task.id}`)}>
              Edit
            </Button>
            <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => deleteTask(task.id, navigate)}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TaskItem;
