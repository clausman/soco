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
    app.del('/composition/:id', function(req, res, next) {
        var compDb = db.compositions;
        var compId = req.param('id');
        var compCallback = callbacks.dbCallback(req, res);
        compDb.get(compId, { revs_info: false }, function(err, body) {
            if (!err) {
                var comp = Composition.createFromObject(body);
                comp._deleted = true;
		        if(Composition.validate(comp)) {
		        	Track.find(comp.tracks, function(tracks) {
		        		if (!tracks)
		        			compDb.insert(comp, compId, compCallback);
		        		else {
		        			var trackDb = db.tracks;
		        			var trackCallback = callbacks.dbCallback(req, res);
		        			if(!(tracks instanceof Array))
		        				tracks = [tracks];
		        			var ngs = [];
		        			for(var i=0; i<tracks.length; i++) {
		        				tracks[i]._deleted = true;
		        				ngs.push.apply(ngs, tracks[i].noteGroups);
		        			}
		        			var trackDocs = {};
		        			trackDocs.docs = tracks;
		        			NoteGroup.find(ngs, function(noteGroups) {
		        				console.log(noteGroups);
		        				if(!noteGroups) {
		        					trackDb.bulk(trackDocs, null, trackCallback);
		        					compDb.insert(comp, compId, compCallback);
		        				} else {
		        					var noteGroupDb = db.noteGroups;
		        					var noteGroupCallback = callbacks.dbCallback(req, res);
		        					if(!(noteGroups instanceof Array))
		        						notegroups = [noteGroups];
		        					for(var j=0; j<noteGroups.length; j++) {
		        						noteGroups[j]._deleted = true;
		        					}
		        					var noteGroupDocs = {};
		        					noteGroupDocs.docs = noteGroups;
		        					noteGroupDb.bulk(noteGroupDocs, null, noteGroupCallback);
		        					trackDb.bulk(trackDocs, null, trackCallback);
		        					compDb.insert(comp, compId, compCallback);
		        				}
		        			});
		        		}
		        	});
		        } else
		        	res.json({"OK": false});
            } else
                res.json({"OK": false});
        });
    });

}