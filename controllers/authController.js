import prisma from "../DB/db.config.js";
import vine,{errors} from "@vinejs/vine";
import { registerSchema,loginSchema } from "../validations/authValidation.js";
import bcrytjs from 'bcryptjs'
class AuthController{
    static async register(req,res){
      try {
        const body = req.body;
        const validator = vine .compile(registerSchema)
        const payload = await validator.validate(body)
        //check if email exists already
        const userExists = await prisma.users.findUnique({where:{email:payload.email}})
        //* Encrypt the payload password
        const salt = await bcrytjs.genSalt(10);
        payload.password = await bcrytjs.hash(payload.password,salt)
        //* Save the user to the database
        if(!userExists){
          const user = await prisma.users.create({data:payload})
          return res.status(200).json({
            message:"User created successfully",
            data:user
          })
        }else{
          return res.status(409).json({
            message:"User already exists"
          })
        }
       
      } catch (error) {
        console.log(`Error: ${error.message}`);
        if(error instanceof errors.E_VALIDATION_ERROR){
          return res.status(422).json({errors:error.messages})
        }
        else{
          return res.status(500).json({error:error.message})
        }
      }
    }
    static async login(req,res){
      try{
        const body = req.body;
        const validator = vine.compile(loginSchema)
        const payload = validator.validate(body);

        const user = await prisma.users.findUnique({where:{email:body.email}})
        if(user){
          //* compare the password
          const isMatch = await bcrytjs.compare(body.password,user.password)
          if(isMatch){
            return res.status(200).json({
              message:"User logged in successfully",
              data:user
            })
          }else{
            return res.status(401).json({
              message:"Invalid credentials"
            })
          }
        }else{
          return res.status(404).json({
            message:"User not found"
          })
        }
      }catch(error){
        console.log(`Error: ${error.message}`);
        if(error instanceof errors.E_VALIDATION_ERROR){
          return res.status(422).json({errors:error.messages})
        }
        else{
          return res.status(500).json({error:error.message})
        }

      }
    }
}
export default AuthController;  