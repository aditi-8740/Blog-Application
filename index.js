const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const Blog = require('./models/blogs');
const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
.then(console.log('MongoDB connected..'))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.static('./public'));    //public folder me jo bi ha, ausse statically serve kar doo...
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie)   //ERROR:-  app.use(checkForAuthenticationCookie()) not like this OK?

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({ }) ;
    res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
}) 
app.use('/user',userRouter);
app.use('/blog',blogRouter);
app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})  
//Cloud Providers hume runtime pr PORT dete ha.
// Environment variables are set kiye jate ha CLOUD ke dwara.
//Make sure you have a 'script' start in your package.json, COZ cloud providers run npm start automatically..
