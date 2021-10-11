const connection = require('./config');

//run this migration file separately on terminal to create tables.

connection.query('CREATE TABLE USERS(id int AUTO_INCREMENT,user_name varchar(100),token varchar(20) UNIQUE,aadhar_number varchar(12) UNIQUE, ip_address varchar(255), location varchar(20),status BIT(1),created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(id) )', (error, results, fields) => {
  if (error) throw error;
  console.log('table created');
}); 