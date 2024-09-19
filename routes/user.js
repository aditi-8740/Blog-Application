const { Router } = require("express");
const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const router = Router();
const {createTokenForUser,
    validateToken
} = require('../services/authentication')

router.get('/signin',(req,res)=>{
    return res.render("signin")
})

router.get('/signup',(req,res)=>{
    return res.render("signup")
})

router.post('/signup', async (req,res)=>{
    const {fullname, email , password } = req.body;
    const hashedPassword = await bcrypt.hash(password,10); 
    const createdUser = await User.create({
        fullname:fullname,
        email:email,
        password: hashedPassword,
    });
    req.user= createdUser;
    return res.redirect('/');
})

router.post('/signin', async (req,res)=>{
    const {email , password } = req.body;
    const foundUser = await User.findOne({email: email});
    if (!foundUser) {
        return res.status(400).json("Invalid email or password")
    }
    if(!(await bcrypt.compare(password,foundUser.password))){
        return res.status(400).redirect('/user/signin')
    }
    console.log("USER found with LOGIN details- ",foundUser);
    const token = createTokenForUser(foundUser);
    res.cookie('token',token,{
        domain:"localhost"
    });
    console.log("token generated: ",token);
    res.redirect('/');
})

router.get("/logout",(req,res)=>{
    res.clearCookie('token').redirect('/');
})

module.exports = router;