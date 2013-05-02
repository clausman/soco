
/**
 * Module dependencies.
 */

var express = require('express');
var partials = require('express-partials');

var app = express();

// Configuration
app.use(partials());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.use(express.static(__dirname + '/public'));

//
// Configure authentication
//
var passport = require('passport'),
   GoogleStrategy = require('passport-google').Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(express.cookieParser()); 
app.use(express.session({secret: 'poopipants'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    //TODO Figure out a way to not hard code this
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      console.log(profile);
      return done(null, profile);
    });
  }
));

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
require('./routes/apiGet')(app);
require('./routes/apiPost')(app);
require('./routes/apiPut')(app);
require('./routes/account')(app);
require('./routes/apiDelete')(app);
//require('./routes/api')(app);
//require('./routes/global')(app);

app.listen(process.env.port || 3000);
console.log('Listening on port:' + (process.env.port || 3000));


// var options = { key: privateKey, cert: certificate };
// https.createServer(options, app).listen(443);
