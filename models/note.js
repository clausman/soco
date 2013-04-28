function Note(pitch, on, durationNumerator, durationDenominator, onVelocity, offVelocity)
{
    if (pitch === undefined || pitch < 0 || pitch >= 127) throw "Note must have a pitch between 0 and 127.";
    if (on === undefined || on <= 0) throw "Note must have a start point > 0.";
    if (durationNumerator === undefined || durationNumerator <= 0) throw "Note must have a duration numerator > 0.";
    if (durationDenominator === undefined || durationDenominator <= 0) throw "Note must have a duration denominator > 0.";
    if (onVelocity === undefined || onVelocity < 0 || onVelocity >= 64) throw "On velocity must be between 0 and 63";
    if (offVelocity === undefined || offVelocity < 0 || offVelocity >= 64) throw "Off velocity must be between 0 and 63";

    this.pitch = pitch;
    this.on = on;
    this.durationNumerator = durationNumerator;
    this.durationDenominator = durationDenominator;
    this.onVelocity = onVelocity;
    this.offVelocity = offVelocity;
};

Composition.prototype.toString = function() {
    JSON.stringfy(this);
};

module.exports = function()
{
    this.create = function(pitch, on, durationNumerator, durationDenominator, onVelocity, offVelocity)
    {
        return new Note(pitch, on, durationNumerator, durationDenominator, onVelocity, offVelocity);
    },
    this.validate = function(composition)
    {
        if (pitch === undefined) throw "Note must have a pitch between 0 and 127.";
	    if (on === undefined || on <= 0) throw "Note must have a start point > 0.";
	    if (durationNumerator === undefined || durationNumerator <= 0) throw "Note must have a duration numerator > 0.";
	    if (durationDenominator === undefined || durationDenominator <= 0) throw "Note must have a duration denominator > 0.";
	    if (onVelocity === undefined || onVelocity < 0 || onVelocity >= 64) throw "On velocity must be between 0 and 63";
	    if (offVelocity === undefined || offVelocity < 0 || offVelocity >= 64) throw "Off velocity must be between 0 and 63";     
    }

    return this;
}();