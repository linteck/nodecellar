import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';
// This import is WRONG!!! It makes css works strange!
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import "javascripts/backbonecomp.js";
import "javascripts/utils.js";
import "javascripts/models/models.js";
import "javascripts/views/paginator.js";
import "javascripts/views/header.js";
import "javascripts/views/home.js";
import ExBcWineListView from "javascripts/views/winelist.js";
import "javascripts/views/winedetails.js";
import "javascripts/views/about.js";
import "javascripts/socket_io_call.js"

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"	: "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
          console.log(wineList.models);
          ReactDOM.render(
              <ExBcWineListView model={wineList} page={p} />,
              document.getElementById('content')
          );
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'AboutView'], function() {
    new AppRouter();
    // const domContainer = document.querySelector('#like_button_container');
    // ReactDOM.render(
    //   <App />, 
    //   domContainer
    // );
    Backbone.history.start();
});
