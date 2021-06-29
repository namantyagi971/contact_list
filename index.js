const express=require('express');
const port=8000;

// connecting to mongoose.js

const db=require('./config/mongoose');
 
// connecting to file contact.js

const Contact = require('./models/contact'); 

const app=express();
const path=require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

// using middleware for including static files like css,js
app.use(express.static('assets'));

// // middleware 1
// app.use(function(req,res,next){
//     req.MyName="Naman Tyagi";
//     // console.log("Middleware 1 called");
//     next();
// });

// // middleware 2
// app.use(function(req,res,next){
//     console.log("My Name in Middleware 2 : ",req.MyName);
//     // console.log("Middleware 2 called");
//     next();
// });

var contactlist=[
    {
        name:"Naman Tyagi",
        phone:"9625880379"
    },
    {
        name:"Harshit Raj Raghav",
        phone:"9650788080"
    },
    {
        name:"Parupalli Vamsi",
        phone:"9851364726"
    }
]

app.get('/',function(req,res){
    // console.log("My Name in get Controller : ",req.MyName);

    // fetching data from database and displaying the contacts
    Contact.find({},function(err,contacts){
             if(err)
             {
                console.log("data cannot be fetched as error occured");
                return;
             }
             return res.render('home', {
                title:"My Contacts List",
                contact_list:contacts,
            }); 
    });

    // displaying data without using database 
    // return res.render('home', {
    //     title:"My Contacts List",
    //     contact_list:contactlist,
    // });
});

// creating the contact

app.post('/create-contact',function(req,res){
    //   contactlist.push({
    //       name:req.body.name,
    //       phone:req.body.phone,
    //   });
    //   return res.redirect('back');

    // permanently stored in database
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newcontact){
        if(err)
        {
            console.log("permanent storage cannot be done as error occured");
            return;
        }
        console.log("hurrah!!!******",newcontact);
        return res.redirect('back');


    })
});

// deleting the contact

app.get('/delete-contact/',function(req,res){
    // parameter method  
    // but in route : '/delete-contact/:phone'
    // console.log("Request Paramente phone : ",req.params);

    // // query method
    // // route : '/delete-contact/'
    //  console.log("query parameter : ",req.query);
    //  let phone=req.query.phone;
    //  // findIndex is a javascript function (in this contact starts from 0 to till sizeof array-1 and checking)
    //  let contactindex=contactlist.findIndex(contact => contact.phone==phone);
    //  if(contactindex!=-1)
    //  {
    //      contactlist.splice(contactindex,1);
    //  }

    // deleting contact from database

    let id = req.query.id;
     
    Contact.findByIdAndDelete(id,function(err){
             
        if(err)
        {
            console.log("error in deleting from database");
            return;
        }
        return res.redirect('back');
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let's play with ejs"
    });
});
app.listen(port,function(err){
    if(err)
    {
        console.log("error occured",err);
        return;
    }
    console.log("Yup! Server is running on port : ",process.env.PORT);
});
