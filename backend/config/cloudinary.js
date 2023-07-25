const cloudinary = require("cloudinary").v2;
require('dotenv').config();

exports.connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_APIKEY,
      api_secret: process.env.CLOUD_APISECRET,
    });
  } catch (error) {
    console.log(error);
  }
};
