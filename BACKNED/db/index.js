import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        console.log("DB Connected")
    } catch (error) {
        console.log("DB connection Fail",error);
        process.exit(1)
    }
}

export default connectDB