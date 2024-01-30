import vine from "@vinejs/vine";
import { CustomErrorHandler } from "./CustomErrorReporter.js";
//* Custom ErrorReporter
vine.errorReporter = ()=>new CustomErrorHandler()
export const registerSchema = vine.object({
    name:vine.string().minLength(2).maxLength(40),
    email:vine.string().email(),
    password:vine.string().minLength(6).maxLength(20).confirmed()
})  
export const loginSchema = vine.object({    
    email:vine.string().email(),
    password:vine.string()
})  