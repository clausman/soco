
/**
 * Module dependencies.
 */

var express = require('express');
var engine = require('ejs-locals');

/* Optimize JS file using Node + Require.js on server start 
 * (uncomment to use... need to change to happen anytime server files change using fs.watch)
 */
/* Start Optimize JS
var requirejs = require('requirejs');


var config = {
    baseUrl: 'public/js',
    paths: { 
        'jquery' : './libs/jquery-1.8.3',
        'underscore' : './libs/underscore',
        'backbone' : './libs/backbone',
        'text' : './libs/text'
    },
    name: 'main',
    out: 'public/js/main-min.js'
};

requirejs.optimize(config,
    function (buildResponse) {
        console.log("Optimization: Successfully Completed!");
        var contents = fs.readFileSync(rjsConfig.out, 'utf8');
    },

    function (err) { console.log("Optimization: " + err) }
);

* End Optimze JS */

/* Start Optimize CSS
var requirejs = require('requirejs');
var config = {
    cssIn: 'public/css/style.css',
    out: 'public/css/style-min.css',
    optimizeCss: 'standard'
};

requirejs.optimize(config,
    function (buildResponse) {
        console.log("Optimization: Successfully Completed!");
        var contents = fs.readFileSync(rjsConfig.out, 'utf8');
    },

    function (err) { console.log("Optimization: " + err) }
);
* End Optimze CSS */

var app = express();

// Configuration
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}


// Routes
require('./routes/main')(app);
//require('./routes/api')(app);
//require('./routes/account')(app);
//require('./routes/api')(app);
//require('./routes/global')(app);

app.listen(process.env.port || 3000);
console.log('Listening on port:' + (process.env.port || 3000));


// var options = { key: privateKey, cert: certificate };
// https.createServer(options, app).listen(443);