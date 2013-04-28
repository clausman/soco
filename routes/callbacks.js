/**
 * Object that returns callbacks to be used with db calls
 * Create DbCallback in route with req and res 
 * objCreator takes response from DB and formats it to be sent back
 * Then pass onComplete as callback to db call
 * PARAMS:
 *   req: request object
 *   res: response object
 *   objCreator: createFromObject from a model (required when handling GET);
*/
module.exports.dbCallback = function(req, res, objCreator) {
    var _this = this;

    if(req.method === 'GET' && typeof objCreator === 'undefined') {
        throw "objCreator not defined in DbCallback for GET request";
    }

    this.successfulPost = function(err, body) {
        console.log("Successful post");
        console.log(body);
        res.send(201, req.path + "/" + body.id);
    };

    this.failedPost = function(err, body) {
        console.log("Failed POST.");
        console.log(err);
        res.send(500, { error: err});
    };

    this.successfulGet = function(err, body) {
        console.log("Successful GET:");
        console.log(body);
        res.send(objCreator(body));
    };

    this.failedGet = function(err, body) {
        console.log("Failed GET.");
        console.log(err);
        res.send(500, { error: err});
    };
    
    this.successfulPut = function(err, body) {
    	console.log("Successful PUT:");
    	console.log(body);
    	res.send(201, req.path + "/" + body.id);
    };
    
    this.failedPut = function(err, body) {
        console.log("Failed PUT.");
        console.log(err);
        res.send(500, { error: err});
    };
    
    this.successfulDelete = function(err, body) {
    	console.log("Successful DELETE:");
    	console.log(body);
    	res.send(201, req.path + "/" + body.id);
    };
    
    this.failedDelete = function(err, body) {
        console.log("Failed DELETE.");
        console.log(err);
        res.send(500, { error: err});
    };

    // Return the correct db call back based on the response
    this.onComplete = function(err, body) {
        if(req.method === 'GET') {
            if(err) _this.failedGet(err, body);
            else _this.successfulGet(err, body);
        } else if(req.method === 'POST') {
            if(err) _this.failedPost(err, body);
            else _this.successfulPost(err, body);
        } else if(req.method === 'PUT') {
        	if(err) _this.failedPut(err, body);
            else _this.successfulPut(err, body);
        } else if(req.method === 'DELETE') {
        	if(err) _this.failedDelete(err, body);
            else _this.successfulDelete(err, body);
        }
    }

    return this.onComplete;
}
