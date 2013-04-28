var model = require('./model')

function Composition(name, creator, tempo, tracks)
{
    if (name === undefined) throw "Composition must have name to be created";
    if (creator === undefined) creator = "Unknown";
    if (tempo === undefined) tempo = 120;
    if (tracks === undefined) tracks = []

    this.name = name;
    this.creator = creator;
    this.tempo = tempo;
    this.tracks = tracks;
};

module.exports = new model({
    create : function(name, creator, tempo, tracks)
    {
        return new Composition(name, creator, tempo, tracks);
    },
    validate : function(composition)
    {
        if (composition.name === undefined) throw "Composition.name must be defined"           
    }
});

