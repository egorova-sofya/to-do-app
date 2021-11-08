import { useContext } from "react";
import { Context } from "../context";
import s from "./TodoItem.module.css";
export default function TodoItem({ title, id, completed, important }) {
  const { dispatch } = useContext(Context);

  const cls = [];

  if (completed) {
    cls.push("completed");
  }

  // if (important) {
  //   cls.push("important");
  // }

  return (
    <li className={`${s.todo} ${cls.join(" ")} `}>
      <div className={s.doneWrapper}>
        <label className={s.checkbox}>
          <span className={s.visuallyHidden}>Done</span>

          <input
            className={s.checkbox}
            type="checkbox"
            checked={completed}
            onChange={() =>
              dispatch({
                type: "toggle",
                payload: id,
              })
            }
          />
          <div className={s.checkboxDone}></div>
        </label>
      </div>

      <p className={s.title}>{title}</p>

      <div className={s.iconsWrapper}>
        <label className={s.checkbox}>
          <span className={s.visuallyHidden}>Important</span>
          <input
            className={s.checkbox}
            type="checkbox"
            checked={important}
            onChange={() =>
              dispatch({
                type: "important",
                payload: id,
              })
            }
          />
          <div className={s.checkboxImportant}></div>
        </label>

        <span
          className={s.delete}
          onClick={() =>
            dispatch({
              type: "remove",
              payload: id,
            })
          }
        >
          <span className={s.visuallyHidden}>Delete</span>
        </span>
      </div>
    </li>
  );
}
