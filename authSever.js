require('dotenv').config();
const express = require('express');
const app = express();
var JWT = require('jsonwebtoken');
var User = require('./models/user');
var passwordHash = require('password-hash');
var mongo = require('./config/mongo');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/login', (req,res) => {
    var name = req.body.name;
    if(!name){
      res.sendStatus(403);
    }
  
    User.findOne({name: name})
        .exec()
        .then( (user) => {
          var hash = user.login.password;
          if(passwordHash.verify(req.body.password,hash)){
            JWT.sign({user}, process.env.ACCESS_TOKEN_SECRET, (err,token) => {
              if(err){
                console.log(err);
              }
              res.json({
                token,
                name: name,
                message: 'success'
              });
            });
          }else{
            res.sendStatus(403);
          }
        } 
       )
       .catch(err => console.log(err)) 
  });

  //catch database connection
mongo.once('open',function(){
    console.log("Database connected successfully.");
});

app.listen(4000, ()=> console.log("Auth sever is running on port 4000"))