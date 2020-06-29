const express = require('express');
const User = require('../models/user');
const router = express.Router();
const passwordHash = require('password-hash');


//POST /users/create
router.post('/create', (req,res) => {
  User.create({
    name: req.body.name,
    gender: req.body.gender,
    contact: req.body.contact,
    login: {password: passwordHash.generate(req.body.password)}
  }).then(user => {
    res.json({
      message: 'success',
      user
    });
  }).catch(err => res.json({
    message: 'error',
    err
  }));
});

router.get('/:name/', (req,res) => {
  User.findOne({name: req.params.name})
        .exec()
        .then(user => {
          res.json({
            name: user.name,
            gender: user.gender,
            contact: user.contact
          });
        })
        .catch(err => res.json({
          message: 'Not found',
          err
        }));
})

module.exports = router;
