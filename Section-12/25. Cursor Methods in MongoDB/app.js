import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/"

const client = new MongoClient(url);

await client.connect();

const db = client.db("expenseApp");
const collection = db.collection("expenses");

// skip() and limit() methods
// const cursor = collection.find({title: "Vinyl"}).skip(2).limit(2) //  Skip 2 documents and Print 2 documents

// sort() method
//  Skip 2 documents and Print 5 documents in Ascending order       
// const cursor = collection.find().skip(2).limit(5).sort({title: 1})

// sort() and map() methods
//  Skip 2 documents and Print 5 documents in Decending order 
const cursor = collection.find().skip(2).limit(20).sort({amount: 1, title: -1})
.map(({ title, currency, amount }) => ({ title, currency, amount }))
 // First priority of amount

const data = await cursor.toArray()
console.log(data);


await client.close();