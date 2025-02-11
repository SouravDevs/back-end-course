import express from 'express'

const app = express();

app.get("/api", (req, res) => {
    res.json({message: "Hello, world get!"})
})

app.post("/api", (req, res) => {
    res.json({message: "Hello, world post!"})
})

app.listen(8000, () => console.log("Server is running on PORT: 8000"))