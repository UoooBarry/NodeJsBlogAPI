var express = require('express');
var JWT = require('jsonwebtoken');
var Article = require('../models/article');
var router = express.Router();

router.post('/post', verifyToken, (req,res) => {
    JWT.verify(req.token, 'secretkey', (err, authData) => {
      if(err){
        res.sendStatus(403);
      }else{
        Article.create({
          title: req.body.title,
          author: authData.user.name,
          content: req.body.content,
          created_at: new Date()
        }).then(res.json({
          message: 'Post created',
        }))
        .catch(err => console.log(err))      
      }
    });
});

router.get('/', (req,res) => {
  Article.find({})
          .exec()
          .then ( articles => res.json({articles}))
          .catch( err => console.log(err));
})

router.get('/:id/', (req,res) => {
  Article.findById(req.params.id)
          .exec()
          .then((article)=>{
            res.json({
              article
            });
          })
          .catch(err => res.json({
            message: 'Not found'
          }))
})

router.delete('/:id/',verifyToken, (req,res) => {
  Article.findOneAndDelete({_id : req.params.id})
          .then(article => {
            res.json({
              message: 'success'
            })
          })
          .catch( err => res.json({message: 'error'}));
})
//format of token
//Authorization: test <access_token>
//verify Token
function verifyToken(req,res,next){
    //Get auth header
    const header = req.headers['authorization'];
    //Check exsit
    if(typeof header !== 'undefined'){
      //Spilt at the space 
      var token = header.split(' ')[1];
      // Set the token
      req.token = token;
      // Next
      next();
    }else{
      console.log('auth err');
      //Forbidden
      res.sendStatus(403);
    }
}

module.exports = router;
  