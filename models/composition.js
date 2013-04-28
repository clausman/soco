var model = require('./model');

function Composition(name, options)
{
    if (name === undefined) throw "Composition must have name to be created";
    options = options || {}
    var creator = options.creator || "Unknown";
    var tempo =  options.tempo || 120;
    var tracks = options.tracks || [];
    var id = options.id || null;
    if (! tracks instanceof Array) throw "Tracks must be an array"

    this._id = id;
    this.name = name;
    this.creator = creator;
    this.tempo = tempo;
    this.tracks = tracks;

};

module.exports = new model({
    create : function(name, options) {
        return new Composition(name, options);
    },
    validate : function(composition) {
        if (composition.name === undefined
            || composition.creator === undefined
            || composition.tempo === undefined
            || composition.tracks === undefined
            || !(composition.tracks instanceof Array))
            return false;
        return true;
    },
    createFromObject : function(obj) {
		var options = {};
		options.creator = obj.creator;
		options.tempo = obj.tempo;
		options.tracks = obj.tracks;
		
		return this.create(obj.name, options);
	}
});

