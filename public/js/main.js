// Main - setup require.js config

require.config({
    baseUrl: 'js',
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }, 
    paths: {
        'jquery': 'libs/jquery-1.8.3',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'text': 'libs/text',
        'templates': 'templates'
    }
});

require(['app'],
    function(app) {
        app.initialize();
    });