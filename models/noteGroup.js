var model = require('./model');
var db = require('../db/db')

function NoteGroup(start, options)
{
    if (start === undefined || start < 0) throw "NoteGroup must have a start point >= 0.";
    
    options = options || {};
    var id = options.id || null;
    var name = options.name || '';
    var notes = options.notes || [];
    var rev = options.rev || null;
    if (!(notes instanceof Array)) throw "Notes must be an array.";

	if (id != null) {
   		this._id = id;
   	}
   	if (rev != null) {
   		this._rev = rev;
   	}
    this.start = start;
    this.notes = notes;
    this.name = name;
};

module.exports = new model({
    create : function(start, options) {
        return new NoteGroup(start, options);
    },
    validate : function(noteGroup) {
        if (noteGroup.start === undefined || noteGroup.start < 0 ||
    		noteGroup.notes === undefined || !(noteGroup.notes instanceof Array) <= 0 ||
    		noteGroup.name === undefined)
    		return false;
        return true;
    },
    createFromObject : function(obj) {
        var options = {};
        options.name = obj.name;
        // Support objects from both json and coach
        options.id = obj.id ? obj.id : obj._id;
        options.rev = obj.rev? obj.rev : obj._rev;
        options.notes = obj.notes;
		
		return new NoteGroup(obj.start, options);
    },
    db: db.noteGroups,

});