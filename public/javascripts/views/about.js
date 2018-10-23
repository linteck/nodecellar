import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';

window.AboutView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});
