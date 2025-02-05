import express from "express";
import { createWriteStream } from "fs";
import { readdir, rename, rm } from "fs/promises";

const app = express();

app.use(express.json())

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  })
  next();
});

app.get("/:filename", (req, res) => {
 const {filename} = req.params;
 if(req.query.action === 'download') {
  res.set("Content-Disposition", "attachment")
 }
  res.sendFile(`${import.meta.dirname}/${filename}`);
});

app.post("/:filename", (req, res) => {
  console.log(req.params.filename);
  const writeStream  = createWriteStream(`./storage/${req.params.filename}`)
  req.pipe(writeStream)
  req.on('end', () => {
    res.json({message: "File Uploaded Successfully"})
  })
})

app.delete('/:filename', async(req, res) => {
  const {filename} = req.params;
  const filepath = `./storage/${filename}`;
  try {
   await rm(filepath)
  res.json({message: "File Deleted Successfully"})
  } catch (err) {
    res.status(404).json({message: "File not found."})
  }
})

app.patch("/:filename", async(req, res) => {
  const {filename} = req.params;
  await rename(`./storage/${filename}`, `./storage/${req.body.newFilename}`)
  try {
    res.json({message: "File Renamed Successfully"})
  } catch (error) {
    res.status(404).json({message: "File not found"})
  }
})

// Serving Dir Content
app.get("/", async (req, res) => {
  const filesList = await readdir("./storage");
  res.json(filesList);
});

app.listen(8000, () => {
  console.log("Server started on PORT: 8000");
});
