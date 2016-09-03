var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var config = require('../../config');

var output = (err, data) => {
    return {
        error: err || '',
        data: data || ''
    };
}

var compileToInt = function(query) {
    for (key in query) {
        if (!isNaN(query[key])) {
            query[key] = Number(query[key]);
        }
    }
    return query;
}

module.exports = {

    listPlaces: function(req, res) {
        MongoClient.connect(config.db.url, function(err, db) {
            if (!err) {
                db.collection(config.db.collection).find({}).toArray((err, list) => {
                    list = list.map(function(d) {
                        d.url = '/api/list/' + d._id;
                        return d;
                    });
                    res.send(output(err, list));
                    db.close();
                });
            } else {
                res.send(output(err));
            }
        });
    },

    detailPlace: function(req, res) {
        var id = req.params.id || '';
        MongoClient.connect(config.db.url, function(err, db) {
            if (!err) {
                db.collection(config.db.collection).findOne({ _id: ObjectId(id) }, (err, list) => {
                    res.send(output(err, list));
                    db.close();
                });
            } else {
                res.send(output(err));
            }
        });
    },

    countPlaces: function(req, res) {
        var query = compileToInt(req.query);

        MongoClient.connect(config.db.url, function(err, db) {
            if (!err) {
                db.collection(config.db.collection).count(query, (err, count) => {
                    res.send(output(err, { count: count, query: query }));
                    db.close();
                });
            } else {
                res.send(output(err));
            }
        });
    },

    search: function(req, res) {
        var query = compileToInt(req.query);

        MongoClient.connect(config.db.url, function(err, db) {
            if (!err) {
                db.collection(config.db.collection).find(query).toArray((err, data) => {
                    if (data.length == 0) {
                        err = 'No match found';
                    }
                    res.send(output(err, data));
                    db.close();
                });
            } else {
                res.send(output(err));
            }
        });

    }

}
