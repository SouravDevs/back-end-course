import express from "express";

const app = express();
const PORT = 4000;

// Regular Expression is works here
app.get(["/directory", "/folder", "/test", /\d/], (req, res) => {
  res.json({ message: "Hello Directory" });
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
