import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import path from 'path'
const app=express();

const __dirname=path.resolve();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
 }))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'/client/dist'))); 
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html') )
})

import route from "./routes/auth.route.js";

app.use("/api/v1/users",route)


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"interna server error";
    return res.status(statusCode).json({
      success:false,
      statusCode,
      message,
    })
  })
export default app ;
