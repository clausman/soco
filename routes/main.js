module.exports = function (app) {

    // home
    app.get('/', function (req, res, next) {
        res.render('index', {activeHeader: 'home'});
    });

    // compose
    app.get('/compose', function (req, res, next) {
        res.render('compose');
    });

    // about
    app.get('/about', function (req, res, next) {
        res.render('about');
    });

}