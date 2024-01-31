import { supportedMimes } from "../config/fileSystem.js";

export const imageValidator =(size,mime)=>{
if(byteToMb(req.file.size)>2){
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