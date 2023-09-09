import React from "react";
import s from "./AuthForms.module.css";
import RegisterForm from "./RegisterForm";
import cn from "classnames";

const AuthForms = () => {
  return (
    <div className={s.authContainer}>
      <h1 className={s.authTitle}>To-Do app</h1>
      <RegisterForm />
      <div className={s.authContainerBg}>
        <div className={cn(s.circle, s.circle1)}></div>
        <div className={cn(s.circle, s.circle2)}></div>
        <div className={cn(s.circle, s.circle3)}></div>
        <div className={cn(s.circle, s.circle4)}></div>
        <div className={cn(s.circle, s.circle5)}></div>
        <div className={cn(s.circle, s.circle6)}></div>
      </div>
    </div>
  );
};

export default AuthForms;
