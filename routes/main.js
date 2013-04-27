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

}