import React, { useEffect, useState } from "react";
import "./ListTodo.css";
import EditTodo from "./EditTodo";

const ListTodo = ({ onpress }) => {
  const [todoList, setTodoList] = useState([]);
  const fetchdata = async () => {
    const response = await fetch("http://localhost:5000/todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTodoList(data);
  };
  useEffect(() => {
    try {
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // delete
  const deleteTodo = async (id) => {
    try {
      const deltodo = await fetch(`http://localhost:5000/todo/${id}`, {
        method: "DELETE",
      });
      setTodoList(todoList.filter((data) => data.todo_id !== id));
    } catch (error) {}
  };

  return (
    <div className="list-container">
      <table id="customers">
        <thead>
          <tr>
            <th>TODO</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((value, index) => (
            <tr key={index}>
              <td>{value.description}</td>
              <td>
                <EditTodo onclick={onpress} todoData={value} />
              </td>
              <td>
                <button
                  className="button delete"
                  onClick={() => deleteTodo(value.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
