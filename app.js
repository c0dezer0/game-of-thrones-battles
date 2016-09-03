var express = require('express');
var config = require('./config');
var app = express();

app.get('/ping', (req, res)=>{
	res.send("pong");
});

app.listen(config.port, ()=>{
	console.log('Magic Happening on '+config.host+":"+config.port);
});