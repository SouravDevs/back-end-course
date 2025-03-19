import express from "express";

const app = express();
const PORT = 4000;

app.get("/blogs/:blogId", (req, res) => {
    console.log(req.params);
    res.json(req.params)
})

app.get("/blogs/:blogId/comments", (req, res) => {
    console.log("Comments");
    console.log(req.params);
    res.json([1, 2, 3])
})

app.get("/blogs/:blogId/comments/:commentId", (req, res) => {
    console.log("Comment ID");
    console.log(req.params);
    res.json(req.params)
})

app.get("/blogs/:blogId/comments/:commentId/comment/:comment", (req, res) => {
    console.log("Comment");
    console.log(req.params);
    res.json(req.params)
})

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))