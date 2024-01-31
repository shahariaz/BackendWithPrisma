import vine,{errors} from "@vinejs/vine";
import prisma from '../DB/db.config.js';
import { newsSchema } from "../validations/newsValidation.js";

class NewsController {
    static async index(req,res){
    }
    static async store(req,res){
        try {
        const user  = req.user;
        const body = req.body;
        const validator = vine.compile(newsSchema);
        const payload =await validator.validate(body);
        return res.status(200).json(payload);
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
    static async update(req,res){}
    static async show(req,res){}
    static async destory(req,res){}
}

export default NewsController;