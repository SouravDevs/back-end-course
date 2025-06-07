import mongoose from "mongoose";
import User from "./UserModel.js";


const user = await User.findOne({ email: "sourav@gmail.com"})

const user1 = new User();

console.log(user.getSummary('full'));
console.log(user1.getSummary());

await mongoose.disconnect()