require('should')
var Composition = require('../../models/composition');

describe('Composition', function(){
    describe('#create', function(){
        it('should set defaults for options when not provided', function(){
            // Check defaults       
            var c =Composition.create('myName');
            console.log(c);
            c.name.should.equal('myName');
            c.creator.should.equal('Unknown');
            c.tempo.should.equal(120);
            c.tracks.should.eql([]);
            c.should.not.have.property('_id')
            c.should.not.have.property('_rev')
            
        });
        it('should use options values when provided', function(){
            // Check options
            var c = Composition.create('someName', {creator:'bob', tracks:[1,2,3]});
            c.name.should.equal('someName');
            c.creator.should.equal('bob');
            c.tempo.should.equal(120);
            c.tracks.should.eql([1,2,3]);
            c.should.not.have.property('_id');
            c.should.not.have.property('_rev');
        });
        it('should allows options of _id and _rev', function(){
            var c = Composition.create('a', {id:'myId', rev:'myRev'});
            c.should.have.property('_id');
            c.should.have.property('_rev');
            c._id.should.equal('myId');
            c._rev.should.equal('myRev');
        });

    });
    describe('#validate', function(){

    });
    describe('createFromObject', function(){

    });
});