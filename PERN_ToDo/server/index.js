const express = require("express");
const app = express();
const cors = require("cors");

// conig
const pool = require("./src/database/db");
const router = require("./src/routers");

const PORT = process.env.PORT || 5000;

// *** middleware ***
app.use(cors());
// parsing
app.use(express.json());

// *** CRUD ROUTES ***
app.use("/todo", router);

// Port specification
app.listen(PORT, () =>
  console.log(`The server is listening at http://localhost:${PORT}`)
);
