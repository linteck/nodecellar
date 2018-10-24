import Backbone from 'backbone';
import * as $ from 'jquery';
import * as _ from 'underscore';
import React from 'react';
import {connectToBackboneCollection, connectToBackboneModel} from "javascripts/backbonecomp.js";
import Paginator from "javascripts/views/paginator.js";

function WineItem(props) {
  // Correct! There is no need to specify the key here:
  let picture;

  if (props.picture) {
    picture = <img src={"pics/" + props.picture} height="150" width="125" alt=""/>;
  } else{
    picture = <img src="pics/generic.jpg" height="150" width="125" alt=""/>;
  }
  return (
    <li>
      <a href={"#wines/" + props._id} className="thumbnail plain" style={{'textAlign': "center"}}>
        {picture}
          <h5>{props.name}</h5>
            {props.year} {props.grapes }<br/>
          <i className="icon-globe"></i> 
            {props.region}, {props.country}
      </a>
    </li>
  );
}

const BcWineItem = connectToBackboneModel (WineItem);

function WineListView(props) {
  var wines = props.model.models;
  var len = wines.length;
  var perPage = 8;
  var startPos = (props.page - 1) * perPage;
  var endPos = Math.min(startPos + perPage, len);
  var wineSlice = wines.slice(startPos, endPos)
  console.log(wineSlice);
  const listItems = wineSlice.map((wine) =>
    // Correct! Key should be specified inside the array.
    <BcWineItem key={wine.id}
              model={wine} />
  );
  return (
      <div>
        <ul className="thumbnails">
          {listItems}
        </ul>
        <Paginator length={len} perPage={perPage} activePage={props.page}>
        </Paginator>
      </div>
  );
}

const BcWineListView = connectToBackboneCollection (WineListView);

export function ExBcWineListView (props) {
  console.log(props.model);
  return (
        <BcWineListView
          model={props.model}
          page={props.page}
        />
  );
}
