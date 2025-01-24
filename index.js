const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const todoHandler = require("./routes/todoHandler");
const userHandler = require("./routes/userHandler");
//database connection
mongoose
  .connect("mongodb://localhost:27017/db")
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/todos", todoHandler);
app.use("/users", userHandler);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  // console.log("its error");
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
