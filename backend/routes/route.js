const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth');
const {auth} = require('../middlewear/middlewear');
const { createPost, getPosts, updatePost, deletePost, getPost, updatePostImage } = require('../controllers/posts');
const { updateDisplayPicture, getUserDetails, getUserPosts } = require('../controllers/userInfo');
router.get('/api/v1',(req,res)=>{
    res.json({success:true});
})

// authentication routes
router.post('/signup',signup)
router.post('/login',login);

// posts routes
router.post('/createPost',auth,createPost);
router.get('/getPosts',getPosts);
router.get('/getPost/:id',getPost);
router.put('/updatePost/:id',auth,updatePost);
router.put('/updatePostImage/:id',auth,updatePostImage);
router.delete('/deletePost/:id',auth,deletePost);

// user info routes
router.put('/updateDisplayPicture',auth,updateDisplayPicture);
router.get('/getUserDetails',auth,getUserDetails);
router.get('/getUserPosts',auth,getUserPosts);
module.exports = router;