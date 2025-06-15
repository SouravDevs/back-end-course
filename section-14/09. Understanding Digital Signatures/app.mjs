import crypto from "crypto";
import { createWriteStream } from "fs";
import { readFile} from "fs/promises";

const fileContent = await readFile("loan-agreement.txt");
const mySecretKey = "my-super-secret-key";

const signature = crypto.createHash("sha256")
.update(fileContent).update(mySecretKey)
.digest("base64url");

console.log(signature);

const writeStream = createWriteStream("loan-agreement-signed.txt")

writeStream.write(fileContent)
writeStream.end(signature)


// const signature =  createHash(originalData + secretData)
// const signedFile = originalData + signature