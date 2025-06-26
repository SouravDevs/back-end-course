import { model, Schema } from 'mongoose';
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: [3, "name field should a string with at least three characters"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-zA-Z0-9._%+-]@[a-zA-z0-9.-]+.[a-zA-Z]{2,}$/, "please enter a valid email"]
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "password must be atleast 8 characters"]
        },
        rootDirId: {
            type: Schema.Types.ObjectId,
            ref: "Directory"
        }
    },
    {
       strict: 'throw' 
    }
)

userSchema.pre("Save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

const User = model("User", userSchema);

export default User;