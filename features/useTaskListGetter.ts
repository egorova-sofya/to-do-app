import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthContext } from "./auth/AuthContextProvider";
import { ITodoItem } from "@/app/types";

export const useTaskListGetter = (): ITodoItem[] | null => {
  const [todoList, setTodoList] = useState<ITodoItem[] | null>(null);

  const { user } = useAuthContext();

  const getCollection = async (): Promise<ITodoItem[]> => {
    const db = getFirestore();
    const todoData: ITodoItem[] = [];

    try {
      // const querySnapshot = await getDocs(collection(db, `users${user.uid}`));
      // querySnapshot.forEach((doc) => {
      //   const data = doc.data() as Omit<ITodoItem, "id">;
      //   todoData.push({
      //     id: doc.id,
      //     ...data,
      //   });
      // });
    } catch (error) {
      return Promise.reject(error);
    }

    return todoData;
  };

  useEffect(() => {
    (async () => {
      const data: ITodoItem[] = await getCollection();
      setTodoList(data);
    })();
  }, [onSnapshot]);

  const db = getFirestore();

  useEffect(() => {
    // onSnapshot(collection(db, `users${user.uid}`), (snapshot) => {
    //   const todoData: ITodoItem[] = [];
    //   snapshot.forEach(function (doc) {
    //     const data = doc.data() as Omit<ITodoItem, "id">;
    //     todoData.push({
    //       id: doc.id,
    //       ...data,
    //     });
    //   });
    //   setTodoList(todoData);
    // });
  }, []);

  return todoList;
};
