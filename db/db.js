/**
 *  Initializes database with tables if they don't exist
 *  
 */
hostname = 'http://localhost'
port = 5984

function db(hostname, port){
    var nano = require('nano')(hostname + ':' + 5984);

    this.db_names = ['compositions', 'tracks', 'note_groups'];
    
    // The array values are hard coded from above...so if you change them be careful!
    this.compositions = nano.db.use(this.db_names[0]);
    this.tracks = nano.db.use(this.db_names[1]);
    this.noteGroups = nano.db.use(this.db_names[2]);
    this.nano = nano;
}

module.exports = new db(hostname, port);


