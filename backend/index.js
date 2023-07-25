const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors({
    origin:'http://localhost:5173'
}));
const fileUpload = require('express-fileupload');
const {connectCloudinary} = require('./config/cloudinary');
connectCloudinary();
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const db = require('./config/db');
const route = require('./routes/route');
app.use('/',route)
app.listen(process.env.PORT,()=>{
    console.log(`server is listening at port ${process.env.PORT}`);
})