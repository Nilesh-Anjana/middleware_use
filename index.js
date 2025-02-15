const express = require("express");
const fs = require("fs");

const app = express();

//here we are creating a middleware for limiting the excess 
//per second by any user

//first we create a object of an user
let numberofrequestforuser = {};

//we will clear this object in every second

setInterval(() => {
    numberofrequestforuser = {};
    
}, 1000);

//here we are creating a middleware to prevent high no. excess
app.use(function(req,res,next){   //using global middleware
   const userid = req.headers["user-id"];
   if(numberofrequestforuser[userid])
    {
    numberofrequestforuser[userid] = numberofrequestforuser[userid] +1;
      
      if(numberofrequestforuser[userid]>5)
      {
        res.status(404).send("kitni barr ayega bhai, kuch kam kr le");
      }
      else{
        next();  // user can access
      }
      
   }

   //if new user is comming then first make the first create object
   else{
    numberofrequestforuser[userid] = 1;
    next();
   }
})

app.get("/",function(req,res)
{
   res.send("welcome");
})



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
