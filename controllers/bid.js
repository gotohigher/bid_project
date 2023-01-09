const db = require("../util/db");

exports.createBid = (req, res) => {
  const { body } = req;
  let query = 'insert into bids set ?';
  db.query(query, body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result.insertId);
    }
  });
};