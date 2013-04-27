// Backbone router to serve client-side pages

define(['jquery', 'underscore', 'backbone', 'views/about', 'views/error', 'views/home'],
    function ($, _, Backbone, AboutView, ErrorView, HomeView) {

        var Router = Backbone.Router.extend({
            routes: {
                '': 'home',
                'about': 'about',
                '*path': 'default'

            },

            'about': function() {
                this.aboutView = new AboutView();
                this.aboutView.render();
            },

            'home': function(path) {
                this.homeView = new HomeView();
                this.homeView.render(); 
            },

            'default': function(path) {
                this.error = new ErrorView();
                this.error.render(path); 
            }

        });

        var initialize = function () {
            var router = new Router();
            Backbone.history.start();
        };

        return { initialize: initialize };
    }
)