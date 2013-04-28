var passport = require('passport')

module.exports = function(app) {

    // user account page
    //app.get('/account', function(req, res) {
    //    res.render('account/account', { user: req.user });
    //});

    // logout
    app.get('/logout', function(req, res) {
        res.redirect('/');
    });

    app.get('/login', function(req, res){
        res.render('login');
    })

    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve redirecting
    //   the user to google.com.  After authenticating, Google will redirect the
    //   user back to this application at /auth/google/return
    app.get('/auth/google', 
      passport.authenticate('google', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

    // GET /auth/google/return
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/return', 
      passport.authenticate('google', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });
}