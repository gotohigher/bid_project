const db = require("../util/db");

exports.createJob = (req, res) => {
  const { body } = req;
  body.created_at = new Date();
  body.created_by = req.user.user_email;
  console.log(body);
  let qurey = 'insert into jobs set ?';
  db.query(qurey, body, (err, result) => {
    if ( err ) res.send("database error");
    else {
      res.send(result.insertId);
    }
  });
};

exports.updateJob = (req, res) => {
  const { body } = req;
  let query = `update jobs set ? where id=${body.id}`;
  delete body.id;
  db.query(query, body, (err, result) => {
    if (err) res.send("database error");
    else {
      res.resend(200);
    }
  });
};
