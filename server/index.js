var express = require('express');
var config = require('../config');
var app = express();

var data = require('./data').init(app);
var api = require('./api').init(app);

app.get('/ping', (req, res)=>{
	res.send("pong");
});

module.exports = app;