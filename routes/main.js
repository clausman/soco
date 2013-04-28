module.exports = function (app) {

    // home
    app.get('/', function (req, res, next) {
        res.render('index', {activeHeader: 'navbar_home'});
    });

    // compose
    app.get('/compose', function (req, res, next) {
        res.render('compose', {activeHeader: 'navbar_compose'});
    });

    // about
    app.get('/about', function (req, res, next) {
        res.render('about', {activeHeader: 'navbar_about'});
    });

}