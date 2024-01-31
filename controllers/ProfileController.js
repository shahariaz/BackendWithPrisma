import { errors } from '@vinejs/vine';
import { imageValidator } from '../utils/helper.js';
class ProfileController{
    static async index(req,res){
        try {
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
        const {id} = req.params;
        const authUser = req.user;
        if(!req.file || Object.keys(req.file).length === 0){
            return res.status(400).json({
                message:"Profile image is required"
            })
        }
        const profile= req.files.profile;
        const message = imageValidator(profile?.size,profile?.mimetype);
        if(message !== null){
            errors:{
                profile:message
            }
        }

    }
    static async destroy(req,res){}
}
export default ProfileController;