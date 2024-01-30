import jwt from 'jsonwebtoken';
const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || authHeader === undefined){
        return res.status(401).json({
            message:"Authorization header is required"
        })
    }
    const token = authHeader.split(" ")[1];
    //* verfy token
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        req.user = decoded;
        next();
    })
}
export default authMiddleware;