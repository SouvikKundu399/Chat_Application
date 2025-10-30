import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcrypt"
const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
    },
    userName: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    description: {
        type: String
    },
    avatar: {
        type: String
    },
    phoneNum: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    mail: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
    }

}, {
    timestamps: true
})


// userSchema.pre("save", async function(next){
//     if(!this.isModified("phoneNum")) return next();

//     this.phoneNum = bcrypt.hash(this.phoneNum,10)
//     next()
// })

const User = new mongoose.model("User",userSchema);

export default User