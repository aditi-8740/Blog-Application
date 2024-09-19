const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require('path');
const Blog = require('../models/blogs');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage });

router.get('/:id', async (req,res)=>{
    const foundBlog = await Blog.findById(req.params.id).populate('createdBy');     //console.log(foundBlog);
    const comments = await Comment.find({BlogId: req.params.id}).populate('createdBy');   //console.log(comments);  //Array of Comments on this Blog
    res.render("blog",{
      blog : foundBlog,
      user: req.user,
      comments,
    }) 
})

router.get('/', (req,res)=>{
    res.render("addBlog",{user:req.user});
})

router.post('/comment/:blogId', async (req,res)=>{  
  const createdComment = await Comment.create({
    content : req.body.content,
    BlogId : req.params.blogId ,
    createdBy : req.user._id,
  });    console.log(createdComment);
  return res.redirect(`/blog/${req.params.blogId}`);
})

router.post('/add-new', upload.single('coverImage'), async (req,res)=>{   console.log(req.file);
    const { title, body } = req.body;    console.log(req.body);
    const createdBlog = await Blog.create({
        title : title,
        body : body,
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${createdBlog._id}`);

})
 
module.exports = router;
