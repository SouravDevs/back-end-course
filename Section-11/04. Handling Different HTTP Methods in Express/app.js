import express from "express";
import obj from "./Data.js";

const app = express();
const port = 4000;

p9
app.get('/', (req, res) => {
    res.send(obj)
})

app.get('/login', (req, res) => {
    res.end("Login Get Route")
})

app.post('/', (req, res) => {
    res.end("Home Post Route")
})

app.post('/login', (req, res) => {
    res.end("Login Post Route")
})

app.patch('/', (req, res) => {
    res.end("Home Patch Route")
})

app.put('/', (req, res) => {
    res.end("Home Put Route")
})

app.delete('/', (req, res) => {
    res.end("Home Delete Route")
})


app.listen(port, () => {
  console.log(`Server started on PORT : ${port}`);
});
