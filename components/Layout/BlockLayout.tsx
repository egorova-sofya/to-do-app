import React, { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

export const BlockLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Box
        className="container"
        sx={{
          bgcolor: "var(--white)",
          borderRadius: "var(--border-radius-large)",
          minHeight: "300px",
          boxShadow: "var(--primary-shadow-large)",
          marginBottom: "32px",
          padding: "48px 44px",
        }}
      >
        {children}
      </Box>
    </>
  );
};
