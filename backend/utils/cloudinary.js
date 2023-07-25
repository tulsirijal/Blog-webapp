const cloudinary = require('cloudinary').v2;
exports.uploadToCloudinary = async(file,folder)=>{
   const options = {folder}
   return await cloudinary.uploader.upload(file.tempFilePath,options);
}