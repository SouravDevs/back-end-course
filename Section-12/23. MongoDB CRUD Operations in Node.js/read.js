import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

const db = client.db("todoApp");

const collection = db.collection('todos')

// const todosData = await collection.find({completed: false}).toArray()
const todosData = await collection.find().toArray()

console.log(todosData);

client.close()