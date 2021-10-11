# vaccination_tracker_node

<h3>run db migration -> npm run migrate <h3>
<h2>API desc and inplementation -> end point<h2>
<h4>1) update user dets with unique aadhar_number and location in body json -> ip/users/updateUser<h4>
<h4>2) returns a report of daily, weekly, monthly, yearly vaccinated users count -> ip/users/userCount<h4>
<h4>3) returns user by by state. state string is passed in body as json -> ip/users/state<h4>
<h4>4) returns vaccinated users' date within a given interval. request accepts start_date and end_date from body json -> ip/users/userByDate <h4>

