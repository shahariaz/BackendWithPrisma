import { supportedMimes } from "../config/fileSystem.js";
import {v4 as uuidv4} from 'uuid'
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