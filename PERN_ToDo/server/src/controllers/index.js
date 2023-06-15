const pool = require("../database/db");

// *** Callback function for CRUD ***

// get all todo list
const getAllData = async (req, res) => {
  try {
    const all_todo = await pool.query("SELECT * FROM todo");
    res.json(all_todo.rows);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 500, data: { error: error?.message || error } });
  }
};

// get one todo from list
const getData = async (req, res) => {
  try {
    const {
      params: { todo_id },
    } = req;
    if (!todo_id) {
      res.status(400).send({
        status: "FAILED",
        message: "The parameter todo_id is required",
      });
      return;
    }
    const todoTask = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      todo_id,
    ]);
    res.json(
      todoTask.rowCount > 0
        ? todoTask.rows
        : { status: "FAILED", message: "No todo to delete" }
    );
  } catch (error) {
    console.log(error);
    res
      .status(error?.status || 500)
      .send({ status: 500, data: { error: error?.message || error } });
  }
};

// add one todo into the list
const putData = async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 500, data: { error: error?.message || error } });
  }
};

// delete one todo from list
const deleteData = async (req, res) => {
  try {
    const {
      params: { todo_id },
    } = req;
    console.log(todo_id);
    if (!todo_id) {
      res.status(400).send({
        status: "FAILED",
        message: "The parameter todo_id is required",
      });
      return;
    }
    const deleteToDO = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      todo_id,
    ]);
    res
      .status(201)
      .send({ status: "OK", message: "The todo was deleted successfully" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

// update specific todo in list
const updateData = async (req, res) => {
  try {
    const {
      params: { todo_id },
      body: { description },
    } = req;
    if (!todo_id)
      res.status(400).send({
        status: "FAILED",
        message: "The parameter :todo_id is required",
      });
    if (Object.keys(req.body).length <= 0)
      res.status(400).send({
        status: "FAILED",
        message: "Please specify a body of data properties to be updated",
      });

    const update = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, todo_id]
    );

    res.status(200).send({
      status: "OK",
      message: `The description of the todo with id:${todo_id} is updated successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "FAILED", message: error?.message || error });
  }
};

module.exports = { getAllData, getData, putData, deleteData, updateData };
