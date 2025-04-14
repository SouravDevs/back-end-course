import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

await client.connect()

const admin = client.db().admin();
const allDatabases = await admin.listDatabases()
console.log(allDatabases);


client.close() // Close the connection