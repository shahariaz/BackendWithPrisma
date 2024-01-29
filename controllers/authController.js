import prisma from "../src/db/db.config.js";
import vine,{errors} from "@vinejs/vine";
import { registerSchema } from "../validations/authValidation.js";
class AuthController{
    static async register(req,res){
      try {
        const body = req.body;
        const validator = vine .compile(registerSchema)
        const payload = await validator.validate(body)
        return res.json({payload})
      } catch (error) {
        if(error instanceof errors.E_VALIDATION_ERROR){
          return res.status(422).json({errors:error.message})
        }
      }
    }
}
export default AuthController;  