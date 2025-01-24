const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const todoHandler = require("./routes/todoHandler");
//database connection
mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/todos", todoHandler);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
