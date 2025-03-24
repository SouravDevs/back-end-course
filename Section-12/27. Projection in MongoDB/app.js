import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

const db = client.db("expenseApp");
const collection = db.collection("expenses");

const cursor = collection.find({}, {projection: { title: 1, amount: 1, _id: 0}}) // Inclusion is 1 and Exclusion is 0
// By default _id is Included
// .map(({ title, amount }) => ({ title, amount }))

const data = await cursor.toArray();

console.log(data);
await client.close();