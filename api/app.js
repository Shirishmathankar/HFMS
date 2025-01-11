import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

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
