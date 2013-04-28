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

    return this;
};

Composition.prototype.toString = function() {
    JSON.stringfy(this);
};

module.exports = function()
{
    this.create = function(name, creator, tempo, tracks)
    {
        return Composition(name, creator, tempo, tracks);
    },
    this.validate = function(composition)
    {
        if (composition.name === undefined) throw "Composition.name must be defined"
        //TODO more validation       
    }
}();