const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        // check if the user already exists 
        const q = `SELECT * FROM user WHERE email = ?`;
        db.query(q,[email],(err,data)=>{
            if(err) return res.json({success:false,message:err});
            if(data.length) return res.status(409).json({success:false,message:"user already exists"});
        })
        const hashedPassword = await bcrypt.hash(password,10);
        const createUser = "INSERT INTO user (`name`,`email`,`password`,`image`) VALUES(?)"
        const userDummyImage = `https://api.dicebear.com/6.x/initials/svg?seed=${name}`
        const values = [name,email,hashedPassword,userDummyImage]
        db.query(createUser,[values],(err,data)=>{
            if(err) return res.status(404).json({success:false,message:err});
          return  res.status(200).json({success:true,data:data});
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:error.message});
    }
}

exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(403).json({
                message:"All fields are required"
            })
        }
        // check if the user exists
        const q = 'SELECT * FROM user WHERE email = ?';
        db.query(q,[email],async(err,data)=>{
            if(err) return res.json({message:err.message});
            if(data.length==0) return res.status(409).json({
                success:false,
                message:"You need to signup first"
            }) 
            // res.json({data:data});
            if(await bcrypt.compare(password,data[0].password)){
                const payload = {
                    email:data[0].email,
                    id:data[0].id,
                }
               const token = jwt.sign(payload,process.env.JWTSECRET ,{
                expiresIn:'2hr'
               }) 
                const {password,...other} = data[0]
                return res.status(200).json({success:true ,token,data:other});
            } else {
                return res.status(403).json({message:"incorrect password"});
            }
        })
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}