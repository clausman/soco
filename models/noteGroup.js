var model = require('./model');
var db = require('../db/db')

function NoteGroup(start, options)
{
    if (start === undefined || start < 0) throw "NoteGroup must have a start point >= 0.";
    var id = options.id || null;
    var name = options.name || '';
    var notes = options.notes || [];
    if (!(notes instanceof Array)) throw "Notes must be an array.";

	if (id != null) {
   		this._id = id;
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
        options.notes = obj.notes;
		
		return new NoteGroup(obj.start, options);
    },
    db: db.noteGroups,

});