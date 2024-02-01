import { errors } from '@vinejs/vine';
import { imageValidator,generateRandomNum, uploadImage } from '../utils/helper.js';
import prisma from '../DB/db.config.js';
class ProfileController{
    static async index(req,res){
        try {
          console.log(req.user);
            const user = req.user;
        return res.status(200).json({
            message:"User profile fetched successfully",
            data:user
        })
        } catch (error) {
            return res.status(500).json({
                message:"something is wrong"
            })
            
        }
        
    }
    static async store(req,res){}
    static async show(req,res){}
    static async update(req,res){
        try {
            const { id } = req.params;
            if (!req.files || Object.keys(req.files).length === 0) {
              return res
                .status(400)
                .json({ status: 400, message: "Profile image is required." });
            }
      
            const profile = req.files.profile;
            const message = imageValidator(profile?.size, profile.mimetype);
            if (message !== null) {
              return res.status(400).json({
                errors: {
                  profile: message,
                },
              });
            }
            // *upload image
      
           const imageName = uploadImage(profile);
      
            await prisma.users.update({
              data: {
                profile: imageName,
              },
              where: {
                id: Number(id),
              },
            });
      
            return res.json({
              status: 200,
              message: "Profile updated successfully!",
            });
          } catch (error) {
            console.log("The error is", error);
            return res
              .status(500)
              .json({ message: "Something went wrong.please try again!" });
          }



    }
    static async destroy(req,res){}
}
export default ProfileController;