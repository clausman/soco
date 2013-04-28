var model = require('./model');

function NoteGroup(id, start, notes)
{
    if (id === undefined) id = null;
    if (start === undefined || start < 0) throw "NoteGroup must have a start point >= 0.";
    notes = notes || [];
    if (!(notes instanceof Array)) throw "Notes must be an array.";

    this.id = id;
    this.start = start;
    this.notes = notes;
};

NoteGroup.prototype.toString = function() {
    JSON.stringfy(this);
};

module.exports = new model({
    create : function(id, start, notes)
    {
        return new NoteGroup(id, start, notes);
    },
    validate : function(noteGroup)
    {
        if (noteGroup.start === undefined || noteGroup.start < 0 ||
    		noteGroup.notes === undefined || !(noteGroup.notes instanceof Array) <= 0)
    		return false;
    	return true;
    }

    return this;
});