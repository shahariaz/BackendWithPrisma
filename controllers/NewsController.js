import vine,{errors} from "@vinejs/vine";
import prisma from '../DB/db.config.js';
import { newsSchema } from "../validations/newsValidation.js";
import { imageValidator,generateRandomNum } from '../utils/helper.js';
class NewsController {
    static async index(req,res){
    }
    static async store(req,res){
        try {
        const user  = req.user;
        const body = req.body;
        const validator = vine.compile(newsSchema);
        const payload =await validator.validate(body);
      if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({status:400,message:"News image is required"}) 
      }
     
        const image = req.files?.image;
        //*image custom validator
        const message = imageValidator(image?.size,image?.mimetype);
        if(message !== null){
          return res.status(400).json({errors:{image:message}})
        }
        //* image upload custom
        const imgExt = image?.name.split(".");
        const imageName = generateRandomNum() + "." + imgExt[1];
        const uploadPath = process.cwd()+"/public/images"+imageName;
        image.mv(uploadPath,(err)=>{
          if(err) throw err;
        
        })
        //* store news in database
        payload.image = imageName;
        payload.user_id = user.id;
        const news = await prisma.news.create({
          data:payload
        })

        return res.status(200).json({
          status:200,
          message:"News created successfully",
          data:news
        
        });
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