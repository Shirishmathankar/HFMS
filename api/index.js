import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT||5000,()=>{
    console.log(`server is running at port ${process.env.PORT||5000}`)
  })
})//we have return to promise 
.catch((err)=>{
  console.log("mongo db connection failed !!",err)
})

