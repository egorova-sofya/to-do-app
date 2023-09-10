import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { FC, useEffect, useState } from "react";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import ProgressButton from "../ProgressButton/ProgressButton";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../../features/auth/AuthContextProvider";
import { ITodoItem } from "@/app/types";
import Link from "next/link";

interface Props {
  item: ITodoItem;
}

const TodoItem: FC<Props> = ({ item }) => {
  const [todoDone, setTodoDone] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);
  const { user } = useAuthContext();

  const deleteData = async () => {
    // const db = getFirestore();
    // try {
    //   const todo = doc(db, `users${user.uid}`, item.id);
    //   deleteDoc(todo);
    // } catch (e) {
    //   return Promise.reject(e);
    // }
  };

  useEffect(() => {
    if (deleteTodo) {
      deleteData();
    }
  }, [deleteTodo]);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        mb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box onClick={() => setTodoDone(!todoDone)}>
        <ProgressButton
          id={item.id}
          icon={<DoneIcon />}
          setDeleteTodo={setDeleteTodo}
        />
      </Box>
      <CardContent style={{ maxWidth: "250px" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={
            todoDone
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
          style={{
            wordWrap: "break-word",
          }}
        >
          {item.value}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box>
          <ProgressButton
            id={item.id}
            icon={<DeleteIcon />}
            setDeleteTodo={setDeleteTodo}
          />
        </Box>

        <IconButton
          component={Link}
          href={`/edit-todo/${item.id}`}
          aria-label="share"
          color="primary"
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TodoItem;
