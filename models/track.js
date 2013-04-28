var model = require('./model');
var db = require('../db/db');

function Track(name, options)
{
    if (name === undefined) throw "Tracks must have a name to be created";
    options = options || {};
    var instrument = options.instrument || "Piano";
    var note_groups = options.note_groups || [];
    var id = options.id || null;
    if (! options.note_groups instanceof Array) throw "Notes must be an array";

	if (id != null) {
    	this._id = id;
    }
    this.name = name;
    this.instrument = instrument;
    this.note_groups = note_groups;
};

module.exports = new model({
    create : function(name, options) {
        return new Track(name, options);
    },
    validate : function(track) {
        if (track.name === undefined 
            || track.instrument === undefined
            || track.note_groups === undefined
            || !(track.note_groups instanceof Array))
            return false;
        return true;
    },
    createFromObject : function(obj) {
		var options = {};
		options.id = obj.id ? obj.id : obj._id;
		options.instrument = obj.instrument;
		options.note_groups = obj.note_groups;
	
		return new Track(obj.name, options);
	},
    db : db.tracks,
});

