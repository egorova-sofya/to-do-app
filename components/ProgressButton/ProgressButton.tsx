import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FC, ReactNode, useState } from "react";

interface CircularProgressWithLabelProps {
  setDeleteTodo: (payload: boolean) => void;
}
const CircularProgressWithLabel: FC<CircularProgressWithLabelProps> = ({
  setDeleteTodo,
}) => {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    if (progress == 110) {
      setDeleteTodo(true);
    }
  }, [progress]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 25
      );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{ position: "relative", display: "inline-flex", cursor: "pointer" }}
    >
      <CircularProgress variant="determinate" {...{ value: progress }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CloseIcon />
      </Box>
    </Box>
  );
};

interface Props {
  id: string;
  icon: ReactNode;
  setDeleteTodo: (payload: boolean) => void;
}

const ProgressButton: FC<Props> = ({ id, icon, setDeleteTodo }) => {
  const [showProgressButton, setShowProgressButton] = useState(false);

  return showProgressButton ? (
    <Box
      onClick={() => {
        setShowProgressButton(false);
      }}
    >
      <CircularProgressWithLabel setDeleteTodo={setDeleteTodo} />
    </Box>
  ) : (
    <div>
      <IconButton
        color="primary"
        onClick={() => {
          setShowProgressButton(true);
        }}
      >
        {icon}
      </IconButton>
    </div>
  );
};

export default ProgressButton;
