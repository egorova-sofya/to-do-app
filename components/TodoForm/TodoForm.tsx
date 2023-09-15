import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Box, Fab, Snackbar, TextField, Typography } from "@mui/material";
import Button from "../Button/Button";
import {
  getInputErrors,
  InputErrors,
  ValidationSchema,
} from "../../features/auth/validation";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useAuthContext } from "../../features/auth/AuthContextProvider";
import { useSearchParams } from "next/navigation";
import { ITodoItem } from "@/app/types";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const schema: ValidationSchema = {
  value: {
    required: "Enter something!",
    max: {
      value: 100,
      message: "This task is too big. Try to cut it into small pieces",
    },
  },
};

const TodoForm = () => {
  const [inputValues, setInputValues] = useState({ value: "" });

  const [inputErrors, setInputErrors] = useState<InputErrors | null>({
    value: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const name = input.name;
    const value = input.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const closeSnackbar = () => {
    setStatusMessage(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    Object.entries(inputValues).forEach(([name, value]) => {
      data.append(name, value);
    });

    const errors: InputErrors | null = await getInputErrors(
      Object.fromEntries(data),
      schema
    );

    setInputErrors(errors);

    if (!errors && id) {
      updateTodo(id, inputValues)
        .then(() => {
          setStatusMessage("🤩 Task is update");
        })
        .catch((error) => {
          setStatusMessage(`😕 ${error.message}`);
        });
    } else if (!errors) {
      addToDatabase(inputValues.value)
        .then(() => {
          setStatusMessage("🤩 Task created!");
        })
        .catch((error) => {
          setStatusMessage(`😕 ${error.message}`);
        });

      setInputValues({
        value: "",
      });
    }
  };

  const updateTodo = async (
    id: string,
    data: Omit<ITodoItem, "id" | "created">
  ): Promise<any> => {
    const db = getFirestore();
    const ref = doc(db, `users${user.uid}`, id);
    try {
      await updateDoc(ref, data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const { user } = useAuthContext();

  const addToDatabase = async (todoValue: string) => {
    const db = getFirestore();
    try {
      addDoc(collection(db, `users${user.uid}`), {
        value: todoValue,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const getPartnerArticle = async (id: string): Promise<ITodoItem> => {
    const db = getFirestore();
    const docRef = doc(db, `users${user.uid}`, id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Omit<ITodoItem, "id">;

        return {
          id: docSnap.id,
          ...data,
        };
      } else {
        throw Error("Такой статьи нет");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      const data = await getPartnerArticle(id);

      setInputValues({
        value: data.value,
      });
    })();
  }, [id]);

  return (
    <div className="container">
      <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
        {id ? `Edit task` : "Create task"}
      </Typography>
      <form noValidate onSubmit={onSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              component="p"
              sx={
                inputValues.value.length >= 100
                  ? { color: "var(--error-color)" }
                  : { color: "inherit" }
              }
            >
              {inputValues.value.length}/100
            </Typography>
            <TextField
              fullWidth
              onChange={onChangeInput}
              value={inputValues.value}
              id="outlined-multiline-static"
              placeholder="Enter the text of your task"
              multiline
              rows={4}
              name="value"
            />
            {Boolean(inputErrors && inputErrors["value"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["value"]}
              </span>
            ) : null}
          </Box>

          <Button>Save</Button>
        </Box>
      </form>
      <Snackbar
        open={typeof statusMessage === "string"}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={statusMessage}
      />

      <Link href="/" style={{ marginTop: "20px", display: "block" }}>
        <Fab
          color="secondary"
          aria-label="add"
          style={{ width: "70px", height: "70px" }}
        >
          <ArrowBackIcon sx={{ fontSize: "30px" }} />
        </Fab>
      </Link>
    </div>
  );
};

export default TodoForm;
