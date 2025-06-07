import mongoose from "mongoose";
import User from "./UserModel.js";


const user = await User.findOne({ email: "sourav@gmail.com"})
user.hobbiesString = "TT, Football"

// console.log(user.toJSON({ virtuals: true }));
// console.log(user.schema.virtuals);

// console.log(user.isAdult);
// console.log(user.hobbiesString);
// console.log(user.domain);

// console.log(user.hobbiesString);

// await user.save()

console.log(user.emailDomain);

await mongoose.disconnect()