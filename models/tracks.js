var model = require('./model')

function Track(name, instrument, notes)
{
    if (name === undefined) throw "Tracks must have a name to be created";
    if (instrument === undefined) instrument = "Piano";
    if (notes === undefined) notes = [];

    this.name = name;
    this.instrument = instrument;
    this.notes = notes;
};

module.exports = new model({
    create : function(name, instrument, notes)
    {
        return new Track(name, instrument, notes);
    },
    validate : function(track)
    {
        if (track.name === undefined 
            || track.instrument === undefined
            || track.notes === undefined
            || !(track.notes instanceof Array))
            return false;
        return true;
    }
});

