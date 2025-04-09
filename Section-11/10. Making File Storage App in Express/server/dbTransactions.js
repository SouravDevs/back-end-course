import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

await client.connect();
console.log('Database Connected');

const db = client.db();
const directories = db.collection("directories");
const users = db.collection("users");

    // Create & Start a Session
    const session = client.startSession()
    session.startTransaction()
try {
    await directories.insertOne({ name: "db", userName: "AS" }, { session })
    await users.insertOne({ name: "AS", rootDirName: "db" }, { session })

    // End a Session
    await session.commitTransaction()
} catch (error) {
    // Abort a Session
  await session.abortTransaction()
}

// mongosh : rs.initiate() to activate replica

await client.close();