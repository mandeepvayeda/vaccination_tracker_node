const router = require('express').Router();
const connection = require('./config');


//gets all entries in database.
//default route
//endpoint:ip/users
router.get("/", (req, res) => {
	
	connection.query('SELECT * FROM USERS WHERE status = 1', (error, results, fields) => {
		if(error){
			console.log(error);
			throw error
		}
		res.send(results);
	});
})


//create user with unique aadhar_number and location in body json.
//endpoint : ip/users/updateUser

router.post("/updateUser", (req, res) => {
	var ip = req.ip
	var token = req.headers.token
	
	let values = {	aadhar_number:req.body.aadhar_number, 
					ip_address:ip,
					status : 1,
					location:req.body.location
				};
	 
	connection.query('UPDATE users SET ? WHERE token = ? ',[values, token], (error, results, fields) => {
		if(error){
			throw error;
			console.log(error);
		}
		res.send('user details updated');
	});
})


//returns a report of daily, weekly, monthly, yearly vaccinated users count
//endpoint:ip/users/userCount
 
router.get("/userCount", (req, res) => {
	
	
	connection.query('SELECT COUNT(id) FROM users where status = 1 AND updated_at > now() - INTERVAL 1 day; SELECT COUNT(id) FROM users where status = 1 AND updated_at > now() - INTERVAL 7 day;SELECT COUNT(id) FROM users where status = 1 AND updated_at > now() - INTERVAL 30 day;SELECT COUNT(id) FROM users where status = 1 AND updated_at > now() - INTERVAL 365 day', function (error, results, fields) {
		if(error){
			throw error
			console.log(error)
		}
		var report = {};
		report.daily_count = results[0][0]["COUNT(id)"]
		report.weekly_count = results[1][0]["COUNT(id)"]
		report.monthly_count = results[2][0]["COUNT(id)"]
		report.yearly_count = results[3][0]["COUNT(id)"]

		res.json(report)
	
	})
	
	
})


//get user by state
// state string is passed in body as json
//endpoint:ip/users/state
 
router.get("/state", (req, res) => {
	let state = req.body.state;
	
	connection.query('SELECT id,user_name,aadhar_number,ip_address,location FROM users WHERE status = 1 AND location = ?', state, (error, results, fields) => {
		if (error){
			throw error
			console.log(error);
		}
		res.json(results)
	})
})


//gets vaccinated users' date within a given interval
// request accepts start_date and end_date from body json
// endpoint: ip/users/userByDate

router.get("/userByDate", (req, res) => {
	let start_date = req.body.start_date
	let end_date = req.body.end_date
	console.log(start_date)
	
	connection.query('SELECT id,user_name,aadhar_number,ip_address,location FROM users where status = 1 AND DATE(updated_at) BETWEEN ? AND ?', [start_date, end_date], (error, results, fields) => {
		if (error){
			throw error
			console.log(error);
		}
		res.json(results)
	})
})


module.exports = router;