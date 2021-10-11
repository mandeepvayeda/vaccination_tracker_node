var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_user',
  multipleStatements: true
});

connection.connect((err) =>{
	if(err){
		throw err
		console.log("error in connecting to database");
	}
	console.log("connected");
})

module.exports = connection;