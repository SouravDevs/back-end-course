import express from "express";
import { createWriteStream } from "fs";
import { mkdir, readdir, rename, rm, stat } from "fs/promises";
import cors from "cors";
import path from "path";
import { dir, error } from "console";

const app = express();

app.use(express.json());
app.use(cors());

// Read
app.get("/directory/?*", async (req, res) => {
  const dirname = path.join('/', req.params[0]);
  const fullDirPath = `./storage/${dirname ? dirname : ""}`;
 try{
  const filesList = await readdir(fullDirPath);
  const resData = [];
  for (const item of filesList) {
    const stats = await stat(`${fullDirPath}/${item}`);
    resData.push({ name: item, isDirectory: stats.isDirectory() });
  }
  res.json(resData);
 }
 catch(err) {
  res.json({error: err.message})
 }
});

app.post('/directory/?*', async (req, res) => {
  const { 0: dirname} = req.params;
 try {
  await mkdir(`./storage/${dirname}`)
  res.json({message: "Directory Created"})
 } catch (err) {
  res.json({error: err.message})
 }
})

// Create
app.post("/files/*", (req, res) => {
  const filePath = path.join("/", req.params[0])
  const writeStream = createWriteStream(`./storage/${filePath}`);
  req.pipe(writeStream);
  req.on("end", () => {
    res.json({ message: "File Uploaded" });
  });
});

app.get("/files/*", (req, res) => {
  const filePath = path.join('/', req.params[0]);
 try{
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  res.sendFile(`${import.meta.dirname}/storage/${filePath}`);
 }
 catch(err) {
  res.json({error: err.message})
 }
});

// Update
app.patch("/files/*", async (req, res) => {
  const { 0: filePath } = req.params;
  await rename(`./storage/${filePath}`, `./storage/${req.body.newFilename}`);
  res.json({ message: "Renamed" });
});

// Delete
app.delete("/files/*", async (req, res) => {
  const { 0: filePath } = req.params;
  try {
    await rm(`./storage/${filePath}`, { recursive: true });
    res.json({ message: "File Deleted Successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.listen(4000, () => {
  console.log(`Server Started`);
});
