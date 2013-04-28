var errorHandler = require('./api');
var db = require('../db/db')

/**
 * Api Crud operations
 **/
module.exports = function (app) {
    app.get('/composition/:id', function(req, res, next) {
        var comp_id = req.param('id');
        
        db.compositions.get(comp_id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
            else
                res.send(500, {error: err})
        });
    });

    app.get('/track/:id', function(req, res, next) {
        var id = req.param('id');        
        db.tracks.get(id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
            else
                res.send(500, {error:err})
        });
    });
    
    app.get('/note_group/:id', function(req, res, next) {
        var id = req.param('id');
        db.noteGroups.get(id, { revs_info: true }, function(err, body) {
            if (!err)
                res.json(body)
            else
                res.send(500, {error:err})
        });
    });

  
    /**  GET, POST, PUT, DELETE **/


}