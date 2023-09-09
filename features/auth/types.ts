import { UserCredential } from "firebase/auth";

export type TAuthContext = {
  isAuthenticated: boolean | null;
  user?: any;
  loginWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  registerWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;

  logOut: () => void;
};
