import { ObjectId } from "mongodb";
import Session from '../models/session.model.js'
import User from "../models/userModel.js";

export default async function checkAuth(req, res, next) {

  const { sid } = req.signedCookies;

  if (!sid) {
    res.clearCookie('sid')
    return res.status(401).json({ error: "Not logged!" });
  }

  const session = await Session.findById(sid);

  if(!session) {
    return res.status(401).json({ error: "Not logged!" });
  }

  const user = await User.findOne({_id: session.userId}).lean()
  if (!user) {
    return res.status(401).json({ error: "Not logged!" });
  }
  req.user = user;
  next();
}
