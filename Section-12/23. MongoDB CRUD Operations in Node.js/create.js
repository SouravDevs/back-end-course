import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

const db = client.db("school");

const studentsCollection = db.collection("students");
const teachersCollection = db.collection("teachers");

const result1 = await studentsCollection.insertOne({name: "Aman", age: 15})
const result2 = await teachersCollection.insertMany([{name: "Anurag", age: 59}, {name: "John", age: 55}])

console.log(result1);
console.log(result2);

client.close();
