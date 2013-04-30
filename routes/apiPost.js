var errorHandler = require('./apiPost');

var Composition = require('../models/composition');
var Track = require('../models/track');
var NoteGroup = require('../models/noteGroup')
var db = require('../db/db')
var callbacks = require('./callbacks.js');

function saveChildAndAddToParent(child, childId, childModel, parentId, parentModel, callback) {
    var findParentAndInsertChild = function(toInsert) {
        try {
            parentModel.find(parentId, function(parent) {
                parent[parentModel.childArrayName].push(child);
                if (parentModel.validate(parent)) {
                    parentModel.save(parent, callback);
                } else {
                    var err = "Invalid composition";
                    callback(err);
                }
            });
        } catch (e) {
            callback(e);
        }
    };

    // Set childs ID now if we are choosing it
    if(childId !== null) {
        child._id = childId;
    }

    childModel.save(child, function(err, body) {
        if(err) callback(err);
        else {
            if(childId !== null) {
                console.log("Child id: " + childId);
                child._rev = body.rev;
            } else {
                child._id = body.id;
                child._rev = body.rev;
            }
            findParentAndInsertChild(child);
        }
    });
}



/**
 * Api Crud operations
 **/
module.exports = function (app) {
    
    // Create a composition if one doesn't exist (auto generated id)
    app.post('/composition', function(req, res, next) {
        var comp = Composition.createFromObject(req.body);

        var callback = callbacks.saveCallback(req, res);
        Composition.save(comp, callback);
    }); 
    
    // Create a composition with the specified cid if it doesn't already exist
    // Fail if it does?
    app.post('/composition/:cid', function(req, res, next) {
        var comp = Composition.createFromObject(req.body);
        var cid = req.param('cid');
        var callback = callbacks.saveCallback(req, res);

        // Check for obj id and url id mismatch, error if found
        if(typeof comp._id !== 'undefined' && comp._id !== cid ) {
            var err = "Id conflict in submitted obj and url";
            callback(err);
        } else {
            comp._id = cid;
            Composition.save(comp, callback);
        }
    });
    
    // Create a track in composition(cid) (auto generated tid)
    app.post('/composition/:cid/track', function(req, res, next) {
	    var track = Track.createFromObject(req.body);
        var cid = req.param('cid');
	    var callback = callbacks.saveCallback(req, res);

        saveChildAndAddToParent(track, null, Track, cid, Composition, callback);
    });
    
    // Create a track in composition(cid) with tid
    app.post('/composition/:cid/track/:tid', function(req, res, next) {
	    var track = Track.createFromObject(req.body);
        var cid = req.param('cid');
        var tid = req.param('tid');
	    var callback = callbacks.saveCallback(req, res);

        saveChildAndAddToParent(track, tid, Track, cid, Composition, callback);
    });

    // Create a note_group in composition(cid)/track(tid) (auto generate ngid)
    app.post('/composition/:cid/track/:tid/notegroup', function(req, res, next) {
	    var ng = NoteGroup.createFromObject(req.body);
        var ngid = undefined;
        var tid = req.param('tid');
	    var callback = callbacks.saveCallback(req, res);

        saveChildAndAddToParent(ng, ngid, NoteGroup, tid, Track, callback);
    });

    // Create a note_group with ngid in composition(cid)/track(tid) 
    app.post('/composition/:cid/track/:tid/notegroup/:ngid', function(req, res, next) {
	    var ng = NoteGroup.createFromObject(req.body);
        var cid = req.param('cid');
        var tid = req.param('tid');
        var ngid = req.param('ngid');
	    var callback = callbacks.saveCallback(req, res);

        saveChildAndAddToParent(ng, ngid, NoteGroup, tid, Track, callback);        
    });

}