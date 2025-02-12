import express from "express";
import { mkdir, readdir, rename, rm, stat } from "fs/promises";
import path from "path";
import directoriesData from '../directoriesDB.json' with {type: 'json'}
import filesData from "../filesDB.json" with {type: 'json'}


const router = express.Router()

// Read
router.get("/:id?", async (req, res) => {
  const {id} = req.params;
  
  
  if(!id) {
    const directoryData = directoriesData[0]
   const files =  directoryData.files.map((fileId) => 
      filesData.find((file) => file.id === fileId)
    )

    res.json({...directoryData, files})
  }
  else {
   const directoryData = directoriesData.find((directory) => directory.id === id )
  res.json(...directoryData)
 }
});

router.post('/?*', async (req, res) => {
  const { 0: dirname} = req.params;
 try {
  await mkdir(`./storage/${dirname}`)
  res.json({message: "Directory Created"})
 } catch (err) {
  res.json({error: err.message})
 }
})

export default router