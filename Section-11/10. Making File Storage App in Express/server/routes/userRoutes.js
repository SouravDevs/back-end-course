import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const {name, email, password} = req.body
  const db = req.db;

  try {
    const userCollection = db.collection("users");
    const dirCollection = db.collection("directories");

    const foundUser = await userCollection.findOne({email, password});
    console.log(foundUser);
    if(foundUser) {
      return res.status(409).json({
        error: "User already exists",
        message: "A user with this email address already exists. Please try logging in or use a different email."
      })
    }
  
  
    // Create directory collection in storageApp
    const userRootDir = await dirCollection.insertOne(
      {
        name: `root-${email}`,
        parentDirId: null,
        files: [],
        directories: []
      }
    )
  
    const rootDirId = userRootDir.insertedId;
  
    const createdUser = await userCollection.insertOne(
      {
        name,
        email,
        password,
        rootDirId
      }
    )
  
    const userId =  createdUser.insertedId;
  
    await dirCollection.updateOne(
      {_id: rootDirId}, { $set: {userId}}
    )

    res.status(201).json({message: "User Registered"})
  } catch(err) {
    next(err)
  }

})

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body
  const db = req.db;

  const userCollection = db.collection('users');
  const user = await userCollection.findOne({email, password});
  console.log(user);

  if(!user) {
    return res.status(404).json({error: 'Invalid Credentials'})
  }

  res.cookie('uid', user._id.toString(), {
    httpOnly: true,
    maxAge: 60 * 1000 * 60 * 24 * 7
  })
  res.json({message: 'logged in'})
})


router.get('/', checkAuth, (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('uid')

  res.status(200).json({message: 'Logged Out!'})
})
export default router;
