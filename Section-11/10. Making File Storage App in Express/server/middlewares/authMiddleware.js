import { ObjectId } from "mongodb";
import crypto from 'crypto'

export default async function checkAuth(req, res, next) {
  console.log('Signed : ',req.signedCookies);
  console.log("Normal : ",req.cookies);

  const { token } = req.signedCookies;
  const db = req.db;


  if (!token) {
    return res.status(401).json({ error: "Not logged!" });
  }


  const { id, expiry: expiryTimeInSeconds } = JSON.parse(Buffer.from(token, 'base64url').toString())


  const currentTimeInSeconds = Math.round(Date.now() / 1000)

  if(currentTimeInSeconds > expiryTimeInSeconds) {
     res.clearCookie("token");
    return res.status(204).json({error: "Session expired"});
  }

  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  if (!user) {
    return res.status(401).json({ error: "Not logged!" });
  }
  req.user = user;
  next();
}
