var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '0.0.0.0',
  user     : 'root',
  password : 'pass',
  database : 'db_rickandmorty'
});
 
connection.connect();
const callQuery = (queryLine, params) => new Promise((resolve, reject) => {
  connection.query(queryLine, params, (error, results) => {
    if(error) {
      reject(error);
      return;
    }

    resolve(results);
  });
});

module.exports = {
  callQuery,
  connection
};