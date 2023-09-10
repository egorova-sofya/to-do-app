import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export let firebaseApp: FirebaseApp;

export const initializeAPI = (): FirebaseApp => {
  firebaseApp = initializeApp({
    apiKey: "AIzaSyB2DlLiQDMEDs0AtD2YQSAHyM1sZs1NqM4",
    authDomain: "fancy-to-do-list.firebaseapp.com",
    projectId: "fancy-to-do-list",
    storageBucket: "fancy-to-do-list.appspot.com",
    messagingSenderId: "1099174571093",
    appId: "1:1099174571093:web:ab70ef0324b74ad36bb8dc",
  });

  getAuth(firebaseApp);

  return firebaseApp;
};
