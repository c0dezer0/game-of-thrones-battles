var MongoClient = require('mongodb').MongoClient;
var config = require('../../config');

var output = (err, data)=>{
	return {
		error: err||'',
		data : data||''
	};
}
module.exports = {
    listPlaces: function(req, res) {
        MongoClient.connect(config.db.url, function(err, db) {
            if(!err){
            	db.collection(config.db.collection).find({}).toArray((err, list)=>{
            		res.send(output(err, list));
            	});
            }
            else{
            	res.send(output(err));
            }
        });
    }
}
