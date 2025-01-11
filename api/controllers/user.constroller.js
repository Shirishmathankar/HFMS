import asynchandler from "../utils/asynchandler.js";

import APIError from "../utils/APIerror.js";
import {User} from "../models/user.model.js";
import Apiresponse from "../utils/Apiresponse.js";
import jwt, { decode } from "jsonwebtoken"
import Apiresposnse from "../utils/Apiresponse.js";
import { response } from "express";

 const generateAccessAndRefreshtoken=async (userId)=>{

   try{
     const user = await User.findById(userId)
     console.log(user)
     const accessToken= await user.generateAccessToken();
     const refreshToken= await user.generateRefreshToken();
     user.refreshToken=refreshToken
     await user.save({validateBeforeSave:false});
     return {accessToken,refreshToken}  
   }
   catch(error){
       throw new APIError(500,"something went wrong while generating access and refresh token")
   }
 }
const registerUser = asynchandler(async (req, res,next) => {
   
     const {name,password,email,role}=req.body;
    console.log(name,password,email,role)
     if([name,password,email,role].some((feilds)=>feilds?.trim()==="")){
        next(APIError(400,"all fields are required"))
     };
     const ExistedUser=await User.findOne(
      {
        $or:[{email}]
      }
     )
     if(ExistedUser){
       return next(APIError(409,"user with email is exist")) 
     }
    

    const user=await User.create({
      
      email,
      password,
      name:name.toLowerCase(),
      role:role
     })
  const createduser=await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createduser){
    next(APIError(500,"user not registered in server"))
  }
console.log(createduser)
  return res.status(201).json(
    new Apiresposnse(200,createduser,"user registered successfully")
  )
     
})         

const loginUser=asynchandler(async (req,res,next) => {
    
  const {email,password}=req.body
   
  if(!(email)){
    return next(APIError(400,"email is required"))
    
  }
  
  const user=await User.findOne({email})
  
   if(!user)
   {
      return next(APIError(404,"email is not valid"))
      
   }
    console.log(password)
   const isPassword=await user.isPasswordCorrect(password);

   if(!isPassword){
    return next(APIError(401,"invalid credentials"))
     
   }
console.log(password)
   const {accessToken, refreshToken}=await generateAccessAndRefreshtoken(user._id)
   console.log(password)
   
   const logedInUser=await User.findById(user._id).select(-password -refreshToken);

   const options= {
    httpOnly:true,
    secure:true
   }
 
   return res
   .status(200)
   .cookie("accessToken" ,accessToken,options)
   .cookie("refreshToken", refreshToken,options)
   .json(
    new Apiresponse(
      200,
      {
        user : logedInUser,accessToken,refreshToken,
      },
      "user logged in successfully"
    )
    )

})
 const logoutUser=asynchandler(async (req,res)=>{
   
  await User.findByIdAndUpdate(req.user._id,{
    $set:{refreshToken:undefined}

  },{
    new :true
  })
  
  const options= {
    httpOnly:true,
    secure:true
   }
    
   return res.status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new Apiresponse(200,"","user loggedout successfully "))
 })
 const refreshAccessToken=asynchandler( async (req,res)=>{
  
  try{
    const incomingToken=req.cookies?.refreshToken||req.body.refreshToken;
    if(!incomingRefresh)
    {
      throw new APIError(401,"token is expired")
    }
   
    const decodedToken= jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET)
      if(!decodedToken){
        throw new APIError(401,"token not found")
      }
   
      const user=await User.findById(decodedToken._id);
      if(!user){
      throw new APIError(400,"no such user found")
      }
      if(user.refreshToken!==incomingToken){
        throw new APIError(401,"unauthorized access") 
      }
      const {accessToken,refreshToken}=generateAccessAndRefreshtoken(user._Id);
  
      const options={
        httpOnly:true,
        secure:true
      }
      res.status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken,options)
      .json( new Apiresponse(200,{accessToken,refreshToken},"token refreshed"))
  }
  catch(error){
    throw new APIError(401,"invalid refresh token")
  }
 })
export  {registerUser,loginUser,logoutUser,refreshAccessToken};

