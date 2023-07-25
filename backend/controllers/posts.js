const db = require('../config/db');
const { uploadToCloudinary } = require('../utils/cloudinary');
exports.createPost = async(req,res)=>{
    try {
        const id = req.user.id
        const {title,description} = req.body;
        const {image} = req.files;
        if(!title || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        }
        const imageUpload = await uploadToCloudinary(image,process.env.CLOUDINARY_FOLDER);
        console.log(imageUpload)
        const values = [title,description,imageUpload.secure_url,id]
        const q = "INSERT INTO posts(`title`,`description`,`image`,`userId`) VALUES(?)"
        db.query(q,[values],(err,data)=>{
            if(err) return res.json({
                success:false,
                message:err
            })
            res.status(200).json({
                success:true,
                message:data
            })
        })
    } catch (error) {
        
    }
}
exports.updatePost = async(req,res)=>{
    try {
     const postId = req.params.id
     const userId = req.user.id
     const {title,description} = req.body;
     
     const values = [title,description,userId]
     const q = "UPDATE posts SET `title` = ?,`description` = ?,`userId` = ? WHERE id = ?"
     db.query(q,[...values,postId],(err,data)=>{
        if(err) return res.json({
            success:false,
            message:err.message
        })
        res.status(200).json({
            success:true,
            message:data
        })
     })
     } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.updatePostImage = async(req,res)=>{
    try {
        const postId = req.params.id
        const image = req.files.image
        const imageUpload = await uploadToCloudinary(image,process.env.CLOUDINARY_FOLDER);
        const values = [imageUpload.secure_url]
     const q = "UPDATE posts SET `image` = ? WHERE id = ?"
     db.query(q,[...values,postId],(err,data)=>{
        if(err) return res.json({
            success:false,
            message:err.message
        })
        res.status(200).json({
            success:true,
            message:data
        })
     })
    } catch (error) {
        console.log(error.message);
        res.status(200).json({
            success:false,
            message:error.message
        })
    }
}
exports.deletePost = async(req,res)=>{
    try {
        const postId = req.params.id
        const userId = req.user.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ? "
        db.query(q,[postId,userId],(err,data)=>{
            if(err) return res.status(401).json({
                success:false,
                message:err.message
            })
            res.status(200).json({
                success:true,
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.getPost = async(req,res)=>{
    try {
        const postId = req.params.id
        const q = "SELECT p.id as postId, p.image as postImage, p.title, p.description,u.id as uid,u.image as userImage,u.name,u.email  FROM blog.posts as  p JOIN user as u ON p.userId = blog.u.id WHERE p.id = ?";
        db.query(q,[postId],(err,data)=>{
            if(err) return res.status(500).json({
                success:false,
                message:err.message
            })
            res.status(200).json({
                success:true,
                message:data
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.getPosts = async(req,res)=>{
    try {
        const q = "SELECT * FROM posts";
        db.query(q,(err,data)=>{
            if(err) return res.json({message:err.message});
            res.status(200).json({
                success:true,
                message:data
            })
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
