import mongoose from "mongoose";

mongoose.set("autoCreate", false);

const UserModel = mongoose.model("User", { name: String, age: Number});

const data = await UserModel.insertOne({name: "Maddie"});
console.log(data);

console.log("Running UserModel.js");
