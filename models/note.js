var model = require('./model');

function Note(pitch, on, durationNumerator, durationDenominator, options)
{
    if (pitch === undefined || pitch < 0 || pitch >= 127) throw "Note must have a pitch between 0 and 127.";
    if (on === undefined || on < 0) throw "Note must have a start point >= 0.";
    if (durationNumerator === undefined || durationNumerator <= 0) throw "Note must have a duration numerator > 0.";
    if (durationDenominator === undefined || durationDenominator <= 0) throw "Note must have a duration denominator > 0.";
    var onVelocity = options.onVelocity || 31;
    if (onVelocity < 0 || onVelocity >= 64) throw "On velocity must be between 0 and 63";
    var offVelocity = options.offVelocity || 31;
    if (offVelocity < 0 || offVelocity >= 64) throw "Off velocity must be between 0 and 63";

    this.pitch = pitch;
    this.on = on;
    this.durationNumerator = durationNumerator;
    this.durationDenominator = durationDenominator;
    this.onVelocity = onVelocity;
    this.offVelocity = offVelocity;
};

module.exports = new model({
    create : function(pitch, on, durationNumerator, durationDenominator, options) {
        return new Note(pitch, on, durationNumerator, durationDenominator, options);
    },
    validate : function(note) {
        if (note.pitch === undefined ||
	    	note.on === undefined || note.on < 0 ||
	    	note.durationNumerator === undefined || note.durationNumerator <= 0 ||
	    	note.durationDenominator === undefined || note.durationDenominator <= 0 ||
	    	note.onVelocity === undefined || note.onVelocity < 0 || note.onVelocity >= 64 ||
	    	note.offVelocity === undefined || note.offVelocity < 0 || note.offVelocity >= 64)
	    	return false;
	    return true;    
    },
    createFromObject : function(obj) {
		var options = {};
		options.onVelocity = obj.onVelocity;
		options.offVelocity = obj.offVelocity;
		
		return this.create(obj.pitch, obj.on, obj.durationNumerator, obj.durationDenominator, options);
	}
});