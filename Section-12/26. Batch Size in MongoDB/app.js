import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

const db = client.db("todoApp");
const collection = db.collection("todos");

const cursor = collection.find().batchSize(20);

const data = await cursor.toArray();
console.log(data.map(({ title, completed }) => ({ title, completed })));

await client.close();
