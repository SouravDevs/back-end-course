import express from "express";

const app = express();

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.end("Hello from Express.js")
})

app.get('/video', (req, res) => {
    res.sendFile(`${import.meta.dirname}/public/Nature.mp4`)
})

app.listen(8000, () => {
    console.log("Server started on PORT: 8000");
})