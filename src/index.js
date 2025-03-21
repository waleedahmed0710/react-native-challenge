import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import App from "./App";

ReactDOM.render(
  <ChakraProvider>
    <TaskProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TaskProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
