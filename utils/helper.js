import { supportedMimes } from "../config/fileSystem.js";
import {v4 as uuidv4} from 'uuid'
import fs from 'fs';
export const imageValidator =(size,mime)=>{
if(byteToMb(size)>2){
    return res.status(400).json({
        message:"Image size should not be greater than 2MB"
    });
}else if(!supportedMimes.includes(mime)){
    return res.status(400).json({
        message:"Image format is not supported"
    });
}
return null;
}
export const byteToMb = (bytes)=>{
    return bytes/(1024*1024);
}
export const generateRandomNum =()=>{
    return uuidv4();
}
export const getImageUrl = (imgName)=>{
    return `${process.env.APP_URL}/images/${imgName}`
}
//* Upload Image
export const uploadImage = (image) => {
    const imgExt = image?.name.split(".");
    const imageName = generateRandomNum() + "." + imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;
    image.mv(uploadPath, (err) => {
      if (err) throw err;
    });
  
    return imageName;
  };
export const  removeImage = (imageName)=>{
    const path = process.cwd()+"public/images/"+imageName;
    if(fs.existsSync(path)) fs.unlinkSync(path);
};