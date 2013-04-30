var callback = require('../routes/callbacks.js').dbCallback;

module.exports = function(definition)
{
    this.create = definition.create;
    this.validate = definition.validate;
    this.createFromObject = definition.createFromObject;
    this.childArrayName = definition.childArrayName;
    
    this.find = function(self, db){
        return function(id, callback){
            if (id instanceof Array){
                db.fetch({'keys':id}, {include_docs:true}, function(err, body){
                    if (err) throw "Could not find in database "+id
                                
                    for (var i = 0; i < body.rows.length; i++) {
                    	console.log(i);
                    	console.log(body.rows[i].doc);
                        id[i] = self.createFromObject(body.rows[i].doc)
                    };
                    callback(id);
                });
            }else{
                db.get(id, function(err, body){
                    if (err) throw "Could not find in database "+id
                    id = self.createFromObject(body);
                    callback(id);
                });
            }
        }}(this, definition.db);
    
    this.save = function(self, db, childArrayName) {
        return function(obj, onComplete) {
            if(!self.validate(obj)) {
                console.log(self);
                throw "Can't save: Invalid Model"
            }
            
            // Deflate model object (replace objects with id's) unles we are notegroup
            // we don't have a childArrayName if we are a notegroup
            console.log(obj);
            if(childArrayName !== 'notes') {
                var children = obj[childArrayName];
                for(var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if(typeof child === 'string') {
                        // Child entry is a link
                    } else if(typeof child._id === 'string') {
                        // Child entry is an object with an id
                        children[i] = child._id;
                    } else {
                        console.log(child);
                        throw "Can't save: found invalid child"
                    }
                }
            }
            
            db.insert(obj, onComplete);
        };
    }(this, definition.db, definition.childArrayName);
};