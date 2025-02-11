import express from "express";
import { createWriteStream } from "fs";
import { rename, rm } from "fs/promises";
import path from "path";

const router = express.Router();

// Create
router.post("/*", (req, res) => {
    const filePath = path.join("/", req.params[0])
    const writeStream = createWriteStream(`./storage/${filePath}`);
    req.pipe(writeStream);
    req.on("end", () => {
      res.json({ message: "File Uploaded" });
    });
  });
  
  router.get("/*", (req, res) => {
    const filePath = path.join('/', req.params[0]);
   try{
    if (req.query.action === "download") {
      res.set("Content-Disposition", "attachment");
    }
    res.sendFile(`${process.cwd()}/storage/${filePath}`);
   }
   catch(err) {
    res.json({error: err.message})
   }
  });
  
  // Update
  router.patch("/*", async (req, res) => {
    const { 0: filePath } = req.params;
    await rename(`./storage/${filePath}`, `./storage/${req.body.newFilename}`);
    res.json({ message: "Renamed" });
  });
  
  // Delete
  router.delete("/*", async (req, res) => {
    const { 0: filePath } = req.params;
    try {
      await rm(`./storage/${filePath}`, { recursive: true });
      res.json({ message: "File Deleted Successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

  export default router;