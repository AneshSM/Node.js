const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json);

const dataStore = [
  { id: 1, name: "John" },
  { id: 2, name: "Jaya" },
];

app.get("/api/user", (req, res) => {
  res.json(dataStore);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: dataStore.length + 1,
    name: req.body.name,
  };
  dataStore.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log("The server is listening on port:" + PORT);
});
