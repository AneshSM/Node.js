import logo from "./logo.svg";
import "./App.css";
import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>PERN TODO</p>
      </header>
      <main className="Main">
        <AddTodo />
        <ListTodo />
      </main>
    </div>
  );
}

export default App;
