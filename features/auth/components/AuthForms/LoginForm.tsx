import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import Button from "../../../../components/Button/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PasswordField from "../../../../components/PasswordField/PasswordField";
import {
  getInputErrors,
  InputErrors,
  ValidationSchema,
} from "../../validation";
import { UserCredential } from "firebase/auth";
import { Typography } from "@mui/material";
import { useAuthContext } from "../../AuthContextProvider";
import { redirect } from "next/navigation";
import s from "./AuthForms.module.css";

export type InputName = "email" | "password";

const schema: ValidationSchema = {
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
  },
};

const LoginForm: FC<{ setAuthMode: () => void }> = ({ setAuthMode }) => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const { loginWithEmailAndPassword } = useAuthContext();
  const [inputErrors, setInputErrors] = useState<InputErrors | null>({
    email: "",
    password: "",
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const name = input.name;
    const value = input.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const processLogin = (loginPromise: Promise<UserCredential>) => {
    return loginPromise
      .then(() => {
        redirect("/");
      })
      .catch((error) => {
        setAuthError(error?.message || "error");
      });
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

    if (!errors) {
      processLogin(
        loginWithEmailAndPassword(inputValues.email, inputValues.password)
      );
    }
  };

  return (
    <>
      <form className={s.authForm} noValidate onSubmit={onSubmit}>
        <p className={s.authActionTitle}>Sign In</p>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {authError && (
            <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
              {authError}
            </Typography>
          )}

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              onChange={onChangeInput}
              value={inputValues.email}
              name={"email"}
            />
            {Boolean(inputErrors && inputErrors["email"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["email"]}
              </span>
            ) : null}
          </Box>

          <Box sx={{ mb: 3 }}>
            <PasswordField
              name={"password"}
              value={inputValues.password}
              changeValue={onChangeInput}
            />
            {Boolean(inputErrors && inputErrors["password"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["password"]}
              </span>
            ) : null}
          </Box>
          <Button>Login</Button>

          <Box className={s.changeAuthModeBtnWrapper}>
            Don&apos;t have an account yet?
            <button className={s.changeAuthModeBtn} onClick={setAuthMode}>
              Sign Up
            </button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
