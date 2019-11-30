const jwt = require('jsonwebtoken')
const config = require('../configs/jwt-config')
const User = require('../models/User');
function checkCurrentUser(req, userId) {
  let token = ''
  if (req.headers['x-access-token'] || req.headers['authorization']) {
    token = req.headers['x-access-token'] || req.headers['authorization']
  }
  //OAuth 2.0 framework 'bearer' token type
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (!token) return
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return
    User.getUserByEmail(decoded.email, (err, user) => {
        if (err) return;
        if (user.id != userId)
            console.log(`FLAG|Another one's kart|${req.connection.remoteAddress}`)
    })
  })
}

module.exports = checkCurrentUser
