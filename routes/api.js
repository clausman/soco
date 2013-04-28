var errorHandler = require('./api');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')

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
	
    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        db.compositions.get(comp_id, { revs_info: true }, function(err, body) {
            if (!err)
            {
                var comp = Composition.createFromObject(body);
                res.json(comp);
            }
            else
                res.send(500, {error: err})
        });
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
                        ngs.push.apply(ngs, tracks[i].note_groups)
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

                            for (var j = 0; j < track.note_groups.length; j++) {
                                track.note_groups[j] = groupHash[track.note_groups[j]]
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

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');        
        db.tracks.get(id, { revs_info: true }, function(err, body) {
            if (!err)
            {
                var track = Track.createFromObject(body);
                res.json(track);
            }
            else
                res.send(500, {error:err})
        });
    });
    
    app.get('/note_group/:id', function(req, res, next) {
        var id = req.param('id');
        db.noteGroups.get(id, { revs_info: true }, function(err, body) {
            if (!err)
            {
                var group = NoteGroup.createFromObject(body)
                res.json(group);

            }
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