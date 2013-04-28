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

    this.id = id;
    this.name = name;
    this.creator = creator;
    this.tempo = tempo;
    this.tracks = tracks;
};

module.exports = new model({
    create : function(name, options)
    {
        options = options || {}
        return new Composition(name, options);
    },
    validate : function(composition)
    {
        if (composition.name === undefined
            || composition.creator === undefined
            || composition.tempo === undefined
            || tracks === undefined
            || !(composition.tracks instanceof Array))
            return false;
        return true;
    }
    
    createFromJson : function(rawJsonStr) {
	var jsonObject = JSON.parse(rawJsonStr);
	
	var name = jsonObject.name;
	var creator = jsonObject.creator;
	var tempo = jsonObject.tempo;
	var tracks = jsonObject.tracks;
	
	this.create(name, creator, tempo, tracks);
    }
    
});


