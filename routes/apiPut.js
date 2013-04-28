var errorHandler = require('./apiPut');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var NoteGroup = require('../models/noteGroup');
var db = require('../db/db');
var callbacks = require('./callbacks.js');

/**
 * Api Crud operations
 **/
module.exports = function (app) {
    app.put('/composition/:id', function(req, res, next) {
        var compDb = db.compositions;
        var compId = req.param('id');
        var callback = callbacks.dbCallback(req, res);
        compDb.get(compId, { revs_info: false }, function(err, body) {
            if (!err) {
                var comp = Composition.createFromObject(body);
    			var creator = req.body.creator;
		    	if(!(creator === undefined || creator === null)) comp.creator = creator;
		    	var tempo = req.body.tempo;
		    	if(!(tempo === undefined || tempo === null)) comp.tempo = tempo;
		    	var tracks = req.body.tracks;
		    	if(!(tracks === undefined || tracks === null)) comp.tracks = tracks;
		    	var name = req.body.name;
		    	if(!(name === undefined || name === null)) comp.name = name;
		        if(Composition.validate(comp)) {
		            compDb.insert(comp, compId, callback);
		        }
		       	else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });
    
    app.put('/track/:id', function(req, res, next) {
        var trackDb = db.tracks;
        var trackId = req.param('id');
        var callback = callbacks.dbCallback(req, res);
        trackDb.get(trackId, { revs_info: false }, function(err, body) {
            if (!err) {
                var track = Track.createFromObject(body);
		    	var instrument = req.body.instrument;
		    	if(!(instrument === undefined || instrument === null)) track.instrument = instrument;
		    	var noteGroups = req.body.noteGroups;
		    	if(!(noteGroups === undefined || noteGroups === null)) track.noteGroups = noteGroups;
		    	var name = req.body.name;
		    	if(!(name === undefined || name === null)) track.name = name;
		        if(Track.validate(track))
		            trackDb.insert(track, trackId, callback);
		        else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });

	app.put('/notegroup/:id', function(req, res, next) {
        var noteGroupDb = db.noteGroups;
        var noteGroupId = req.param('id');
        var callback = callbacks.dbCallback(req, res);
        noteGroupDb.get(noteGroupId, { revs_info: false }, function(err, body) {
            if (!err) {
                var noteGroup = NoteGroup.createFromObject(body);
		    	var start = req.body.start;
		    	if(!(start === undefined || start === null)) noteGroup.start = start;
		    	var notes = req.body.notes;
		    	if(!(notes === undefined || notes === null)) noteGroup.notes = notes;
		    	var name = req.body.name;
		    	if(!(name === undefined || name === null)) noteGroup.name = name;
		        if(NoteGroup.validate(noteGroup))
		            noteGroupDb.insert(noteGroup, fnoteGroupId, callback);
		        else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });
    

}