const db = require("../util/db");
const token = require("../util/token");

exports.loginRequired = (req, res, next) => {
  if (!req.header('Authorization')) return res.status(401).send({message: 'Please make sure your request has an Authorization header.'});
  
  // Validate jwt
  let try_token = req.header('Authorization').split(' ')[0];
  token.verifyToken(try_token, (err, payload) => {
    if (err) return res.status(401).send(err);
    let query = 'select * from users where user_email=?';
    console.log(payload);
    db.query(query, payload.sub, (err, result) => {
      if ( err ) {
        res.status(400).send(err);
      } else {
        if(result.length == 0) {
          res.send('no user');
        } else {
          delete user.password;
          req.user = user;
          next();
        }
      }
    })
  })
}