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

        <div>
          <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
            {/* Hi, {user.displayName} */}
            Hi, Sofia
          </Typography>
          <Typography variant="body2" component="p">
            {/* You have {`${todoList?.length} ${taskWord}`} for today */}
            It&apos;s time to add new tasks!
          </Typography>
        </div>

        <Box sx={{ maxWidth: 60 }}>
          {/* <UploadImageModal>
                <Avatar
                  alt={`${user.displayName}'s profile photo`}
                  src={user.photoURL}
                  sx={{ width: 50, height: 50 }}
                />
              </UploadImageModal> */}
        </Box>
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
