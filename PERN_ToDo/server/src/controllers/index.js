const pool = require("../database/db");

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

const getData = (req, res) => {
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
    const todoTask = pool.query(
      `SELECT * FROM todo WHERE todo_id = ${todo_id}`
    );
    res.json(todoTask);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 500, data: { error: error?.message || error } });
  }
};
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

const deleteData = () => {};
const updateData = () => {};

module.exports = { getAllData, getData, putData, deleteData, updateData };
