// About Page Content

define(['jquery', 'underscore', 'backbone', 'text!templates/about.html'],
    function ($, _, Backbone, AboutTemplate) {

        var AboutView = Backbone.View.extend({
            el: $("#content"),

            initialize: function () {

            },

            render: function () {
                var template = _.template(AboutTemplate);
                this.$el.html(template);

                $('li[id^="navbar_"]').removeClass('active');
                $('li[id^="navbar_about"]').addClass('active');
            }
        });
        return AboutView;
    }
);