import mongoose from "mongoose";
import User from "./UserModel.js";

const user1 = await User.findOne(
    { email: "anurag@gmail.com"},
)
const user2 = await User.findOne(
    { email: "anurag@gmail.com"},
)

// It will be priotiezed if optimisticConcurrency is true
user1.balance += 500;
await user1.save();

// It will be priotiezed if optimisticConcurrency is false
user2.balance += 200;
await user2.save();


await mongoose.disconnect()