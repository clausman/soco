var errorHandler = require('./apiPost');

var Composition = require('../models/composition');
var Track = require('../models/track');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')

/**
 * Api Crud operations
 **/
module.exports = function (app) {

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

}