// This is a practice file
import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

await client.connect();

// Create
const db = client.db("school2");

const studentsCollection = db.collection("students");
const teachersCollection = db.collection("teachers");

// const studentsData = await studentsCollection.insertOne({name: "Aman"})
// const teachersData = await teachersCollection.insertMany([
//     {name: "Anurag", age: 59},
//     {name: "Akash", age: 53}
// ])

// console.log(studentsData);
// console.log(teachersData);

// Read
// const result1 = await studentsCollection.find().toArray()
// const result2 = await teachersCollection.find().toArray()

// console.log(result1);
// console.log(result2);

// Update
// const updatedStudent = await studentsCollection.updateOne(
//   { _id: new ObjectId("67e048a8483af3b098e4a01d") },
//   { $set: { name: "Raman", age: 17, class: 10 } }
// );
// console.log(updatedStudent);

// Delete a field or property from a document
// const deletedProperty = await studentsCollection.updateOne(
//   { _id: new ObjectId("67e048a8483af3b098e4a01d") },
//   { $unset: { age: "" } }
// );

// console.log(deletedProperty);

// Delete
// Delete a single collection from students database
// const deletedStudentCollection = await studentsCollection.drop()
// console.log(deletedStudentCollection);

// Delete a database
const isDeleteDatabase = await db.dropDatabase()
console.log(isDeleteDatabase);


client.close();
