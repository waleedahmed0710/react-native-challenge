import { Box, Button, Heading } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box p={5}>
      <Heading>Task Details (ID: {id})</Heading>
      <Button mt={3} onClick={() => navigate("/")}>Back to Tasks</Button>
    </Box>
  );
}

export default TaskDetail;
