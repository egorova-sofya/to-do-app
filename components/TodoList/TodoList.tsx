import React from "react";
import TodoItem from "./TodoItem";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useTaskListGetter } from "../../features/useTaskListGetter";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";

const TodoList = () => {
  const todoList = useTaskListGetter();

  if (!todoList) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (todoList.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link href="/new-todo">
          <AddCircleOutlineIcon
            sx={{ opacity: 0.2, width: 150, height: 150 }}
          />
        </Link>
      </Box>
    );
  }
  return (
    <div className="container">
      {todoList.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default TodoList;
