import express from "express";
import { createWriteStream } from "fs";
import { rename, rm, writeFile } from "fs/promises";
import path from "path";
import filesData from '../filesDB.json' with {type: 'json'}

const router = express.Router();

// Create
router.post("/:filename", (req, res) => {
   const {filename} = req.params; // Get file name
   const extension = path.extname(filename); // Get extension name

   const id = crypto.randomUUID();

   const fullFileName = `${id}${extension}` // Create file's fullName

    const writeStream = createWriteStream(`./storage/${fullFileName}`);
    req.pipe(writeStream);
    req.on("end", async() => {
      filesData.push({
        id, 
        extension, 
        name: filename
      })

      console.log(filesData);
     await writeFile(`./filesDB.json`, JSON.stringify(filesData))
      res.json({ message: "File Uploaded" });
    });
  });
  
  router.get("/:id", (req, res) => {
    const {id} = req.params; // Get id
    const fileData = filesData.find((file) => file.id == id)
    console.log(fileData);

   try{
    if (req.query.action === "download") {
      res.set("Content-Disposition", "attachment");
    }
    res.sendFile(`${process.cwd()}/storage/${id}${fileData.extension}`);
   }
   catch(err) {
    res.json({error: err.message})
   }
  });
  
  // Update
  router.patch("/:id", async (req, res) => {
    const {id} = req.params; // Get file id
    const newFileName = req.body.newFileName; // Get new file name from req.body

    const findFile = filesData.find((file) => file.id === id) // Find file with id
    findFile.name = newFileName // Set oldFilename to newFileName

    
    await writeFile(`./filesDB.json`, JSON.stringify(filesData)) // Write to filesData
    res.json({ message: "Renamed" });
  });
  
  // Delete
  router.delete("/:id", async (req, res) => {
    const {id} = req.params; // Get id

    const findFileIndex = filesData.findIndex((file) => file.id === id) // Find the file with id
    const fileData = filesData[findFileIndex]

    try {
      await rm(`./storage/${id}${fileData.extension}`, { recursive: true }); // Delete the file from storage
      filesData.splice(findFileIndex, 1)
      await writeFile(`./filesDB.json`, JSON.stringify(filesData))
      res.json({ message: "File Deleted Successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

  export default router;