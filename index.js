const express =require("express");
const path = require("path");
const multer = require('multer');
const fs = require("fs");
const port = 8000;
const db = require('./config/mongoose');
// const upload = require('./model/user');
const blogWebsite = require('./model/blogwebsiteapp');
const postEmail = require('./model/postemail');
const bodyParser = require("body-parser");
const { request } = require("http");
const app = express();
app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));




// app.get("/", express.static(path.join(__dirname, "./public")));
app.get('/',function(req,res){
   blogWebsite.find({},function(err,blogwebsite){
       if(err){
           console.log("Error in fetching the Blog!");
           return;
       }
       return res.render("home",{
           title:"NewsFeed",
           blogwebsiteapp:blogwebsite,
       });
   });
});
app.post('/tech-blog',function(req,res){
    blogWebsite.create({
        Tagline:req.body.Tagline,
        Details:req.body.Details,
    },function(err,newBlog){
        if(err){
            console.log("error in creating a Blog!");
            return;
        }
        console.log("*****",newBlog);
        return res.redirect('back');
    });
});
app.get('/',function(req,res){
    postEmail.find({},function(err,postquery){
        if(err){
            console.log("Error in fetching the Blog!");
            return;
        }
        return res.render("home",{
            title:"Tech Blog",
            postemail:postquery,
        });
    });
 });
app.post('/post-query',function(req,res){
    postEmail.create({
        email:req.body.email,
        query:req.body.query,
    },function(err,queries){
        if(err){
            console.log("error in posting query");
            return;
        }
        console.log("*****",queries);
        return res.redirect('back');
    });
});
// app.post('/post-feedback', function (req, res) {
    // db.then(function(db) {
    //     delete req.body._id; // for safety reasons
    //     db.collection('feedbacks').insertOne(req.body);
    // });    
    // res.send('Data received:\n' + JSON.stringify(req.body));
// });

// app.get('/view-feedbacks',  function(req, res) {
//     db.then(function(db) {
//         db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
//             res.status(200).json(feedbacks);
//         });
//     });
// });
app.get("/delete-blog",function(req,res){
    let id =  req.query.id;
    blogWebsite.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting the blog.");
            return;
        }
        return res.redirect('back');
    });
});
app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
    }
    console.log("server is running on port ",port);
});



