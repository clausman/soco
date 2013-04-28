var errorHandler = require('./apiPut');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')

/**
 * Api Crud operations
 **/
module.exports = function (app) {
    app.put('/composition/:id', function(req, res, next) {
        var comp_db = db.compositions;
        var comp_id = req.param('id');
        var comp = {};
        comp_db.get(comp_id, { revs_info: false }, function(err, body) {
            if (!err) {
                comp = Composition.createFromObject(body);
    			var creator = req.body.creator;
		    	if(!(creator === undefined || creator === null)) comp.creator = creator;
		    	var tempo = req.body.tempo;
		    	if(!(tempo === undefined || tempo === null)) comp.tempo = tempo;
		    	var tracks = req.body.tracks;
		    	if(!(tracks === undefined || tracks === null)) comp.tracks = tracks;
		    	var name = req.body.name;
		    	if(!(name === undefined || name === null)) comp.name = name;
		        if(Composition.validate(comp)) {
		            comp_db.insert(comp, function(err, resp) {
		            	if(!err)
		            		res.json({"OK": true});
		            	else
		            		res.json({"OK": false});
		            });
		        }
		       	else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });
    
    app.put('/track/:id', function(req, res, next) {
        var track_db = db.tracks;
        var track_id = req.param('id');
        var track = {};
        track_db.get(track_id, { revs_info: false }, function(err, body) {
            if (!err) {
                track = Track.createFromObject(body);

		    	var instrument = req.body.instrument;
		    	if(!(instrument === undefined || instrument === null)) track.instrument = instrument;
		    	var note_groups = req.body.note_groups;
		    	if(!(note_groups === undefined || note_groups === null)) track.note_groups = note_groups;
		    	var name = req.body.name;
		    	if(!(name === undefined || name === null)) track.name = name;
		        if(Track.validate(track)) {
		            track_db.insert(track, function(err, resp) {
		            	if(!err)
		            		res.json({"OK": true});
		            	else
		            		res.json({"OK": false});
		            });
		        }
		       	else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });

	app.put('/note_group/:id', function(req, res, next) {
        var note_group_db = db.noteGroups;
        var note_group_id = req.param('id');
        var note_group = {};
        note_group_db.get(note_group_id, { revs_info: false }, function(err, body) {
            if (!err) {
                note_group = NoteGroup.createFromObject(body);

		    	var start = req.body.start;
		    	if(!(start === undefined || start === null)) note_group.start = start;
		    	var notes = req.body.notes;
		    	if(!(notes === undefined || notes === null)) note_group.notes = notes;
		    	var name = req.body.name;
		    	if(!(name === undefined || name === null)) note_group.name = name;
		        if(NoteGroup.validate(note_group)) {
		            note_group_db.insert(note_group, function(err, resp) {
		            	if(!err)
		            		res.json({"OK": true});
		            	else
		            		res.json({"OK": false});
		            });
		        }
		       	else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });
    

}