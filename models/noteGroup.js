function NoteGroup(id, start, notes)
{
    if (id === undefined) id = null;
    if (start === undefined || start < 0) throw "NoteGroup must have a start point >= 0.";
    if (notes === undefined || !(notes instanceof Array) <= 0) throw "Note must have a duration numerator > 0.";

    this.id = id;
    this.start = start;
    this.notes = notes;
};

Composition.prototype.toString = function() {
    JSON.stringfy(this);
};

module.exports = function()
{
    this.create = function(id, start, notes)
    {
        return new NoteGroup(id, start, notes);
    },
    this.validate = function(noteGroup)
    {
        if (noteGroup.start === undefined || noteGroup.start < 0 ||
    		noteGroup.notes === undefined || !(noteGroup.notes instanceof Array) <= 0)
    		return false;
    	return true;
    }

    return this;
}();