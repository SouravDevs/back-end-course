import express from 'express';

const app = express();

app.router('/post').get((req, res) => {
    const posts = [
        {id: 1, title: "Hello World", content: "This is my first post"},
        {id: 2, title: "Another Post", content: "Some interesting content"},
    ]
    res.json(posts)
}).post((req, res) => {
    const newPost = req.body;

    res.status(201).json({message: "New post created", post: newPost})
})

app.router("/posts/:id").put((req, res) => {
    const { id } = req.params;
    const updatedData = res.body;

    res.json({message: `Post with ID ${id} updated`, updatedData})
}).delete( (req, res) => {
    const { id } = req.params;

    res.json({message:  `Post with ID ${id} deleted`})
})



app.listen(4000, () => console.log('Server is running...'))