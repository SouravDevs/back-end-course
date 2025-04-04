import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017/test");

await client.connect();

const db = client.db();
const collection = db.collection("users");

const result = await collection.insertMany([
    { name: "Laxman" },
    { _id: new ObjectId("67ef514baeba78e3a3186276"), name: "Shyam" },
    { name: "Raman" },
    { name: "Hari" },
], { ordered: false })

console.log(result)



client.close()