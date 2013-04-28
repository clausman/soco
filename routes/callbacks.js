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
        console.log("Failed post.");
        console.log(err);
        res.send(500, "Failed post: " + err);
    };

    this.successfulGet = function(err, body) {
        console.log("Successful get:");
        console.log(body);
        res.send(objCreator(body));
    };

    this.failedGet = function(err, body) {
        console.log("Failed GET.");
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
        }
    }

    return this.onComplete;
}
