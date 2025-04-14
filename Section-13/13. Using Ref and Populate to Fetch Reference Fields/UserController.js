import User from "./UserModel.js";

//   Populate Method  //
// const user = await User.findOne({email: "aman@gmail.com"}).populate("parentId")


//    Populate Method with Select like Projection     //
// const user = await User.findOne({email: "aman@gmail.com"}).populate({
//     path: "parentId",
//     select: "name age -_id"
// })
// This will fetch only parentId's name and age value


//      Nested Populate Method      //
const user = await User.findOne({email: "aman@gmail.com"}).populate({
        path: "parentId",
        select: "name age -_id",
        populate: {
            path: "id"
        }
    })

console.log(user);
