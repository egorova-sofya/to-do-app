import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { TAuthContext } from "./types";
import { FirebaseApp } from "firebase/app";

type TProps = {
  children: React.ReactNode;
  firebaseApp: FirebaseApp;
};

export const authContext = createContext<TAuthContext>({
  isAuthenticated: null,
  loginWithEmailAndPassword: () => Promise.reject({}),
  registerWithEmailAndPassword: () => Promise.reject({}),
  logOut: () => void 0,
});

export const useAuthContext = (): TAuthContext => {
  return useContext<TAuthContext>(authContext);
};

export const AuthContextProvider: FC<TProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState<TAuthContext["isAuthenticated"]>(null);
  const [user, setUser] = useState<any>(null);
  const [auth] = useState(getAuth(props.firebaseApp));

  auth.setPersistence(browserLocalPersistence);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, [auth]);

  const processLogin = (loginPromise: Promise<UserCredential>) => {
    setUser(null);
    setIsAuthenticated(null);
    return loginPromise
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };

  const loginWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(signInWithEmailAndPassword(auth, email, password));
  };
  const registerWithEmailAndPassword = (email: string, password: string) => {
    return processLogin(createUserWithEmailAndPassword(auth, email, password));
  };

  const logOut = () => signOut(auth);

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loginWithEmailAndPassword,
        registerWithEmailAndPassword,
        logOut,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
