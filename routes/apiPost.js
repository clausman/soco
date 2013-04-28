var errorHandler = require('./apiPost');

var Composition = require('../models/composition');
var Track = require('../models/track');
var NoteGroup = require('../models/noteGroup');
var db = require('../db/db');
var callbacks = require('./callbacks.js');

/**
 * Api Crud operations
 **/
module.exports = function (app) {

    app.post('/composition', function(req, res, next) {
        var comp = Composition.createFromObject(req.body);
        var callback = callbacks.dbCallback(req, res);
        if(Composition.validate(comp)) {
            db.compositions.insert(comp, null, callback);
        } else {
            res.send(400);
        }
    });
    
    app.post('/track', function(req, res, next) {
	    var track = Track.createFromObject(req.body);
	    var callback = callbacks.dbCallback(req, res);
        if(Track.validate(track)) {
            db.tracks.insert(track, null, callback);
	    } else {
	        res.send(400);
	    }
    });
    
    app.post('/notegroup', function(req, res, next) {
	    var noteGroup = NoteGroup.createFromObject(req.body);
        console.log(noteGroup);
        var callback = callbacks.dbCallback(req, res);
	    if(NoteGroup.validate(noteGroup)) {
            db.noteGroups.insert(noteGroup, null, callback);
	    } else {
	        res.send(400);
	    }
    });

}