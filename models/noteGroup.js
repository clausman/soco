var model = require('./model');

function NoteGroup(start, options)
{
    if (start === undefined || start < 0) throw "NoteGroup must have a start point >= 0.";
    var id = options.id || null;
    var name = options.name || '';
    var notes = options.notes || [];
    if (!(notes instanceof Array)) throw "Notes must be an array.";

    this._id = id;
    this.start = start;
    this.notes = notes;
    this.name = name;
};

NoteGroup.prototype.toString = function() {
    JSON.stringfy(this);
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
		options.id = obj.id;
		options.notes = obj.notes;
		
		return this.create(obj.start, options);
    }
});