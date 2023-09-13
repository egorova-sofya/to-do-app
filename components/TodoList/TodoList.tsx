import React from "react";
import TodoItem from "./TodoItem";
import { CircularProgress, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { useTaskListGetter } from "../../features/useTaskListGetter";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { BlockLayout } from "../Layout/BlockLayout";

const TodoList = () => {
  const todoList = useTaskListGetter();

  if (!todoList) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <>
      <BlockLayout>
        {todoList.length === 0 && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "28px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                color: "var(--violet)",
              }}
            >
              No tasks loaded
            </p>
            <SentimentVeryDissatisfiedOutlinedIcon
              sx={{ width: 150, height: 150, color: "var(--violet)" }}
            />
          </Box>
        )}
        {todoList.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </BlockLayout>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link href="/new-todo">
          <Fab
            color="primary"
            aria-label="add"
            style={{ width: "106px", height: "106px" }}
          >
            <AddOutlinedIcon sx={{ fontSize: "58px" }} />
          </Fab>
        </Link>
      </Box>
    </>
  );
};

export default TodoList;
