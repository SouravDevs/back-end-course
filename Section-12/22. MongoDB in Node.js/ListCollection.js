import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/"
const client = new MongoClient(url)

await client.connect() // Connect to MongoDB server

const db = client.db('mobileStore') // By default test database
console.log(db.databaseName);  // Show current database name

const collectionsList = await db.listCollections().toArray()
console.log(collectionsList); // Show all collections which exists in mobileStore database

const collection = db.collection('mobiles')
const data = await collection.find().toArray()

console.log(data);