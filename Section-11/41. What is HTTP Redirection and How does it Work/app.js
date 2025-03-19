import express from 'express';

const app = express();
const PORT = 4000;

// Set Status = 301, Set Location = "url"
app.get("/directory", (req, res) => {
    res.set({
        location: '/folder'
    })
   res.status('301').end()
})

// Another method of HTTP Redirection
app.get('/storage', (req, res) => {
    res.writeHead(302, {
        'location': '/folder'
    })

    res.end()
})

// Multiple choices HTTP Redirection
app.get('/choices', (req, res) => {
    res.status(307);
    res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Multiple Choices</h1>
</body>
</html>
        `)
})

// Express method to HTTP Redirection
app.get("/folder2", (req, res) => {
    res.redirect('https://www.youtube.com/', 301)
})


app.get("/folder", (req, res) => {
    res.json({
        name: "images",
        files: ["Node.png", "js.webp"]
    })
})



app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))