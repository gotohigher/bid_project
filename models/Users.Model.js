const sql = require("../util/db");

const User = (table) => {
  table = table;
}

User.insert = (data, result) => {
  sql.query(`INSERT INTO users SET ?`, data, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err);
      return;
    }
    result(res);
  });
}

module.exports = User;