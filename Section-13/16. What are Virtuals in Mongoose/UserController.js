import mongoose from "mongoose";
import User from "./UserModel.js";


// const user = await User.find({ email: "ramesh@gmail.com"})

const user = await User.findOne({name: "Aman"})
console.log(user);

await mongoose.disconnect()