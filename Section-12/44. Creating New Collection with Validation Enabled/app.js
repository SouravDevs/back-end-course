import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

await client.connect();

const db = client.db();
// const collection = db.collection("users");

// Create Collection & Set Validation with Command //
// await db.command({ create: "users", validator: {
//     name: {
//         $type: "string"
//     },
//     age: {
//         $type: "int",
//         $gte: 18,
//         $lte: 80
//     }
// },
// });

// Another Explicit method to create a new collection & Set Validation //
await db.createCollection('users', {validator: {
    name: {
        $type: "string"
    },
    age: {
        $type: "int",
        $gte: 18,
        $lte: 80
    }
}})

// await db.command({
//     collMod: "users",
//     validator: {
//         name: {
//             $type: "string"
//         },
//         age: {
//             $type: "int",
//             $gte: 18,
//             $lte: 80
//         }
//     },
//     validationAction: "warn"
// })

// const collection = await db.listCollections().toArray();
// console.log(collection[0].options)

await client.close();