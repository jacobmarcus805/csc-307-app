// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";


import {
  getUsers,
  findUserById,
  addUser,
  updateUserById,
  deleteUserById
} from "./services/user-services.js";


const app = express();
const port = 8000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/csc307", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("Mongo error:", err);
    process.exit(1);
  });


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  getUsers(name, job)
    .then(list => res.json({ users_list: list }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then(user => user
      ? res.json(user)
      : res.status(404).send("User not found")
    )
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/users", (req, res) => {
  addUser(req.body)
    .then(u => res.status(201).json(u))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.put("/users/:id", (req, res) => {
  updateUserById(req.params.id, req.body)
    .then(updated => updated
      ? res.json(updated)
      : res.status(404).send("User not found")
    )
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then(deleted => deleted
      ? res.sendStatus(204)
      : res.status(404).send("User not found")
    )
    .catch(err => res.status(500).json({ error: err.message }));
});

  