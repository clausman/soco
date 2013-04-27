// Error Content

define(['jquery', 'underscore', 'backbone', 'text!templates/error.html'],
    function ($, _, Backbone, ErrorTemplate) {

        var ErrorView = Backbone.View.extend({
            el: $("#content"),

            initialize: function () {

            },

            render: function (path) {
                var title, message;
                if (path == "error") {
                    title = 'Internal server error. Please try again later.';
                    message = 'Our team is working hard to fix the issue.';
                } else {
                    title = 'Resource not found.';
                    message = 'This link is broken or invalid at this time.';
                }
                var template = _.template(ErrorTemplate, { title: title, message: message });
                this.$el.html(template);


                $('li[id^="navbar_"]').removeClass('active');
                $('li[id^="navbar_view"]').addClass('active');
            }
        });
        return ErrorView;
    }
);