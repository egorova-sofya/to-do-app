import { BlockLayout } from "@/components/Layout/BlockLayout";
import { Layout } from "@/components/Layout/Layout";
import React from "react";

const NewTodoPage = () => {
  return (
    <Layout>
      <BlockLayout>
        <p
          style={{
            fontSize: "24px",
          }}
        >
          Create task
        </p>
      </BlockLayout>
    </Layout>
  );
};

export default NewTodoPage;
