const mongoose = require('mongoose');
const postEmailSchema = new mongoose.Schema({
   
    email:{
    type:String,
    required:true
    },
    query:{
        type:String,
        required:true
    },
});
const postEmail = mongoose.model("postEmail", postEmailSchema);
module.exports = postEmail;