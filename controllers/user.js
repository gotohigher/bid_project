const db = require("../util/db");

exports.getUsers = (req, res) => {
  let query = 'select * from users';
  db.query(query, (err, result) => {
    if ( err ) {
      res.send('database error');
    } else {
      res.send(result);
    }
  })
}