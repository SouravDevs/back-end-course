import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

await client.connect();

const db = client.db();

// const collection = db.collection("users");

await db.command({ collMod: "users", validator: {
    name: {
      $type: 'string'
    },
    age: {
      $type: 'int',
      $gte: 18,
      $lte: 80
    }
  },
    validationAction: "warn"
})

const collection = await db.listCollections({ name: "users" }).toArray();
console.log(collection[0].options);

// try {
//     const result = await collection.insertOne({ name: "Anuj", age: 72 })
// } catch (error) {
//     console.log(error)
// }


client.close();
