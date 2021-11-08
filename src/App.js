import { useEffect, useState, useReducer } from "react";
import { Context } from "./context";
import TodoList from "./TodoList/TodoList";
import reducer from "./reduser";
import "./App.css";

export default function App() {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [todoTitle, setTodotitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addTodo = (event) => {
    if (event.key === "Enter") {
      dispatch({
        type: "add",
        payload: todoTitle,
      });
      setTodotitle("");
    }
  };

  const addTodoBtn = (event) => {
    dispatch({
      type: "add",
      payload: todoTitle,
    });
    setTodotitle("");
  };

  return (
    <Context.Provider value={{ dispatch }}>
      <div className="container">
        <div className="modalWrapper">
          <h1 className="title">Todo app</h1>

          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              value={todoTitle}
              onChange={(event) => {
                setTodotitle(event.target.value);
              }}
              onKeyPress={addTodo}
            />
            <label className="visuallyHidden">Todo name</label>
            <button className="btn" type="button" onClick={addTodoBtn}>
              <span className="visuallyHidden">Add task</span>
            </button>
          </div>

          <TodoList todos={state} />
        </div>
      </div>
    </Context.Provider>
  );
}
