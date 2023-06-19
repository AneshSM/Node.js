const express = require("express");
const { sequelize } = require("./models");
const app = express();

const usersRouter = require("./routers/users_router");
const postsRouter = require("./routers/posts_router");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen({ port: PORT }, async () => {
  console.log("The server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database connected!");
});
