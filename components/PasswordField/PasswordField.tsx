import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  value: string;
  name: string;
  changeValue: (payload: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: FC<Props> = ({
  value,
  changeValue,
  name,
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          inputProps={{
            ...props,
          }}
          fullWidth
          id={name}
          type={showPassword ? "text" : "password"}
          value={value}
          name={name}
          onChange={changeValue}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </div>
  );
};

export default PasswordField;
