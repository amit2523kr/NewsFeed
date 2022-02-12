const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogwebsite_db");

// connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to the dtabase"));
db.once('open',function(){
    console.log("successfully connected to the database");
})