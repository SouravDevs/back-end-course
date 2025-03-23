import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

const db = client.db("todoApp");
const collection = db.collection("todos");

// Cursor is an object in the eyes of JavaScript.
const cursor = collection.find();

console.log(await collection.countDocuments());

// Print all document's data from collection
// for await (const document of cursor) {
//     console.log(document);
// }

// Print all document's data from collection
// let count = 0;
// while (await cursor.hasNext()) {
//     count++
//     console.log(await cursor.next());
//     if(count === 5) break
// }

// Print all document's data from collection
// for (;await cursor.hasNext();) {
//     console.log(await cursor.next());

// }

console.log(await cursor.hasNext());

// const data = await cursor.toArray()
// const data2 = await cursor.toArray()
// console.log(data);

// console.log(await cursor.hasNext());
// console.log(await cursor.next());

// console.log(await cursor.hasNext());
// console.log(await cursor.next());
// console.log(await cursor.hasNext());

// console.log(await cursor.next());
// console.log(await cursor.hasNext());

await client.close();
