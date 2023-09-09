import React, { ChangeEvent, FormEvent, useState } from "react";
import { getAuth, updateProfile, User, UserCredential } from "firebase/auth";
import Button from "../../../../components/Button/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PasswordField from "../../../../components/PasswordField/PasswordField";
import {
  getInputErrors,
  InputErrors,
  ValidationSchema,
} from "../../validation";
import { useAuthContext } from "../../AuthContextProvider";
import { Typography } from "@mui/material";
import s from "./AuthForms.module.css";
import { redirect } from "next/navigation";

export type InputName = "login" | "email" | "password" | "confirmPassword";

const schema: ValidationSchema = {
  login: {
    required: "Login is required",
  },
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
    matchedFields: {
      value: ["confirmPassword"],
      message: "Passwords must be the same",
    },
  },
  confirmPassword: {
    required: "Password is required",
    matchedFields: {
      value: ["password"],
      message: "Passwords must be the same",
    },
  },
};

const RegisterForm = () => {
  const [inputValues, setInputValues] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputErrors, setInputErrors] = useState<InputErrors | null>({
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [authError, setAuthError] = useState("");
  const { registerWithEmailAndPassword } = useAuthContext();

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
        const auth = getAuth();

        updateProfile(auth.currentUser as User, {
          displayName: inputValues.login,
        }).catch((error) => {
          setAuthError(error?.message || "error");
        });
      })
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
        registerWithEmailAndPassword(inputValues.email, inputValues.password)
      );
    }
  };

  return (
    <>
      <form className={s.authForm} noValidate onSubmit={onSubmit}>
        <p className={s.authActionTitle}>Sign In</p>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          className={s.inputsWrapper}
        >
          {authError && (
            <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
              {authError}
            </Typography>
          )}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="login"
              label="Login"
              variant="outlined"
              onChange={onChangeInput}
              value={inputValues.login}
              name={"login"}
            />
            {/* {Boolean(inputErrors && inputErrors["login"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["login"]}
              </span>
            ) : null} */}
          </Box>
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
            {/* {Boolean(inputErrors && inputErrors["email"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["email"]}
              </span>
            ) : null} */}
          </Box>

          <Box sx={{ mb: 3 }}>
            <PasswordField
              name={"password"}
              value={inputValues.password}
              changeValue={onChangeInput}
            />
            {/* {Boolean(inputErrors && inputErrors["password"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["password"]}
              </span>
            ) : null} */}
          </Box>
          <Box sx={{ mb: 3 }}>
            <PasswordField
              label={"Confirm password"}
              name={"confirmPassword"}
              value={inputValues.confirmPassword}
              changeValue={onChangeInput}
            />
            {/* {Boolean(inputErrors && inputErrors["confirmPassword"]?.length) ? (
              <span className="error">
                {inputErrors && inputErrors["confirmPassword"]}
              </span>
            ) : null} */}
          </Box>
          <Button style={{ mixBlendMode: "normal" }}>Sign Up</Button>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
