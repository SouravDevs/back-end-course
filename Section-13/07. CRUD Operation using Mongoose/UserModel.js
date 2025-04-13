import mongoose, { model, Schema } from "mongoose";

mongoose.set("autoCreate", false);

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name field is required"],
            minLength: [3, "name field required minimum 3 letters"],
            trim: true
        }, 
        age: {
            type: Number,
            required: [true, "age field is required"],
            min: 12
        },
        email: {
            type: String,
            required: true,
           match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"],
           lowercase: true,
           trim: true
        },
        hobbies: {
            type: [String]
        },
        parentId: {
            type: Schema.Types.ObjectId,
            required: function() {
               return this.age < 16;
            },
            default: null
        }
    },
     {
        strict: "throw", // true, false, throw -> by Default = true
        timestamps: true,
        // versionKey: "__version",
        // collection: "user", // This collection name will override and won't pluralize
    }
)

const User = model("User", userSchema);



export default User
