import { model, Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    strict: "throw"
})


// export default model("todoApp", todoSchema)

const ToDo = model("ToDo", todoSchema)
export default ToDo