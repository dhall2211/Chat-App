const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'chatapp',
  password : 'SDw.VN0az2bV1:TVr3caQo',
  database : 'chatapp'
});
module.exports = connection;