module.exports = function(definition)
{
    this.create = definition.create;
    this.validate = definition.validate;
    this.createFromObject = definition.createFromObject;
    
    this.find = function(self, db){
        return function(id, callback){
            if (id instanceof Array){
                db.fetch({'keys':id}, {include_docs:true}, function(err, body){
                    if (err) throw "Could not find in database "+id
                                
                    for (var i = 0; i < body.rows.length; i++) {
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

};