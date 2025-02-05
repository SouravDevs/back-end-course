import express from "express";

const app = express();
const port = 4000;


// Parsing JSON Body (Custom Middleware)
// app.use((req, res, next) => {
//   req.on("data", (chunk) => {
//     const reqBody = JSON.parse(chunk.toString());
//     req.body = reqBody;
//     next();
//   });
// });

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hii");
});

app.get("/login", (req, res) => {
  res.end("Login Get Route");
});

app.post("/", (req, res) => {
  res.end("Home Post Route");
});

app.post("/login", (req, res) => {
    console.log(req.body);
  res.end("Login Post Route");
});

app.patch("/", (req, res) => {
  res.end("Home Patch Route");
});

app.put("/", (req, res) => {
  res.end("Home Put Route");
});

app.delete("/", (req, res) => {
  res.end("Home Delete Route");
});

app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`);
});
