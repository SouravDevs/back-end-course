import express from "express";

const app = express();

app.disable("x-powered-by")

app.get("/", (req, res) => {
  res.send("Hiii 😊");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
