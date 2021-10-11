const express = require('express');
const connection = require('./config');
const users = require('./user');

var port =  3000;

const app = express();

app.set('trust proxy', true)

app.use(express.json());
app.use('/users', users);

app.listen(port);