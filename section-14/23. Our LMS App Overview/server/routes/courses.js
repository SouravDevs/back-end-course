import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();

    if(!req.signedCookies.sid) {
        // Create a guest session
   const session = await Session.create({})

   res.cookie("sid", session.id , {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7
   })

    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
