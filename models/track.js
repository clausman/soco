var model = require('./model');

function Track(name, options)
{
    if (name === undefined) throw "Tracks must have a name to be created";
    options = options || {};
    var instrument = options.instrument || "Piano";
    var note_groups = options.note_groups || [];
    var id = options.id || null;
    if (! options.note_groups instanceof Array) throw "Notes must be an array";

    this._id = id;
    this.name = name;
    this.instrument = instrument;
    this.note_groups = note_groups;
};

module.exports = new model({
    create : function(name, options)
    {
        return new Track(name, options);
    },
    validate : function(track)
    {
        if (track.name === undefined 
            || track.instrument === undefined
            || track.note_groups === undefined
            || !(track.note_groups instanceof Array))
            return false;
        return true;
    },
    createFromObject : function(obj) {
	if(typeof obj.name === 'undefined') {
	    throw "Name undefined.";
	}
	
	var optional = {};
	optional.id = obj.id;
	optional.instrument = obj.instrument;
	optional.note_groups = obj.note_groups;

	return this.create(obj.name, optional);
    }
});

