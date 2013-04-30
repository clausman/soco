/**
 * Object that returns callbacks to be used with db calls
 * Create DbCallback in route with req and res 
 * objCreator takes response from DB and formats it to be sent back
 * Then pass onComplete as callback to db call
 * PARAMS:
 *   req: request object
 *   res: response object

*/
function callbacks() {

    this.genericCallback = function() {
        return function(err, body) {
            if(err) {
                console.log("Success");
                console.log(body);
            } else {
                console.log("Failed GET.");
                console.log(err);
            }
        }
    }

    // objCreator: createFromObject from a model (required when handling GET);
    this.GETCallback = function(req, res, objCreator) {
        return function(err, body) {
            if(err) {
                console.log("Failed GET.");
                console.log(err);
                res.send(500, { error: err});
            } else {
                console.log("Successful get:");
                console.log(body);
                res.send(objCreator(body));
            }
        }
    };

    this.POSTCallback = function(req, res) {
        return function(err, body) {
            if(err) {
                console.log("Failed POST.");
                console.log(err);
                if(res && req) res.send(500, "Failed post: " + err);
            } else {
                console.log("Successful post");
                console.log(body);
                if(res && req) res.send(201, req.path + "/" + body.id);
            }
         }
    };

    this.saveCallback = this.POSTCallback;
}

module.exports = new callbacks();