var errorHandler = require('./api');
var Composition = require('../models/composition.js');

// TODO Move the connection string to a common location
var nano = require('nano')('http://localhost:5984');

/**
 * Api Crud operations
 **/
module.exports = function (app) {
    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        var comp_db = nano.db.use('composition');
        comp_db.get(comp_id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
        });
    });

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');
        var db = nano.db.use('tracks');
        db.get(id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
        });
    });
    
    app.get('/note_group/:id', function(req, res, next) {
        var id = req.param('id');
        var db = nano.db.use('note_groups');
        db.get(id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
        });
    });

    app.post('/composition', function(req, res, next) {
	console.log(req.body);
        var comp_db = nano.db.use('composition');	
	var comp = Composition.create(req.body);
	if(Composition.validate(comp)) {
	    comp_db.insert(comp);
	    res.json({"OK": true});
	} else {
	    res.json({"OK": false});
	}
    });

    /**  GET, POST, PUT, DELETE **/

}