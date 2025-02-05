import express from 'express';

const app = express();

const port = 4000;

app.get('/',
     (req, res, next) => {
        console.log('Running middleware 1');
    res.write("Hii from Express 1")
    next()
    },
    (req, res) => {
        console.log('Running middleware 2');
        res.end("Hii from Express 2")
        }
)

app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
})