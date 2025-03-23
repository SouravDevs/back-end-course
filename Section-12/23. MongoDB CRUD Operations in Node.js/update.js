import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

const db = client.db("school");

const studentsCollection = db.collection("students");

const result = await studentsCollection.updateOne(
  { _id: new ObjectId("67e045f89e3f625b47edfd98") },
  { $set: { name: "Raman", class: 10, age: 17 } }
);

console.log(result);

client.close();
