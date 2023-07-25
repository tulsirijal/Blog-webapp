const jwt = require('jsonwebtoken');
require('dotenv').config()
exports.auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ', "");
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token is required"
            })
        }
        try {
            const decoded = jwt.verify(token,process.env.JWTSECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (error) {
            console.log(error.message)
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}