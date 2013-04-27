// Homepage Content

define(['jquery', 'underscore', 'backbone', 'text!templates/home.html'],
    function ($, _, Backbone, HomeTemplate) {

        var HomeView = Backbone.View.extend({
            el: $("#content"),

            initialize: function () {

            },

            render: function () {
                if (!$('#fatal-error').length) {
                    var template = _.template(HomeTemplate);
                    this.$el.html(template);

                    $('li[id^="navbar_"]').removeClass('active');
                    $('li[id^="navbar_home"]').addClass('active');
                }
            }
        });
        return HomeView;
    }
);