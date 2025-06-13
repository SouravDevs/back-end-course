import crypto from "crypto"
import { readFileSync } from "fs";

const fileData = readFileSync("C:\\Users\\1339m\\OneDrive\\Desktop\\Nature.mp4")

const hashedResult = crypto.createHash('sha256').update("Hello World").digest('hex')

const hashedResult2 = crypto.createHash('sha256').update("Hello ").update("World").digest('hex')

const hashedResult3 = crypto.createHash('sha256').update(fileData).digest('hex')

console.log({hashedResult, hashedResult2, hashedResult3});