var errorHandler = require('./api');

// TODO Move the connection string to a common location
var nano = require('nano')('http://localhost:5984');

/**
 * Api Crud operations
 **/
module.exports = function (app) {
	app.get('/composition', function(req, res, next) {
		var comp_db = nano.db.use('composition');
		comp_db.list({ revs_info: false, value: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			}
		});
	});
	
    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        var comp_db = nano.db.use('composition');
        comp_db.get(comp_id, { revs_info: false }, function(err, body) {
            if (!err)
                res.json(body)
        });
    });

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');
        var db = nano.db.use('tracks');
        db.get(id, { revs_info: false }, function(err, body) {
            if (!err)
                res.json(body)
        });
    });
    
    app.get('/note_group/:id', function(req, res, next) {
        var id = req.param('id');
        var db = nano.db.use('note_groups');
        db.get(id, { revs_info: false }, function(err, body) {
            if (!err)
                res.json(body)
        });
    });

  
    /**  GET, POST, PUT, DELETE **/


}