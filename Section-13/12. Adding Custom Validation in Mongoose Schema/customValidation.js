import User from "./UserModel.js";



const user = await User.create({
    name: 'Aman',
    age: 14,
    email: "aman@gmail.com",
    parentId: "67fcd44ae3ac0dbe08af8faf"
})

console.log(user);
