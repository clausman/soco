var errorHandler = require('./api');

var Composition = require('../models/composition.js');
var Track = require('../models/track.js');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')

var db_callback = function(success_callback, err_callback){
  return function(err, body) {
    if(!err) {
        console.log("Successful db op: " + body);
        success_callback();
    } else {
        console.log("Failed db op. Body: " + body + " Error: " + err);
        err_callback();  
    }
  };
};

var success = function() {

}

var error = function() {

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
                //TODO add createFromObject
                res.json(body);

            }
            else
                res.send(500, {error:err})
        });
    });

    app.post('/composition', function(req, res, next) {
        var comp = Composition.createFromObject(req.body);
        if(Composition.validate(comp)) {
            db.compositions.insert(comp, null, 
                db_callback(
                    function(){ res.json({"OK":false}); },
                    function(){ res.send(500, "Could not add: " + req.body); }
                ));
        } else {
            res.json({"OK": false});
        }
    });
    
    app.post('/track', function(req, res, next) {
	    var track = Track.createFromObject(req.body);
	    if(Track.validate(track)) {
            db.tracks.insert(track);
            res.json({"OK": true});
	    } else {
	        res.json({"OK": false});
	    }
    });
    
    app.post('/note_group', function(req, res, next) {
	    var noteGroup = NoteGroup.createFromObject(req.body);
	    if(NoteGroup.validate(noteGroup)) {
            db.noteGroups.insert(noteGroup);
	        res.json({"OK": true});
	    } else {
	        res.json({"OK": false});
	    }
    });
    
    
    /**  GET, POST, PUT, DELETE **/
    
}