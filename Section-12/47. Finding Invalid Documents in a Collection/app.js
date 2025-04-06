import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/")

await client.connect()

const db = client.db();

const collection = db.collection("users");

// const result = await db.command({
//     validate: "users",
// })

// console.log(result)

const collectionInfo = await db.listCollections({name: "users"}).toArray()

const schema = collectionInfo[0].options.validator.$jsonSchema;

const invalidDocuments = await collection.find(
    {
        $nor: [{ $jsonSchema: schema
    }]
}
).toArray()

// Method to delete all invalid documents from users collection
for (const { name } of invalidDocuments) {
   await collection.deleteMany( {name} )
}

client.close();

// mongosh command
// db.users.find({ $nor: [{ $jsonSchema: db.getCollectionInfos({ name: "users" })[0].options.validator.$jsonSchema }] })