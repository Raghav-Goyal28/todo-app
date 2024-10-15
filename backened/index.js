import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import todoRoute from "../backened/routes/todo.route.js"
import userRoute from "../backened/routes/user.route.js"
import cookieParser from "cookie-parser";

const app=express();
dotenv.config();
const PORT=process.env.PORT||4001;
const DB_URI=process.env.MONGODB_URI;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
origin:process.env.FRONTENED_URL,
credentials:true,
methods: "GET,POST,PUT,DELETE",
allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
}))

// database connnection
try{
 mongoose.connect(DB_URI);
console.log("connected to mongo")
}catch(error){
console.log("error");
}

// routes
app.use("/todo",todoRoute);
app.use("/user",userRoute);

app.listen( PORT,()=>{
    console.log(`eg ${PORT}`);
});