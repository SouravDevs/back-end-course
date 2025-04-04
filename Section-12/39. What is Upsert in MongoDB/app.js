import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017/test");

 await client.connect();

 const db = client.db();
 const collection = db.collection("users");

 const result = await collection.updateOne(
    { name: "Hari" },
    { $set: { age: 70}},
    { upsert: true }
 )

 console.log(result)

console.log(db.namespace)

await client.close()

