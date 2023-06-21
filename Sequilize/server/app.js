const express = require("express");
const user_router = require("./routers/user_router");
const student_router = require("./routers/student_router");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", user_router);
// app.use("/students", student_router);

app.listen(PORT, () =>
  console.log(`The server is started at http://localhost:${PORT}`)
);
