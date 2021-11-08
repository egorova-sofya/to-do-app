import TodoItem from "../TodoItem/TodoItem";
import s from "./TodoList.module.css";

export default function TodoList({ todos }) {
  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {todos.map((item) => (
          <TodoItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
