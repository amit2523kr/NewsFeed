const mongoose = require('mongoose');
const blogWebsiteSchema = new mongoose.Schema({
    Tagline:{
        type:String,
        required:true
    },
    Details:{
        type:String,
        required:true
    },
   
});
const blogWebsite = mongoose.model("blogWebsite", blogWebsiteSchema);
module.exports = blogWebsite;