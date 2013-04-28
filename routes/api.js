var errorHandler = require('./api');
var Composition = require('../models/composition.js');
var Track = require('../models/track.js');

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