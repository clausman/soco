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
        console.log("id: " + comp_id);
        var comp = {};
        comp_db.get(comp_id, { revs_info: false }, function(err, body) {
            if (!err)
                comp = Composition.createFromObject(body);
            else
                comp = null;
        });
        
        if (comp == null) {
        	res.json({"OK": false});
        	return;
       	}

    	var creator = req.body.creator;
    	if(!(creator === 'undefined' || creator == null)) comp.creator = creator;
    	var tempo = req.body.tempo;
    	if(!(tempo === 'undefined' || tempo == null)) comp.tempo = tempo;
    	var tracks = req.body.tracks;
    	if(!(tracks === 'undefined' || tracks == null)) comp.tracks = tracks;
    	var name = req.body.name;
    	if(!(name === 'undefined' || name == null)) comp.name = name;
        if(Composition.validate(comp)) {
            comp_db.insert(comp, function(err, res) {
            	if(err)
            		res.json({"OK": false});
            	else
            		res.json({"OK": true});
            });
        } else {
            res.json({"OK": false});
        }
    });


    /**  GET, POST, PUT, DELETE **/

}