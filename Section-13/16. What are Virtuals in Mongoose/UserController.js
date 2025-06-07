import mongoose from "mongoose";
import User from "./UserModel.js";

const result = await User.insertMany([
    {name: 'Aman', age: 30, email: "aman@gmail.com"},
    {name: 'Raman', age: 32, email: "raman@gmail.com"}
])

console.log(result);

await mongoose.disconnect()