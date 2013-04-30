var model = require('./model');
var db = require('../db/db');

function Track(name, options)
{
    if (name === undefined) throw "Tracks must have a name to be created";
    options = options || {};
    var instrument = options.instrument || "Piano";
    var noteGroups = options.noteGroups || [];
    var id = options.id || null;
    var rev = options.rev || null;
    if (! options.noteGroups instanceof Array) throw "Notes must be an array";

	if (id != null) {
    	this._id = id;
    }
    if (rev != null) {
    	this._rev = rev;
    }
    this.name = name;
    this.instrument = instrument;
    this.noteGroups = noteGroups;
};

module.exports = new model({
    create : function(name, options) {
        return new Track(name, options);
    },
    validate : function(track) {
        if (track.name === undefined 
            || track.instrument === undefined
            || track.noteGroups === undefined
            || !(track.noteGroups instanceof Array))
            return false;
        return true;
    },
    createFromObject : function(obj) {
		var options = {};
		options.id = obj.id ? obj.id : obj._id;
		options.rev = obj.rev ? obj.rev : obj._rev;
		options.instrument = obj.instrument;
		options.noteGroups = obj.noteGroups;
	
		return new Track(obj.name, options);
	},
    db : db.tracks,
    childArrayName : 'noteGroups'
});

