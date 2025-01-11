import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.constroller.js";
import { getPatientsHandler, pateintHandler } from "../controllers/pateint.controller.js";
const route=Router();

route.route("/register").post(registerUser);
route.route("/login").post(loginUser)
route.route("/pateint").post(pateintHandler)
route.route("/get-pateint").get(getPatientsHandler)
export default route