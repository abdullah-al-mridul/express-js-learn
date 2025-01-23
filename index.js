const express = require("express");
const app = express();

app.use(express.json());

app.get("/user/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query.age);
  res.send(`this is ${req.params.id} page`);
});

app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("this is post request");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
