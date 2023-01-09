const db = require("../util/db");
const token = require("../util/token");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signin = async (req, res) => {
  try {
    const { body }= req;
    let query = 'select * from users where user_email=?';
    db.query(query, body.user_email, (err, result) => {
      if ( err ) {
        res.status(400).send(err);
      } else {
        if(result.length == 0) {
          res.send("no user")
        }
        else {
          console.log(result[0].password);
          bcrypt.compare(body.password, result[0].password)
            .then(result => {
              if( result ) {
                res.send(token.generateToken(body));
              } else {
                res.send("incorrect password")
              }
            })
            .catch( err => res.send(err));
        }
      }
    })
  } catch (e) {

  }
};

exports.signup = async (req, res) => {
  const { body } = req;
  try  {
    let query = 'select * from users where user_email=?';
    body.created_at = new Date();
    const hash = await bcrypt.hash(body.password, saltRounds);
    db.query(query, body.user_email, (err, result) => {
      if ( err ) {
        res.status(400).send(err);
      } else {
        if(result.length > 0) {
          return res.send("Deplication user")
        }
        else if ( body.password != body.checkpassword ) {
          return res.send("incorrect password");
        }
      }
      body.password = hash;
      delete body.checkpassword;
      query = 'insert into users set ?';
      db.query(query, body, (err, result) => {
        res.send("3");
      })
    })
    token.generateToken(body);
  } catch (err) {

  }
};