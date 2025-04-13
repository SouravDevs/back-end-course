import mongoose from "mongoose";
import User from "./UserModel.js";

// Create a document in Mongoose
// const user = new User();

const user = await User.findById("67fb4ed534774bce6519670e").lean();

// For update
// user.updateOne({ age: 50 }).exec()

// For delete
// user.deleteOne()

// console.log(user.isModified() ? "modified" : "unmodified");
// user.age = 10;
// console.log(user.isModified() ? "modified" : "unmodified");

// console.log(user.isNew ? "New" : "Not New");

// const a = await user.deleteOne()
// console.log(a);

// console.log(user instanceof mongoose.Document);
// console.log(user instanceof User);

console.log(user);
