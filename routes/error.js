exports = module.exports = function errorHandler(options) {
    options = options || {};

    // defaults
    var showStack = options.showStack || options.stack;
    var showMessage = options.showMessage || options.message;
    var dumpExceptions = options.dumpExceptions || options.dump;
    var formatUrl = options.formatUrl;

    return function errorHandler(err, req, res, next) {
        res.statusCode = 500;
        if (dumpExceptions) {
            console.error(err.stack);
        }

        var app = res.app;

        if (err instanceof exports.NotFound) {
            res.redirect("/#notfound");
        } else {
            res.redirect("/#error");
        }
    };

};

exports.NotFound = function(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}