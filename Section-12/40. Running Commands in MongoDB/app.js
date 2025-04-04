import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/newDB");

await client.connect();

const db = client.db();
// const collection = db.collection("users");

// List of All Commands //
// const result = await db.command({ listCommands: 1 });

// List of All Databases //
// const result = await db.command({ listDatabases: 1 });

// List of All Collections //
// const result = await db.command({ listCollections: 1 });
// console.log(result.cursor.firstBatch)

// console.log(await db.listCollections().toArray())

// Create a Collection Explicitly //
// const result = await db.createCollection("fruits");

// console.log(result)

// Commad to Create a Collection //
// const result = await db.command({ create: "Grains" });
// console.log(result)

// Command to Drop a Collection //
// const result = await db.command( { drop: "Grains" })
// console.log(result)

// Command to Insert Many Data in a Collection //
const result = await db.command( {
     insert: "fruits", 
    documents: [
        { name: "Alice", age: 30},
        { name: "Bob", age: 22},
    ]
}
)

console.log(result)


await client.close()