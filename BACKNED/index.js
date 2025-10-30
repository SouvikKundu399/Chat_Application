import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 500, () => {
            console.log("Server is created")
        })
    })
    .catch((error) => {
        console.log("Failed to connect DB", error)
    })

