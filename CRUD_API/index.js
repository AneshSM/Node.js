import express from "express";
import bodyParser from "body-parser";
import userRrouter from "./src/routers/userRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use("/api/v1/users", userRrouter);

app.get("/api/v1", (req, res) => res.send("Home page of api v1"));

app.all("*", (req, res) =>
  res.send("You have tried to reach a route that doesn't exist")
);

app.listen(PORT, () =>
  console.log(`The server is started at http://localhost:${PORT}/api/v1`)
);
