const db = require("../util/db");

exports.createBid = (req, res) => {
  const { body } = req;
  console.log(body);
  let query = 'insert into bids set ?';
  db.query(query, body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
};

exports.getAll = (req,res) => {
  let query = `select * from bids where user_id=${req.query.id}`;
  db.query(query, (err, result) => {
    if ( err ) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.updateBid = (req, res) => {
  const { param } = req;
  let query = `update bids set ? where id=${param.id}`;
  delete param.id;
  db.query(query, param, (err, result) => {
    if ( err ) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
};