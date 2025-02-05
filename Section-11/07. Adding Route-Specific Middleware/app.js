import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
    console.log(req.headers);
    next()
})

app.get("/", (req, res) => {
    res.end("Home Route")
})

app.get("/user", (req, res) => {
    res.end("ProCoddr")
})

app.listen(8000, () => console.log("Server is running on PORT: 8000"))