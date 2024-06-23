import express from 'express'
const app = express();
import userRouter from "./Routes/users.router.js"

app.use(express.json());

app.use("/users", userRouter)

app.listen(3004, ()=>{
    console.log("Server is running on port 3004")
})