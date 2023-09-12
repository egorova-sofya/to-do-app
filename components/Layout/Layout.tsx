import React, { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
// import CustomMenu from "../../CustomMenu/CustomMenu";
import s from "./Layout.module.css";
import UploadImageModal from "../UploadImageModal/UploadImageModal";
import { useTaskListGetter } from "@/features/useTaskListGetter";
import { useAuthContext } from "@/features/auth/AuthContextProvider";
import cn from "classnames";
import Header from "../Header/Header";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuthContext();

  const todoList = useTaskListGetter();

  const taskWord = todoList?.length && todoList?.length > 2 ? "tasks" : "task";

  return (
    <>
      <div className={s.layoutContainer}>
        <div className={s.layoutContainerBg}>
          <div className={cn(s.circle, s.circle1)}></div>
          <div className={cn(s.circle, s.circle2)}></div>
          <div className={cn(s.circle, s.circle3)}></div>
        </div>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        className={s.layoutMenu}
      >
        {/* <CustomMenu /> */}
      </Box>
    </>
  );
};
