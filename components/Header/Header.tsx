import React from "react";
import s from "./Header.module.css";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import UploadImageModal from "../UploadImageModal/UploadImageModal";
import avatar from "./../../public/images/temporary-avatar.png";
import { PersonAdd, Settings } from "@mui/icons-material";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={s.header}>
      <div className={s.headerData}>
        <Typography variant="h4" component="p">
          {/* Hi, {user.displayName} */}
          Hi, Sofia
        </Typography>
        <Typography variant="body2" component="p">
          {/* You have {`${todoList?.length} ${taskWord}`} for today */}
          It&apos;s time to add new tasks!
        </Typography>
      </div>

      <Box className={s.avatarWrapper}>
        {/* <UploadImageModal> */}
        <Avatar
          // alt={`${user.displayName}'s profile photo`}
          // src={user.photoURL}
          className={s.avatar}
          src="/images/temporary-avatar.png"
          sx={{ width: 100, height: 100 }}
        />
        {/* </UploadImageModal> */}
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 100, height: 100 }}>Mmmmmmmmmmmmmmmm</Avatar>
          </IconButton>
        </Tooltip>

        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
