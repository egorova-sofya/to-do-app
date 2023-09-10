import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from "react";
import {
  getInputErrors,
  InputErrors,
  ValidationSchema,
} from "../../features/auth/validation";
import { Avatar, Snackbar } from "@mui/material";
import Button from "../Button/Button";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile, User } from "firebase/auth";
import { useAuthContext } from "../../features/auth/AuthContextProvider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type InputRefs = {
  avatar: RefObject<any>;
};

const schema: ValidationSchema = {
  avatar: {
    required: "Upload your photo",
  },
};

const UploadImageModal: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { user } = useAuthContext();

  const [inputValues, setInputsValues] = useState({
    avatar: user.photoURL,
  });

  const [inputErrors, setInputErrors] = useState<InputErrors | null>({
    avatar: "",
  });

  const inputRefs: InputRefs = {
    avatar: useRef<HTMLInputElement>(),
  };

  const getImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const url = URL.createObjectURL(file);

      image.onload = () => {
        resolve(image);
      };

      image.onerror = (error) => {
        reject(error);
      };

      image.src = url;
    });
  };

  const showFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files === null || !files.length) {
      return;
    }

    const file = files[0];

    if (file.size === 0 || !file.type.startsWith("image/")) {
      return;
    }

    setInputFile(file);

    getImage(file).then((image) => {
      setInputsValues({
        ...inputValues,
        avatar: image.src,
      });
    });
  };

  const uploadFile = async (file: File): Promise<string> => {
    const storage = getStorage();
    try {
      const storageRef = ref(storage, file.name);
      const snapShot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapShot.ref);

      return url;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    Object.entries(inputValues).forEach(([name, value]) => {
      if (name === "image") {
        data.append(name, inputFile || new File([], ""));
      } else {
        data.append(name, value);
      }
    });

    const errors: InputErrors | null = await getInputErrors(
      Object.fromEntries(data),
      schema
    );

    setInputErrors(errors);

    try {
      if (inputFile) {
        const url = await uploadFile(inputFile);

        const auth = getAuth();
        updateProfile(auth.currentUser as User, {
          photoURL: url,
        });
      }

      setStatusMessage(`🤩 'Avatar has been changed!`);
    } catch (error: any) {
      setStatusMessage(`😕 ${error.message}`);
    }

    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const closeSnackbar = () => {
    setStatusMessage(null);
  };

  return (
    <>
      <span
        style={{ cursor: "pointer", display: "block", width: "100%" }}
        onClick={handleOpen}
      >
        {children}
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload your avatar
          </Typography>

          <form noValidate onSubmit={onSubmit}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                m: 3,
              }}
            >
              <Avatar
                alt="Ryan Sharp"
                src={inputValues.avatar}
                sx={{ width: 100, height: 100 }}
              />
              <input
                style={{
                  cursor: "pointer",
                  opacity: 0,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                }}
                ref={inputRefs["avatar"]}
                onChange={showFile}
                id="avatar"
                type="file"
                name="avatar"
              />
              {Boolean(inputErrors && inputErrors["avatar"]?.length) ? (
                <span className="error">
                  {inputErrors && inputErrors["avatar"]}
                </span>
              ) : null}
            </Box>
            <Button>Save</Button>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={typeof statusMessage === "string"}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={statusMessage}
      />
    </>
  );
};

export default UploadImageModal;
