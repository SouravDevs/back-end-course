import { client, connectDB } from "./db.js";

const db = await connectDB();

const command = "callMod"

await db.command({
    collMod: "users", validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                '_id',
                'name',
                'email',
                'password',
                'rootDirId'
            ],
            properties: {
                _id: {
                    bsonType: 'objectId'
                },
                name: {
                    bsonType: 'string',
                    minLength: 3
                },
                email: {
                    bsonType: 'string'
                },
                password: {
                    bsonType: 'string',
                    minLength: 4
                },
                rootDirId: {
                    bsonType: [
                        'objectId',
                        'null'
                    ]
                }
            },
            additionalProperties: false
        }
    },
    validationAction: "error",
    validationLevel: "strict"
});

await db.command({ collMod: "directories", validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        '_id',
        'name',
        'parentDirId',
        'userId'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        name: {
          bsonType: 'string',
          minLength: 3
        },
        parentDirId: {
          bsonType: [
            'objectId',
            'null'
          ]
        },
        userId: {
          bsonType: 'objectId'
        }
      },
      additionalProperties: false
    }
  },
  validationAction: "error",
  validationLevel: "strict"
})

await db.command({
    collMod: "files", validator: {
        $jsonSchema: {
            required: [
                '_id',
                'extension',
                'name',
                'parentDirId',
                'userId'
            ],
            properties: {
                _id: {
                    bsonType: 'objectId'
                },
                extension: {
                    bsonType: 'string'
                },
                name: {
                    bsonType: 'string'
                },
                parentDirId: {
                    bsonType: 'objectId'
                },
                userId: {
                    bsonType: 'objectId'
                }
            },
            additionalProperties: false
        }
    },
    validationAction: "error",
    validationLevel: "strict"
})

client.close()