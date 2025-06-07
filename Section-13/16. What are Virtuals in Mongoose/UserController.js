import mongoose from "mongoose";
import User from "./UserModel.js";


const user = await User.findOneByName("Anurag")
const user1 = await User.findOneByEmail("aman@gmail.com")

console.log(user1.getSummary('full'));


await mongoose.disconnect()