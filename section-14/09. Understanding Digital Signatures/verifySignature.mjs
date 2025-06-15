import crypto from "crypto";
import { readFile} from "fs/promises";

const signedFileContent = await readFile("loan-agreement-signed.txt", 'utf-8');
const [fileContent, signature] = signedFileContent.split("signature - ")

const mySecretKey = "my-super-secret-key";

const newSignature = crypto.createHash("sha256")
.update(fileContent + 'signature - ').update(mySecretKey)
.digest("base64url");

if(signature === newSignature) {
    console.log("Signature is verified.");
}
else {
    console.log("Signature isn't verified");
}


