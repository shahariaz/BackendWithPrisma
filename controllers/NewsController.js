import vine,{errors} from "@vinejs/vine";
import prisma from '../DB/db.config.js';
import { newsSchema } from "../validations/newsValidation.js";
import { imageValidator, uploadImage } from '../utils/helper.js';
import NewsApiTransform from "../transform/newsApiTransform.js";
class NewsController {
    static async index(req,res){
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      if(page <=0){
        page =1;
      }
      if(limit <=0 || limit >100){
        limit = 10;
      }
      const news = await prisma.news.findMany({
        take:limit,
        skip:offset,
        include:{
          user:{
            select:{
              id:true,
              name:true,
              profile:true
            }
          }
        }
      });
      const newsTransForm = news?.map((news) =>{
        return NewsApiTransform.transform(news);
      })
       const totalNews = await prisma.news.count();
        const totalPages = Math.ceil(totalNews / limit);

    return res.status(200).json({
        status:200,
        message:"News fetched successfully",
        data:newsTransForm,
        meta:{
          totalNews:totalNews,
          currentPage:page,
          totalPages:totalPages,
          limit:limit
        }
    })
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
        const imageName = uploadImage(image);
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
    static async show(req,res){
      const id = req.params.id;
      const news = await prisma.news.findUnique({
        where:{
          id:Number(id)
        },
        include:{
          user:{
            select:{
              id:true,
              name:true,
              profile:true
            }
          }
        }
      });
      if(!news){
        return res.status(404).json({status:404,message:"News not found"})
      }
      const newsTransForm = NewsApiTransform.transform(news);
      return res.status(200).json({
        status:200,
        message:"News fetched successfully",
        data:newsTransForm
      })
    }
    static async destory(req,res){}
}

export default NewsController;