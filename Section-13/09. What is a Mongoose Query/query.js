import User from "./UserModel.js";

// const query = User.find({ email: "ram@gmail.com" });
const query = User.where("age").gte(17);

// query.select("name age"); // It's gives name & age's value like projection
// query.select({ age: 1 }); // It's gives age's value like projection
// query.select({ name: 0 }); // It's gives all fields value except name like projection
// query.select(" -name "); // It's gives all fields value except name like projection

// Sort method
// query.select("name age").sort({ age: -1 })

// Where method related to SQL Database



console.log(query.projection());
console.log(query.getQuery());

console.log(await query.exec());