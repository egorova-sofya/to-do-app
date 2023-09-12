import { Layout } from "@/components/Layout/Layout";
import React from "react";
import TodoList from "./../components/TodoList/TodoList";

const Home = () => {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
};

export default Home;
