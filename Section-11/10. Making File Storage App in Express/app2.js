import express from "express";
import {readdir} from "fs/promises"

const app = express();

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next()
})

app.use((req, res, next) => {
    if(req.query.action === 'download') {
        res.set("Content-Disposition", "attachment");
    }
    express.static("storage")(req, res, next)
})

app.get("/", async (req, res) => {
    const filesList = await readdir("./storage");
    res.json(filesList);
})

app.listen(8000, () => console.log("Server started on PORT: 8000"));