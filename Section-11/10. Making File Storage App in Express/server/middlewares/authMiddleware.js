import { ObjectId } from "mongodb";

export default async function checkAuth(req, res, next) {
  const { uid } = req.cookies;
  const db = req.db;
  if (!uid) {
    return res.status(401).json({ error: "Not logged!" });
  }

  const id = uid.substr(0, 24)
  const expiryTime = parseInt(uid.substr(24, 32), 16)
  const currentTime = Math.round(Date.now() / 1000)

  if(currentTime > expiryTime) {
     res.clearCookie("uid");
    return res.status(204).json({error: "Session expired"});
  }

  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  if (!user) {
    return res.status(401).json({ error: "Not logged!" });
  }
  req.user = user;
  next();
}
