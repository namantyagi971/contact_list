// require the library
const mongoose=require('mongoose');

const mongodbURL = process.env.MONGODB_URL || 'mongodb://localhost/contacts_list_db'
// conecting to the database
mongoose.connect(mongodbURL,{useNewUrlParser:true,useUnifiedTopology:true});

// acquire the  connection (to check if successfully running or not)
const db=mongoose.connection;

// if error occurs
db.on('error',console.log.bind(console,'error occured'));

// if up and running then print the message
db.once('open',function(){
     console.log("Successfully connected to the database");
});