module.exports = function (app) {

    // home
    app.get('/', function (req, res, next) {
        res.render('index');
    });

    // home for third parties
    app.post('/', function (req, res, next) {
        res.render('index');
    });

    // about
    app.get('/about', function (req, res, next) {
        res.redirect('#about');
    });

    // game
    app.get('/game', function (req, res, next) {
        res.redirect('#game');
    });

    app.get('/sheetmusic/:id', ensureAuthenticated, function(req, res, next){
        res.render('sheetmusic');    
    })

}

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}