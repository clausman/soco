var model = require('./model');

function Track(name, options)
{
    if (name === undefined) throw "Tracks must have a name to be created";
    options = options || {};
    var instrument = options.instrument || "Piano";
    var notes = options.notes || [];
    var id = options.id || null;
    if (! notes instanceof Array) throw "Notes must be an array";

    this._id = id;
    this.name = name;
    this.instrument = instrument;
    this.notes = notes;
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
            || track.notes === undefined
            || !(track.notes instanceof Array));
            return false;
        return true;
    }
});



