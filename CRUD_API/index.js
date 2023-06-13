import express from "express";
import { router } from "./routers/index.js";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use("/users", router);

app.get("/", (req, res) => res.send("Home page"));

app.all("*", (req, res) =>
  res.send("You have tried to reach a route that doesn't exist")
);

app.listen(PORT, () =>
  console.log(`The server is started at http://localhost:${PORT}`)
);
