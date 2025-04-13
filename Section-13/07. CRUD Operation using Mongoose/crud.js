import User from "./UserModel.js";


//    Create Method   //

// Insert of single document
// const data = await User.create(
//   {
//     name: "Ram",
//     age: 17,
//     email: "Ram@gmail.com",
//     hobbies: ["Cricket"]
//   },
// );


// Insert of multiple documents
// const data = await User.create(
//   [
//     {
//       name: "Ram",
//       age: 17,
//       email: "Ram@gmail.com",
//       hobbies: ["Cricket"]
//     },
//     {
//       name: "Shyam",
//       age: 17,
//       email: "Shyam@gmail.com",
//       hobbies: ["Cricket"]
//     },
//   ]
// )

// Another way to insert a document
// const user = new User({
//   name: "Anurag",
//   age: 12,
//   email: "Anurag@gmail.com",
//   hobbies: ["Cricket"]
// })

// user.age = 20
// user.hobbies.push("Cooking")

// console.log(user);

// await user.save()



//    Read Method   //

// Fetch a single document
// const user = await User.findOne({ email: "anurag@gmail.com"})
// console.log(user);

// Another way to fetch documents and update
// const user = await User.findOne( { email: "anurag@gmail.com"} ).lean();
// After calling lean() method, you can't use save() function and related to it.

// user.age = 25;

// user.save()

// After implementation of this method, there is 2 times database called.

// console.log(user);


// Fetch all documents
// const user = await User.find().cursor().toArray();
// console.log(user);


//    Update Method   //
// const user = await User.findOneAndUpdate(
//   { email: "anurag@gmail.com" },
//   { age: 5 },
//   { new: true, runValidators: true }
// )
// new: true => Print newly updated value, runValidators: true => apply validation while update

// console.log(user);


//    Delete Method   //
const user = await User.deleteOne({ email: "anurag@gmail.com" });
console.log(user);

console.log("Running UserModel.js");