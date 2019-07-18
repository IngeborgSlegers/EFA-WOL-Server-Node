const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

module.exports = (req, res, next) => {
  if (req.method == 'OPTIONS') {
    next();   //allowing options as a method for request
  } else {
    let sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken) {
      res.status(403).send({ auth: false, message: "No token provided" });
    } else {
      jwt.verify(sessionToken, 'jwt_secret', (err, decoded) => {
        if (decoded) {
          User.findOne({ where: {id: decoded.id } }).then(user => {
            req.user = user;
            console.log(`user: ${user}`)
            next()
          },
            () => {
              res.status(401).send({ error: "Not authorized" });
            })
        } else {
          res.status(400).send({ error: "Really not authorized (can't decode)"})
        }
      })
    }
  }
}