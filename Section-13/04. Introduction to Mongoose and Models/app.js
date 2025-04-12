import mongoose from 'mongoose';

await mongoose.connect("mongodb://localhost:27017/")

// mongoose.pluralize((word) => word.toLowerCase() + "_collection")
// const pluralizer = mongoose.pluralize()
// mongoose.model("Cat", {}, 'dogs');

mongoose.set("autoCreate", false) // Disable automatic collection save

const UserModel = mongoose.model("User", { name: String, age: Number })

const data = await UserModel.insertOne({ name: "Anurag" })
console.log(data);


console.log("Database connected");