import { ObjectId } from "mongodb";
import User from "../models/userModel.js";
import crypto from 'crypto'


export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const db = req.db;

  const foundUser = await User.findOne({ email }).lean()

  const hashedPassword = crypto.createHash('sha256')
  .update(password)
  .digest('hex')


  try {
    const rootDirId = new ObjectId();
    const userId = new ObjectId();
    const dirCollection = db.collection("directories");

    await dirCollection.insertOne(
      {
        _id: rootDirId,
        name: `root-${email}`,
        parentDirId: null,
        userId,
      },
    );

    await db.collection("users").insertOne(
      {
        _id: userId,
        name,
        email,
        password: hashedPassword,
        rootDirId,
      },
    );

    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    if (err.code === 121) {
      res
        .status(400)
        .json({ error: "Invalid input, please enter valid details" });
    }
    else if(err.code === 11000) {
      if(err.keyValue.email) {
      return res.status(409).json({error: "User already exists", message: "A user with this email address already exists. Please try again later."})
      }
    }
     else {
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const db = req.db;
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }

  const matchedPassword = crypto.createHash('sha256')
  .update(password)
  .digest("hex")

  if(user.password !== matchedPassword) {
    return res.status(404).json({ error: "Invalid Credentials" });
  }

  const cookiePayload = JSON.stringify({
    id: user._id.toString(),
    expiry: Math.round(Date.now() / 1000 + 60)
  })

  res.cookie("token", Buffer.from(cookiePayload).toString('base64url'), {
    httpOnly: true,
    signed: true,
    maxAge: 60 * 1000 * 60 * 24 * 7,
  });
  res.json({ message: "logged in" });
};

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(204).end();
};
