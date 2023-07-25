const db = require("../config/db");
const { uploadToCloudinary } = require("../utils/cloudinary");
require('dotenv').config();

exports.getUserDetails = async(req,res)=>{
    try {
        const id = req.user.id
        const q = "SELECT * FROM user WHERE id = ?";
        db.query(q,[id],(err,data)=>{
            if(err) return res.status(500).json({
                success:false,
                message:err.message
            });
            res.status(200).json({
                success:true,
                data:data
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const { image } = req.files;
    const  id  = req.user.id;
    if (!image) {
      return res.status(401).json({
        success: false,
        message: "IMAGE IS REQUIRED",
      });
    }
    const imageUpload = await uploadToCloudinary(
      image,
      process.env.CLOUDINARY_FOLDER
    );
    const q = "UPDATE user SET `image` = ? WHERE id = ?";
    db.query(q, [imageUpload.secure_url,id], (err, data) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      return res.status(200).json({
        success: true,
        message: data,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPosts = async(req,res)=>{
    try {
        const id = req.user.id
        const q  = 'SELECT * FROM posts WHERE posts.userId = ?'
        db.query(q,[id],(err,data)=>{
            if(err) return res.status(500).json({
                success:false,
                message:err.message
            });
            res.status(200).json({
                success:true,
                data:data
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}