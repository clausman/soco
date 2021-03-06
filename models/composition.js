var model = require('./model');
var db = require('../db/db')

function Composition(name, options)
{
    if (name === undefined) throw "Composition must have name to be created";
    options = options || {}
    var creator = options.creator || "Unknown";
    var tempo =  options.tempo || 120;
    var tracks = options.tracks || [];
    var id = options.id || null;
    var rev = options.rev || null;
    if (! tracks instanceof Array) throw "Tracks must be an array"

	if(id != null) {
    	this._id = id;
    }

    if(rev != null) {
    	this._rev = rev;
    }

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
        options.id = obj.id ? obj.id : obj._id;
        options.rev = obj.rev ? obj.rev : obj._rev;
		options.creator = obj.creator;
		options.tempo = obj.tempo;
		options.tracks = obj.tracks;
        
		return new Composition(obj.name, options);		
	},
    db : db.compositions,
    childArrayName : 'tracks'
});
