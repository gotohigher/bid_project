const { query } = require("express");
const db = require("../util/db");

exports.createBid = (req, res) => {
  const { body } = req;
  console.log(body);
body.del_flag = 0;
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
  let query = `select * from bids where user_id=${req.query.id} and del_flag!=1`;
  db.query(query, (err, result) => {
    if ( err ) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  }); 
};

exports.getById = (req, res) => {
  let query = `select * from bids where id=${req.query.id}`;
  db.query(query, (err, result) => {
    if ( err ) {
      res.send(err);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
};

exports.updateBid = (req, res) => {
  console.log(req.body);
  let query = `update bids set ? where id=${req.query.id}`;
  // delete param.id;
  db.query(query, req.body, (err, result) => {
    if ( err ) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
};

exports.delete = (req, res) => {
  const { param } = req;
  let = `update bids set del_flag=1 where id=${param.id}`;
  db.query(query, (err, result) => {
    if ( err ) {
      res.send(err);
    } else {
      res.sendStatus(200);
    }
  });
};