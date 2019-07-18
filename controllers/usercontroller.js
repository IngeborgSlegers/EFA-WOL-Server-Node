const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const User = sequelize.import('../models/user');

router.post('/signup', (req, res) => {
  User.create({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10)
  })
  .then(
    signupSuccess = (user) => {
      let token = jwt.sign({ id: user.id }, 'jwt_secret', { expiresIn: 60 * 60 * 24 });
      res.status(200).json({
        user: user,
        token: token,
        message: 'User created'
      })
    },
    signupFail = (err) => {
      res.status(500).send(err.message)
    }
  )
})

router.post('/signin', (req, res) => {
  User.findOne({ where: { email: req.body.user.email } })
  .then(user => {
    if(user) {
      bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
        if(matches) {
          let token = jwt.sign({ id: user.id }, 'jwt_secret', { expiresIn: 60 * 60 * 24 })
          res.json({
            user: user,
            sessionToken: token,
            message: 'User logged in'
          });
        } else {
          res.status(502).send({ error: 'Passwords do not match' })
        }
      })
    } else {
      res.status(403).send({ error: 'User not found'})
    }
  })
})

module.exports = router;