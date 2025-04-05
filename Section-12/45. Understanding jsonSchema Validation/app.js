import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

await client.connect();

const db = client.db();

const collection = await db.createCollection("users")

await db.command({ collMod: "users",
    validator: {
    $jsonSchema: {
      required: [
        'name',
        'age'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        name: {
          bsonType: 'string',
          minLength: 3
        },
        age: {
          bsonType: 'int',
          minimum: 18,
          maximum: 80
        }
      },
      additionalProperties: false
    }
  }
})


await client.close()