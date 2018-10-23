import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';
import React from 'react';
import {connectToBackboneCollection, connectToBackboneModel} from "javascripts/backbonecomp.js";

function WineItem(props) {
  // Correct! There is no need to specify the key here:
  let picture;

  if (props.picture) {
    picture = <img src="pics/generic.jpg" height="150" width="125" alt=""/>;
  } else{
    picture = <img src="pics/{props.picture}" height="150" width="125" alt=""/>;
  }
  return (
    <a href="#wines/{props._id}" className="thumbnail plain" style={{'textAlign': "center"}}>
      {picture}
        <h5>props.name</h5>
          {props.year} {props.grapes }<br/>
        <i className="icon-globe"></i> 
          {props.region}, {props.country}
    </a>
  );
}

const BcWineItem = connectToBackboneModel (WineItem);

function WineListView(props) {
  var wines = props.model.models;
  var len = wines.length;
  var startPos = (props.page - 1) * 8;
  var endPos = Math.min(startPos + 8, len);
  var wineSlice = wines.slice(startPos, endPos)
  console.log(wineSlice);
  const listItems = wineSlice.map((wine) =>
    // Correct! Key should be specified inside the array.
    <BcWineItem key={wine.id}
              model={wine} />
  );
  return (
    <ul className="thumbnails">
      {listItems}
    </ul>
  );
}

const BcWineListView = connectToBackboneCollection (WineListView);

export default function ExBcWineListView (props) {
  console.log(props.model);
  return (
    <BcWineListView
      model={props.model}
      page={props.page}
    />
  );
}


// window.WineListView = Backbone.View.extend({

//     initialize: function () {
//         this.render();
//     },

//     render: function () {
//         var wines = this.model.models;
//         var len = wines.length;
//         var startPos = (this.options.page - 1) * 8;
//         var endPos = Math.min(startPos + 8, len);

//         $(this.el).html('<ul class="thumbnails"></ul>');

//         for (var i = startPos; i < endPos; i++) {
//             $('.thumbnails', this.el).append(new WineListItemView({model: wines[i]}).render().el);
//         }

//         $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

//         return this;
//     }
// });

