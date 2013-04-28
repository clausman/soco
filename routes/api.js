var errorHandler = require('./api');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')

/**
 * Object that returns callbacks to be used with db calls
 * Create DbCallback in route with req and res 
 * objCreator takes response from DB and formats it to be sent back
 * Then pass onComplete as callback to db call
 * PARAMS:
 *   req: request object
 *   res: response object
 *   objCreator: createFromObject from a model (required when handling GET);
*/
var DbCallback = function(req, res, objCreator) {
    var _this = this;

    if(req.method === 'GET' && typeof objCreator === 'undefined') {
        throw "objCreator not defined in DbCallback for GET request";
    }

    this.successfulPost = function(err, body) {
        console.log("Successful post");
        console.log(body);
        res.send(201, req.path + "/" + body.id);
    };

    this.failedPost = function(err, body) {
        console.log("Failed post.");
        console.log(err);
        res.send(500, "Failed post: " + err);
    };

    this.successfulGet = function(err, body) {
        console.log("Successful get: " + body);
        res.send(objCreator(body));
    };

    this.failedGet = function(err, body) {
        console.log("Failed GET.");
        console.log(err);
        res.send(500, { error: err});
    };

    // Return the correct db call back based on the response
    this.onComplete = function(err, body) {
        if(req.method === 'GET') {
            if(err) _this.failedGet(err, body);
            else _this.successfulGet(err, body);
        } else if(req.method === 'POST') {
            if(err) _this.failedPost(err, body);
            else _this.successfulPost(err, body);
        }
    }

    return this.onComplete;
}

/**
 * Api Crud operations
 **/
module.exports = function (app) {
	app.get('/composition', function(req, res, next) {
		db.compositions.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			}
		});
	});

	app.get('/track', function(req, res, next) {
		db.tracks.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			}
		});
	});

	app.get('/note_group', function(req, res, next) {
		db.noteGroups.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			}
		});
	});
	
    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        var callback = DbCallback(req, res, Composition.createFromObject);
        db.compositions.get(comp_id, { revs_info: true }, callback);
    });

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');        
        var callback = DbCallback(req, res, Track.createFromObject);
        db.tracks.get(id, { revs_info: true }, callback);
    });
    
    app.get('/note_group/:id', function(req, res, next) {
        var id = req.param('id');
        var callback = DbCallback(req, res, NoteGroup.createFromObject);
        db.noteGroups.get(id, { revs_info: true }, callback);
    });

    app.post('/composition', function(req, res, next) {
        var comp = Composition.createFromObject(req.body);
        var callback = DbCallback(req, res);
        if(Composition.validate(comp)) {
            db.compositions.insert(comp, null, DbCallback(req, res));
        } else {
            res.send(400);
        }
    });
    
    app.post('/track', function(req, res, next) {
	    var track = Track.createFromObject(req.body);
	    var callback = DbCallback(req, res);
        if(Track.validate(track)) {
            db.tracks.insert(track, null, callback);
	    } else {
	        res.send(400);
	    }
    });
    
    app.post('/note_groups', function(req, res, next) {
	    var noteGroup = NoteGroup.createFromObject(req.body);
        var callback = DbCallback(req, res);
	    if(NoteGroup.validate(noteGroup)) {
            db.noteGroups.insert(noteGroup, null, callback);
	    } else {
	        res.send(400);
	    }
    });
    
}