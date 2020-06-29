var express = require('express');
var JWT = require('jsonwebtoken');
var User = require('../models/user');
var router = express.Router();
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to blog api"
  })
});



router.post('/login', (req,res) => {
  var name = req.body.name;
  if(!name){
    res.sendStatus(403);
  }

  User.findOne({name: name})
      .exec()
      .then( (user) => {
        var hash = user.login.password;
        if(passwordHash.verify(req.body.password,hash)){
          JWT.sign({user}, 'secretkey', (err,token) => {
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





module.exports = router;
