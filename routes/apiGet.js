var errorHandler = require('./apiGet');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')
var callbacks = require('./callbacks.js');

/**
 * Api Crud operations
 **/
module.exports = function (app) {
	app.get('/composition', function(req, res, next) {
		db.compositions.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			} else
				res.send(500, "Composition list error.");
		});
	});

    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        var callback = callbacks.dbCallback(req, res, Composition.createFromObject);
        db.compositions.get(comp_id, { revs_info: true }, callback);
    });

    app.get('/composition/:id/full', function(req, res, next) {
        var id = req.param('id');
        try{
            // Confusing as hell....
            // Basically, recursively find all ids and replace them with the objects
            // Then render the json on the entire object
            Composition.find(id, function(composition){
                if (! composition)
                    res.send(500, "Could not find composition");
                Track.find(composition.tracks, function(tracks){
                    if (! tracks)
                        res.send(500, "Composition had some invalid tracks");
                    composition.tracks = tracks;
                    var ngs = [];
                    for (var i = 0; i < tracks.length; i++) {
                        ngs.push.apply(ngs, tracks[i].noteGroups)
                    };
                    NoteGroup.find(ngs, function(groups){
                        if (! groups)
                            res.send(500, "Composition tracks had some invalid note groups");
                        var groupHash = {};
                        for (var i = 0; i < groups.length; i++) {
                            groupHash[groups[i]._id] = groups[i];
                        };

                        for (var i = 0; i < composition.tracks.length; i++) {
                            var track = composition.tracks[i];

                            for (var j = 0; j < track.noteGroups.length; j++) {
                                track.noteGroups[j] = groupHash[track.noteGroups[j]]
                            };
                        };
                        res.json(composition);    
                    });                    
                });
            });
        }catch(err){
            res.send(500, err);
        }
    });

	app.get('/track', function(req, res, next) {
		db.tracks.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			} else
				res.send(500, "Track list error.");
		});
	});

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');        
        var callback = callbacks.dbCallback(req, res, Track.createFromObject);
        db.tracks.get(id, { revs_info: true }, callback);
    });
 
	app.get('/notegroup', function(req, res, next) {
		db.noteGroups.list({ revs_info: false }, function(err, body) {
			if (!err) {
				res.json(body.rows);
			} else
				res.send(500, "Note group list error.");
		});
	});

    app.get('/notegroup/:id', function(req, res, next) {
        var id = req.param('id');
        var callback = callbacks.dbCallback(req, res, NoteGroup.createFromObject);
        db.noteGroups.get(id, { revs_info: true }, callback);
    });
    
}