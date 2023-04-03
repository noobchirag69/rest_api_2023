const mongoose = require("mongoose");
const express = require("express");
const app = express();

const User = require("./models/user");

app.use(express.json()); // For parsing JSONs
app.use(express.urlencoded({ extended: true })); // For Parsing URLs

const URL =
  "mongodb+srv://chiragchakraborty48:cPdnN7h4O5PNvNxY@cluster0.qger13l.mongodb.net/?retryWrites=true&w=majority";

// Database Connection and Server running
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(3000, () => {
      console.log("Server running on Port 3000");
    })
  )
  .catch((err) => console.log(err));

// Get all data
app.get("/", (req, res) => {
  User.find()
    .then((result) => res.status(200).send(result))
    .catch((err) =>
      res.json({
        message: "No users available!",
      })
    );
});

// Adding new data
app.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => res.send(result))
    .catch((err) =>
      res.json({
        message: err.message,
      })
    );
});

// Getting a single data
app.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => res.send(result))
    .catch((err) =>
      res.json({
        message: err.message,
      })
    );
});

// Editing a data
app.patch("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body)
    .then((result) =>
      res.status(200).json({
        message: "User updated successfully!",
      })
    )
    .catch((err) =>
      res.json({
        message: err.message,
      })
    );
});

// Deleting a data
app.delete("/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((result) =>
      res.status(200).json({
        message: "User deleted successfully",
      })
    )
    .catch((err) =>
      res.json({
        message: "Sorry, this user could not be deleted",
      })
    );
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});
