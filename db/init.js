var db = require('./db')
var seed = require('./seed')

var db_create = function(nano, db_name)
{
    nano.db.create(db_name, function(err, body){
    if(!err)
        console.log("Created db table "+db_name);
    else
        console.log("Error creating db table "+db_name+"; did it already exist?");
    });
};

for (var i=0, len=db.db_names.length; i<len;i++)
{
    db_create(db.nano, db.db_names[i]);
};

// Seed the compositions
for(var i=0,len=seed.compositions.length; i<len; i++)
{
    db.compositions.insert(seed.compositions[i])
};

// Seed the tracks
for(var i=0,len=seed.tracks.length; i<len; i++)
{
    db.tracks.insert(seed.tracks[i])
};

// Seed the note groups
for(var i=0,len=seed.notes.length; i<len; i++)
{
    db.noteGroups.insert(seed.notes[i])
};