const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:{
            type:String,
            required:true,
        },
        body:{
            type:String,
            required:true,
        },
        coverImageURL:{
            type:String,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
},{timestamps:true})

module.exports = mongoose.model("Blog",BlogSchema);