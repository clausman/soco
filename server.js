var express = require('express');
var engine = require('ejs-locals');

var app = express();

// Configuration
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.use(express.static(__dirname + '/public'));

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
  res.render('error', { title: err, message:"error" });
}


// Routes
require('./routes/main')(app);

app.listen(process.env.port || 3000);
console.log('Listening on port:' + (process.env.port || 3000));


// var options = { key: privateKey, cert: certificate };
// https.createServer(options, app).listen(443);