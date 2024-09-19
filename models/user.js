const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"This email already exists"],
    },
    // salt:{  //to hash password
    //     type:String,
    //     required:true,
    // },
    password:{
        type:String,
        required:true,
    },
    profileImgURL:{
        type:String,
        default:'/images/default_img.png',
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default:"USER",
    }
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema);