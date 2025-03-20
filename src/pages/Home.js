import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  
  return (
    <Box p={5}>
      <Heading>Task Manager</Heading>
      <VStack spacing={4} mt={5}>
        <Button colorScheme="blue" onClick={() => navigate("/task/new")}>
          Add Task
        </Button>
      </VStack>
    </Box>
  );
}

export default Home;
