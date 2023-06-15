import React, { useState } from "react";

import "./AddTodo.css";

const AddTodo = () => {
  const [description, setDescription] = useState("");
  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="input-container" onSubmit={onSubmitForm}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
};

export default AddTodo;
