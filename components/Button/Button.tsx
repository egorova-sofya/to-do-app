import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  ReactNode,
} from "react";
import "./Button.css";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

const Button: FC<Props> = ({ children, className, ...props }) => {
  return (
    <>
      <button className="button" {...props}>
        {children}
      </button>
    </>
  );
};

export default Button;
