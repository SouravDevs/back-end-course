import mongoose, { model, Schema } from "mongoose";

mongoose.set("autoCreate", false);

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name field is required"],
            minLength: [3, "name field required minimum 3 letters"],
            trim: true,
        }, 
        age: {
            type: Number,
            required: [true, "age field is required"],
            min: 12,
            validate: {
                validator() {
                    return this.age % 2 === 0;
                },
                message: "age only can be an even number"
            }
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
            default: null,
            ref: "User"
            
        }
    },
     {
        strict: "throw", // true, false, throw -> by Default = true
        timestamps: true,
        // versionKey: "__version",
        // collection: "user", // This collection name will override and won't pluralize,
        virtuals: {
            isAdult: {
                get() {
                    return this.age >= 18;
                }
            },
            hobbiesString: {
                get() {
                    return this.hobbies.join(', ')
                },
                set(value) {
                    this.hobbies = [...this.hobbies, ...value.split(', ')]
                }
            },
            emailDomain: {
                get() {
                    return this.email.split("@")[1]
                }
            }
        },
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        methods: {
            getSummary(option) {
                if(option === 'full') {
                    return `${this.name} is ${this.age} years old and he is ${ this.isAdult ? 'adult' : 'not adult'}`
                }
                return `${this.name} is ${this.age} years old.`
            }
        }
    }
)

//  Another way to create a virtuals    //
// userSchema.virtual('emailDomain').get(function() {
//     return this.email.split('@')[1]
// })

// Another way to create a method   //
// userSchema.methods.getAge = function() {

// }

const User = model("User", userSchema);

export default User
