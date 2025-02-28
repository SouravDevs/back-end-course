import express from "express";
import directoriesData from '../directoriesDB.json' with {type: 'json'};
import usersData from '../usersDB.json' with {type: 'json'};
import { writeFile } from "node:fs/promises";

const router = express.Router();

router.post('/register', async(req, res, next) => {
    const {name, email, password} = req.body;

    const userId = crypto.randomUUID();
    const dirId = crypto.randomUUID();

    const user = usersData.find((user) => user.email === email)

    if(user) {
        return res.status(409).json({message: "User already exists"})
    }

    directoriesData.push({
        id: dirId,
        name: `root-${email}`,
        userId,
        parentDirId: null,
        files: [],
        directories: []
    })


    usersData.push({
        id: userId,
        name,
        email,
        password,
        rootDirId: dirId
    })

   try {

    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    await writeFile("./usersDB.json", JSON.stringify(usersData));

    return res.status(201).json({message: "User Registered!"})

   }
    catch (error) {
        next(error)
   }

})

router.post('/login', async (req, res, next) => {
    // Find user using email
    const {email, password} = req.body;

    const user = usersData.find((user) => user.email === email);

    if(!user || user.password !== password) {
        return res.status(404).json({error: "Invalid credentials!"})
    }

    res.cookie('uid', user.id, {
        httpOnly: true,
        maxAge: 60 * 1000 * 60 * 24 * 7
    })
     res.json({message: "User Logged!"})
})

export default router;