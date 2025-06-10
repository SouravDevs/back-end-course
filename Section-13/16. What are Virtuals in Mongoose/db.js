import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/");



// await mongoose.connect("mongodb://localhost:27017/");

// const db = mongoose.connection.db

// const fruitsCollection = db.collection("fruits");

// const result = await fruitsCollection.insertOne({name: "Mango"})

// console.log(result);

// await mongoose.disconnect()