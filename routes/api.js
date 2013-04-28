var errorHandler = require('./api');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var db = require('../db/db')

/**
 * Api Crud operations
 **/
module.exports = function (app) {
	app.get('/composition', function(req, res, next) {
		var comp_db = nano.db.use('composition');
		comp_db.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			}
		});
	});
	
    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        db.compositions.get(comp_id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
            else
                res.send(500, {error: err})
        });
    });

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');        
        db.tracks.get(id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
            else
                res.send(500, {error:err})
        });
    });
    
    app.get('/note_group/:id', function(req, res, next) {
        var id = req.param('id');
        db.noteGroups.get(id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
            else
                res.send(500, {error:err})
        });
    });

    app.post('/composition', function(req, res, next) {
        var comp_db = nano.db.use('composition');	
	var comp = Composition.createFromObject(req.body);
	if(Composition.validate(comp)) {
	    comp_db.insert(comp);
	    res.json({"OK": true});
	} else {
	    res.json({"OK": false});
	}
    });

    app.post('/track', function(req, res, next) {
        var track_db = nano.db.use('track');	
	var track = Track.createFromObject(req.body);
	if(Track.validate(track)) {
	    track_db.insert(track);
	    res.json({"OK": true});
	} else {
	    res.json({"OK": false});
	}
    });

    app.post('/note_group', function(req, res, next) {
        var note_group_db = nano.db.use('note_group');	
	var note_group = Note_Group.createFromObject(req.body);
	if(Note_Group.validate(note_group)) {
	    note_group_db.insert(note_group);
	    res.json({"OK": true});
	} else {
	    res.json({"OK": false});
	}
    });


    /**  GET, POST, PUT, DELETE **/

}