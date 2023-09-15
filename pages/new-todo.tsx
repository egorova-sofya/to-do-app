import TodoForm from "@/components/TodoForm/TodoForm";
import { BlockLayout } from "@/components/Layout/BlockLayout";
import { Layout } from "@/components/Layout/Layout";
import React from "react";

const NewTodoPage = () => {
  return (
    <Layout>
      <BlockLayout>
        <TodoForm />
      </BlockLayout>
    </Layout>
  );
};

export default NewTodoPage;
