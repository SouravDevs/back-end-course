import { ObjectId } from "mongodb";
import crypto from 'crypto'
import { mySecretKey } from "../controllers/userController.js";

export default async function checkAuth(req, res, next) {
  const { token } = req.cookies;
  const db = req.db;


  if (!token) {
    return res.status(401).json({ error: "Not logged!" });
  }

  const [payLoad, oldSignature ] = token.split('.')

  const jsonPayload = Buffer.from(payLoad, 'base64url').toString()

  const newSignature = crypto.createHash('sha256')
  .update(mySecretKey)
  .update(jsonPayload)
  .update(mySecretKey)
  .digest('base64url')

  if(oldSignature !== newSignature) {
    res.clearCookie("token");
    return res.status(204).json({error: "Session expired"});
  }

  const { id, expiry: expiryTimeInSeconds } = JSON.parse(Buffer.from(payLoad, "base64url").toString())


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
