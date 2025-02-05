import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(201).json({message: "Hello World"});
});

app.listen(8000, () => {
  console.log("Server started on PORT: 8000");
});
